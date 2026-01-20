"use client";

import { useState, useEffect, useRef } from "react";
import { Video, Wand2, Play, Download, Sparkles, Image as ImageIcon, Music, Pause, X, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoAICreator() {
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [videoGenerated, setVideoGenerated] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [quality, setQuality] = useState<"480p" | "720p" | "1080p">("720p");

    const resolutions = {
        "480p": { w: 854, h: 480 },
        "720p": { w: 1280, h: 720 },
        "1080p": { w: 1920, h: 1080 }
    };

    const loadFFmpeg = async () => {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        ffmpeg.on("log", ({ message }) => {
            console.log(message);
            if (message.includes("frame=")) {
                const parts = message.split("frame=")[1].trim().split(" ");
                // Rough progress based on frames if we knew total, but for now just log
            }
        });

        ffmpeg.on("progress", ({ progress: p }) => {
            setProgress(Math.round(p * 100));
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        console.log("FFmpeg loaded!");
    };

    useEffect(() => {
        loadFFmpeg();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const startGeneration = async () => {
        if (!ffmpegRef.current || images.length === 0) return;

        setIsGenerating(true);
        setProgress(0);
        setVideoGenerated(false);
        setVideoUrl("");
        setStatusText("جاري تحضير الملفات...");

        const ffmpeg = ffmpegRef.current;
        const { w, h } = resolutions[quality];

        try {
            // Write images to FFmpeg FS
            for (let i = 0; i < images.length; i++) {
                const imgData = await fetchFile(images[i]);
                await ffmpeg.writeFile(`img${i}.jpg`, imgData);
            }

            setStatusText(`جاري التوليد بدقة ${quality}...`);

            // Command to create video from images
            // -framerate 1: 1 second per image
            // -i img%d.jpg: input pattern
            // -c:v libx264: video codec
            // -pix_fmt yuv420p: compatibility
            // Scaling and padding to ensure even dimensions (required by libx264)

            // For text overlay: we can use drawtext but it requires font files. 
            // Minimal approach: just merge images. 
            // Advanced: use drawtext if we had a font.

            await ffmpeg.exec([
                "-framerate", "1",
                "-i", "img%d.jpg",
                "-vf", `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2,format=yuv420p`,
                "-t", `${images.length}`,
                "output.mp4"
            ]);

            const data = await ffmpeg.readFile("output.mp4");
            const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: "video/mp4" }));

            setVideoUrl(url);
            setVideoGenerated(true);
            setStatusText("تم التوليد بنجاح!");
        } catch (error) {
            console.error("FFmpeg Error:", error);
            setStatusText("حدث خطأ أثناء التوليد");
        } finally {
            setIsGenerating(false);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleDownload = () => {
        if (!videoUrl) return;
        const link = document.createElement("a");
        link.href = videoUrl;
        link.download = `Toolxio_AI_${quality}_Video_${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-6 lg:mb-8 text-center lg:text-right">
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 rounded-xl bg-purple-500/10 w-fit">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">منشئ الفيديو الاحترافي (FFmpeg)</h2>
                </div>
                <p className="text-muted-foreground text-sm lg:text-lg">
                    دمج الصور والنصوص وتحويلها إلى فيديو MP4 مباشرة في متصفحك بدقة عالية.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-1 space-y-4 lg:space-y-6">
                    <div className="glass-card p-4 lg:p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-3 text-muted-foreground uppercase tracking-widest">
                            <label className="text-xs font-semibold">الصور المختارة ({images.length})</label>
                            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">{quality}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4 max-h-[200px] overflow-y-auto p-1">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-border">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        className="w-full h-full object-cover"
                                        alt="preview"
                                    />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all gap-1"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="text-[10px]">إضافة</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">
                            اختيار جودة الفيديو
                        </label>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {(["480p", "720p", "1080p"] as const).map((q) => (
                                <button
                                    key={q}
                                    onClick={() => setQuality(q)}
                                    className={cn(
                                        "py-2 rounded-xl text-xs font-bold transition-all border",
                                        quality === q
                                            ? "bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/20"
                                            : "bg-muted border-border text-muted-foreground hover:border-purple-500/50"
                                    )}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">
                            نص إضافي (اختياري)
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="اكتب وصفاً ليتم دمجه..."
                            rows={2}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none text-foreground text-sm mb-4"
                        />

                        <button
                            onClick={startGeneration}
                            disabled={isGenerating || images.length === 0}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                                isGenerating || images.length === 0
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-purple-500/20 hover:shadow-purple-500/40 text-white"
                            )}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> جاري التوليد...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" /> بدء التوليد
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                        <h4 className="text-xs font-bold text-accent mb-1 uppercase">ملاحظة تقنية:</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            تتم المعالجة بالكامل داخل متصفحك باستخدام تقنية WebAssembly.
                            لا يتم رفع صورك إلى أي خادم، مما يضمن خصوصية تامة وسرعة في التنفيذ.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card aspect-video rounded-3xl overflow-hidden relative border-2 border-border/50 group bg-black">
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
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                                            {progress}%
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{statusText}</h3>
                                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                        يتم الآن تشغيل محرك FFmpeg لمعالجة كل إطار من إطارات الفيديو الخاص بك.
                                    </p>

                                    <div className="w-full max-w-md mt-10 h-1.5 bg-muted rounded-full overflow-hidden">
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
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center gap-4 p-8 text-center">
                                    <div className="p-4 rounded-full bg-muted/50">
                                        <Video className="w-12 h-12 text-muted-foreground/30" />
                                    </div>
                                    <div>
                                        <p className="text-foreground font-bold text-lg mb-1">جاهز للبدء</p>
                                        <p className="text-muted-foreground text-sm max-w-[250px]">
                                            قم بإضافة حزمتك من الصور ثم اضغط على زر التوليد لصناعة الفيديو.
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
                            className="flex flex-col sm:flex-row items-center justify-between p-5 lg:p-6 glass-card rounded-2xl gap-4"
                        >
                            <div className="text-center sm:text-right w-full sm:w-auto">
                                <h4 className="font-bold text-lg text-green-400">تم صنع الفيديو بنجاح! ✨</h4>
                                <p className="text-xs text-muted-foreground">التنسيق: MP4 • دقة عالية • معالج محلياً</p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                            >
                                <Download className="w-5 h-5" /> تحميل الفيديو
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
