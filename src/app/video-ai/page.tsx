"use client";

import { useState, useEffect, useRef } from "react";
import { Video, Wand2, Play, Download, Sparkles, Image as ImageIcon, Music, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Sample video for demonstration
const SAMPLE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-out-of-focus-39832-large.mp4";

export default function VideoAICreator() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoGenerated, setVideoGenerated] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);

    const startGeneration = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setProgress(0);
        setVideoGenerated(false);
        setIsPlaying(false);

        try {
            console.log("جاري البدء في معالجة الفيديو...");

            // Simulating the user's "Magic Code" logic
            const response = await fetch(SAMPLE_VIDEO_URL);
            const data = await response.blob();

            // Transform to Blob and create object URL for immediate display/download
            const blobUrl = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
            setVideoUrl(blobUrl);
            console.log("تم تحميل بيانات الفيديو بنجاح!");
        } catch (error) {
            console.error("حدث خطأ أثناء إظهار الفيديو:", error);
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
        link.download = `Toolxio_Video_${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("بدأ التحميل بنجاح!");
    };

    useEffect(() => {
        if (isGenerating && progress < 100) {
            const timer = setTimeout(() => {
                setProgress((prev) => Math.min(prev + 2, 100));
            }, 50);
            return () => clearTimeout(timer);
        } else if (progress === 100) {
            setIsGenerating(false);
            setVideoGenerated(true);
        }
    }, [isGenerating, progress]);

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-6 lg:mb-8 text-center lg:text-right">
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 rounded-xl bg-purple-500/10 w-fit">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">منشئ الفيديو بالذكاء الاصطناعي</h2>
                </div>
                <p className="text-muted-foreground text-sm lg:text-lg">
                    حوّل وصفك النصي إلى فيديوهات سينمائية مذهلة باستخدام قوة الذكاء الاصطناعي.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-1 space-y-4 lg:space-y-6">
                    <div className="glass-card p-4 lg:p-6 rounded-2xl">
                        <label className="block text-[10px] lg:text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-widest">
                            وصف الفيديو (Prompt)
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="مثال: رائد فضاء يسير على سطح القمر بأسلوب سينمائي..."
                            rows={4}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none text-foreground text-sm"
                        />

                        <div className="mt-4 lg:mt-6 grid grid-cols-2 gap-2 lg:gap-3">
                            <div className="p-2 lg:p-3 bg-muted/50 rounded-xl border border-border flex flex-col gap-1">
                                <span className="text-[8px] lg:text-[10px] uppercase font-bold text-muted-foreground">الجودة</span>
                                <span className="text-xs lg:text-sm font-medium">4K Ultra HD</span>
                            </div>
                            <div className="p-2 lg:p-3 bg-muted/50 rounded-xl border border-border flex flex-col gap-1">
                                <span className="text-[8px] lg:text-[10px] uppercase font-bold text-muted-foreground">النمط</span>
                                <span className="text-xs lg:text-sm font-medium">سينمائي</span>
                            </div>
                        </div>

                        <button
                            onClick={startGeneration}
                            disabled={isGenerating || !prompt}
                            className={cn(
                                "w-full mt-4 lg:mt-6 py-3 lg:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm lg:text-base",
                                isGenerating || !prompt
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98] text-white"
                            )}
                        >
                            {isGenerating ? "جاري التوليد..." : (
                                <>
                                    <Wand2 className="w-5 h-5" /> توليد الفيديو
                                </>
                            )}
                        </button>
                    </div>

                    <div className="glass-card p-4 lg:p-6 rounded-2xl">
                        <h4 className="font-semibold mb-3 lg:mb-4 text-xs lg:text-sm uppercase text-muted-foreground">خيارات إضافية</h4>
                        <div className="space-y-2 lg:space-y-3">
                            <button className="w-full p-2 lg:p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-2 lg:gap-3 text-xs lg:text-sm hover:bg-muted/50 transition-colors">
                                <ImageIcon className="w-4 h-4 text-blue-400" /> إضافة صور كمرجع
                            </button>
                            <button className="w-full p-2 lg:p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-2 lg:gap-3 text-xs lg:text-sm hover:bg-muted/50 transition-colors">
                                <Music className="w-4 h-4 text-pink-400" /> اختيار موسيقى خلفية
                            </button>
                        </div>
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
                                    className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-12"
                                >
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                                        <motion.div
                                            className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                                            {Math.round(progress)}%
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">جاري معالجة المشاهد...</h3>
                                    <p className="text-muted-foreground text-sm max-w-xs text-center">
                                        نقوم باستخدام محركات الذكاء الاصطناعي لتحويل وصفك إلى فيديو واقعي.
                                    </p>

                                    <div className="w-full max-w-md mt-12 h-1.5 bg-muted rounded-full overflow-hidden">
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
                                        className="w-full h-full object-cover"
                                        loop
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={togglePlay}
                                            className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all scale-95 hover:scale-100"
                                        >
                                            {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white ml-2" />}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center gap-4">
                                    <Video className="w-16 h-16 text-muted-foreground/30" />
                                    <p className="text-muted-foreground/50 font-medium">الفيديو سيظهر هنا بعد التوليد</p>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Simulated background while generating */}
                        {isGenerating && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-indigo-900"
                                />
                            </div>
                        )}
                    </div>

                    {videoGenerated && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-6 glass-card rounded-2xl"
                        >
                            <div>
                                <h4 className="font-bold text-lg">تم توليد الفيديو بنجاح!</h4>
                                <p className="text-sm text-muted-foreground">الدقة: 4K • الطول: 10 ثوانٍ • النمط: سينمائي</p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                <Download className="w-5 h-5" /> تحميل الفيديو
                            </button>
                        </motion.div>
                    )}

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <p className="text-[11px] text-yellow-500 font-medium leading-relaxed">
                            تنبيه: هذه الأداة تستخدم نماذج الذكاء الاصطناعي التوليدي. يتم حالياً استخدام فيديو تجريبي للعرض التقني لسرعة المعالجة في النسخة التجريبية. جميع عمليات التحميل تتم مباشرة من خلال رابط الفيديو المولد.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
