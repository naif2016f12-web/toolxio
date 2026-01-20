"use client";

import { useState, useEffect, useRef } from "react";
import { Video, Wand2, Play, Download, Sparkles, Music, Pause, X, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoAICreator() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [videoGenerated, setVideoGenerated] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);

    // AI Mode States
    const [aiRunId, setAiRunId] = useState<string | null>(null);
    const pollInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, []);

    const startAiGeneration = async () => {
        if (!prompt) return;

        setIsGenerating(true);
        setProgress(10);
        setVideoGenerated(false);
        setVideoUrl("");
        setStatusText("جاري إرسال الطلب لمحرك Veo3 AI...");

        try {
            const response = await fetch("/api/video-gen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, aspectRatio: "16:9" }),
            });

            const data = await response.json();

            if (data.success) {
                setAiRunId(data.runId);
                startPolling(data.runId);
            } else {
                throw new Error(data.error || "Failed to start AI generation");
            }
        } catch (error: any) {
            console.error("AI Generation Error:", error);
            setStatusText(`خطأ: ${error.message}`);
            setIsGenerating(false);
        }
    };

    const startPolling = (runId: string) => {
        setStatusText("جاري توليد الفيديو بواسطة الذكاء الاصطناعي (قد يستغرق دقائق)...");
        setProgress(30);

        pollInterval.current = setInterval(async () => {
            try {
                const response = await fetch(`/api/video-gen?runId=${runId}`);
                const data = await response.json();

                console.log("Polling AI Status:", data.status, data);

                if (data.status === "SUCCEEDED") {
                    if (pollInterval.current) clearInterval(pollInterval.current);

                    if (data.videoUrl) {
                        setVideoUrl(data.videoUrl);
                        setVideoGenerated(true);
                        setIsGenerating(false);
                        setProgress(100);
                        setStatusText("تم توليد الفيديو بنجاح!");
                    } else {
                        console.error("Video URL is missing in successful result");
                        setStatusText("فشل في الحصول على رابط الفيديو من النتيجة");
                        setIsGenerating(false);
                    }
                } else if (data.status === "FAILED" || data.status === "ABORTED" || data.status === "TIMED-OUT") {
                    if (pollInterval.current) clearInterval(pollInterval.current);
                    setStatusText(`فشل التوليد: ${data.status}`);
                    setIsGenerating(false);
                } else {
                    // Update progress mockly for AI
                    setStatusText(`جاري التوليد... الحالة: ${data.status}`);
                    setProgress((prev) => Math.min(prev + 1, 98));
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        }, 5000); // Poll every 5 seconds
    };

    const handleDownload = () => {
        if (!videoUrl) return;
        const link = document.createElement("a");
        link.href = videoUrl;
        link.download = `Toolxio_AI_Video_${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-6 lg:mb-8 text-center lg:text-right">
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3 lg:mb-4 justify-center lg:justify-start">
                    <div className="p-2 lg:p-3 rounded-xl bg-purple-500/10 w-fit">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">منشئ الفيديو بالذكاء الاصطناعي</h2>
                </div>
                <p className="text-muted-foreground text-sm lg:text-lg">
                    حول أفكارك ونصوصك إلى فيديوهات واقعية ومذهلة باستخدام أقوى محركات الذكاء الاصطناعي (Google Veo3).
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-1 space-y-4 lg:space-y-6">
                    <div className="glass-card p-4 lg:p-6 rounded-2xl">
                        <label className="block text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-widest text-right">
                            وصف الفيديو (Prompt)
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="مثال: رائد فضاء يركض في صحراء من الزمرد، أسلوب سينمائي، دقة 4K..."
                            rows={8}
                            className="w-full bg-muted border border-border rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none text-foreground text-sm mb-6 text-right"
                        />

                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl mb-6">
                            <h4 className="text-[10px] font-bold text-purple-500 mb-1 uppercase text-right">تلميحات للنتائج الاحترافية:</h4>
                            <ul className="text-[10px] text-muted-foreground space-y-1 text-right list-none">
                                <li>• صف الإضاءة (مثلاً: إضاءة سينمائية، شروق الشمس).</li>
                                <li>• حدد نوع الكاميرا (مثلاً: زاوية واسعة، تصوير عن قرب).</li>
                                <li>• اذكر الأسلوب الفني (مثلاً: واقعي جداً، خيال علمي).</li>
                            </ul>
                        </div>

                        <button
                            onClick={startAiGeneration}
                            disabled={isGenerating || !prompt}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                                isGenerating || !prompt
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-purple-500/20 hover:shadow-purple-500/40 text-white font-bold text-lg"
                            )}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> جاري التحليل...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" /> ابدأ التوليد السحري
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                        <h4 className="text-xs font-bold text-purple-500 mb-1 uppercase text-right">
                            معالجة سحابية متقدمة:
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed text-right">
                            يتم إرسال طلبك لمحركات Google Veo3 العملاقة. عملية التوليد تتطلب قوة معالجة كبيرة وقد تستغرق دقائق قليلة لضمان أعلى جودة ممكنة.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card aspect-video rounded-3xl overflow-hidden relative border-2 border-border/50 group bg-black shadow-2xl">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-8 lg:p-12 text-center"
                                >
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                                        <motion.div
                                            className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">
                                            {progress}%
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{statusText}</h3>
                                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                        خوادمنا تعمل الآن على تحويل كلماتك إلى مشاهد بصرية واقعية عبر نماذج Google Veo3.
                                    </p>

                                    <div className="w-full max-w-md mt-10 h-1.5 bg-muted/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </motion.div>
                            ) : videoGenerated ? (
                                <motion.div
                                    key="player"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative w-full h-full"
                                >
                                    <video
                                        ref={videoRef}
                                        src={videoUrl}
                                        className="w-full h-full object-contain bg-black"
                                        controls
                                        autoPlay
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center gap-4 p-8 text-center">
                                    <div className="p-6 rounded-3xl bg-muted/50 border border-border/50">
                                        <Sparkles className="w-12 h-12 text-purple-500/30" />
                                    </div>
                                    <div>
                                        <p className="text-foreground font-bold text-xl mb-1 mt-2">
                                            بانتظار إبداعك القادم
                                        </p>
                                        <p className="text-muted-foreground text-sm max-w-[300px]">
                                            صف المشهد الذي تتخيله في المربع الجانبي وسنقوم بتحويله إلى واقع سينمائي مذهل.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {videoGenerated && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col sm:flex-row items-center justify-between p-5 lg:p-6 glass-card rounded-2xl gap-4 border-l-4 border-l-green-500 shadow-xl"
                        >
                            <div className="text-center sm:text-right w-full sm:w-auto">
                                <h4 className="font-bold text-lg text-white">تم ابتكار الفيديو بنجاح! ✨</h4>
                                <p className="text-xs text-muted-foreground">
                                    توليد AI • Google Veo3 • جودة سينمائية عالية
                                </p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                            >
                                <Download className="w-5 h-5" /> تحميل الفيديو المبتكر
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
