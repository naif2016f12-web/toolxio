"use client";

import { useState, useEffect } from "react";
import { Video, Wand2, Play, Download, Sparkles, Image as ImageIcon, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoAICreator() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoGenerated, setVideoGenerated] = useState(false);

    const startGeneration = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setProgress(0);
        setVideoGenerated(false);
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
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                        <Sparkles className="w-6 h-6 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold">منشئ الفيديو بالذكاء الاصطناعي (AI Video)</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    حوّل وصفك النصي إلى فيديوهات سينمائية مذهلة. استخدم قوة الذكاء الاصطناعي لتوليد المشاهد والتحريكات.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-2xl">
                        <label className="block text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-widest">
                            وصف الفيديو (Prompt)
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="مثال: رائد فضاء يسير على سطح القمر بأسلوب سينمائي، إضاءة نيون زرقاء..."
                            rows={5}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none text-foreground"
                        />

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="p-3 bg-muted/50 rounded-xl border border-border flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">جودة الفيديو</span>
                                <span className="text-sm font-medium">4K Ultra HD</span>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-xl border border-border flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">النمط</span>
                                <span className="text-sm font-medium">سينمائي</span>
                            </div>
                        </div>

                        <button
                            onClick={startGeneration}
                            disabled={isGenerating || !prompt}
                            className={cn(
                                "w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
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

                    <div className="glass-card p-6 rounded-2xl">
                        <h4 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">خيارات إضافية</h4>
                        <div className="space-y-3">
                            <button className="w-full p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3 text-sm hover:bg-muted/50 transition-colors">
                                <ImageIcon className="w-4 h-4 text-blue-400" /> إضافة صور كمرجع
                            </button>
                            <button className="w-full p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3 text-sm hover:bg-muted/50 transition-colors">
                                <Music className="w-4 h-4 text-pink-400" /> اختيار موسيقى خلفية
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card aspect-video rounded-3xl overflow-hidden relative border-2 border-border/50 group">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center p-12"
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
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center group"
                                >
                                    <button className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all scale-95 hover:scale-100">
                                        <Play className="w-10 h-10 fill-white" />
                                    </button>
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
                            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all">
                                <Download className="w-5 h-5" /> تحميل الفيديو
                            </button>
                        </motion.div>
                    )}

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <p className="text-[11px] text-yellow-500 font-medium leading-relaxed">
                            تنبيه: هذه الأداة تستخدم نماذج الذكاء الاصطناعي التوليدي. قد تستغرق المعالجة وقتاً أطول اعتماداً على طول الفيديو وتعقيد الوصف. في هذه النسخة التجريبية، يتم محاكاة عملية التوليد لأغراض العرض التقني.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
