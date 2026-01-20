import { NextRequest, NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

// Initialize the ApifyClient with API token
const token = process.env.APIFY_API_TOKEN;
console.log("Apify Token loaded:", token ? "Yes (Starts with " + token.substring(0, 10) + "...)" : "No");

const client = new ApifyClient({
    token: token || "PLACEHOLDER_TOKEN",
});

export async function POST(req: NextRequest) {
    try {
        const { prompt, aspectRatio = "16:9" } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "الرجاء إدخال وصف للفيديو" }, { status: 400 });
        }

        if (!token || token === "PLACEHOLDER_TOKEN") {
            console.error("Missing APIFY_API_TOKEN");
            return NextResponse.json({ error: "مفتاح API غير متوفر. يرجى إعادة تشغيل الخادم بعد إضافة المفتاح." }, { status: 500 });
        }

        console.log("Starting Veo3 Actor with prompt:", prompt);

        // Trigger the Veo3 actor
        // We use .start() instead of .call() to return immediately and avoid Vercel timeouts
        const run = await client.actor("powerai/veo3-video-generator").start({
            prompt,
            aspect_ratio: aspectRatio,
        });

        console.log("Actor triggered, Run ID:", run.id);

        // Return the run information
        return NextResponse.json({
            success: true,
            runId: run.id,
            status: run.status,
            datasetId: run.defaultDatasetId,
        });
    } catch (error: any) {
        console.error("Error starting video generation:", error);
        return NextResponse.json(
            { error: error.message || "فشل في بدء عملية التوليد" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const runId = searchParams.get("runId");

    if (!runId) {
        return NextResponse.json({ error: "runId is required" }, { status: 400 });
    }

    try {
        // Fetch the run status
        const run = await client.run(runId).get();

        if (!run) {
            return NextResponse.json({ error: "العملية غير موجودة" }, { status: 404 });
        }

        console.log(`Run ${runId} status: ${run.status}`);

        if (run.status === "SUCCEEDED") {
            // Fetch results from the default dataset
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            console.log("Dataset items fetched:", items.length);

            if (items.length === 0) {
                console.warn("Dataset is empty even though status is SUCCEEDED");
                return NextResponse.json({ status: "SUCCEEDED", videoUrl: null });
            }

            const result = items[0] as any;
            console.log("Result keys:", Object.keys(result));

            // Multiple fallback fields for video URL based on common Apify patterns
            const videoUrl = result.videoUrl ||
                result.url ||
                result.outputUrl ||
                result.fileUrl ||
                result.output ||
                (result.videos && result.videos[0]) ||
                result.video;

            console.log("Extracted video URL:", videoUrl);

            return NextResponse.json({
                status: "SUCCEEDED",
                videoUrl: videoUrl,
                previewUrl: result.previewUrl || result.thumbnail,
            });
        }

        return NextResponse.json({
            status: run.status,
        });
    } catch (error: any) {
        console.error("Error checking video status:", error);
        return NextResponse.json(
            { error: error.message || "فشل في تتبع حالة الفيديو" },
            { status: 500 }
        );
    }
}
