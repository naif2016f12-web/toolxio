"use client";

import { Video, Upload, Play, Scissors, Settings2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function VideoPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                        <Video className="w-6 h-6 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold">أدوات الفيديو الذكية</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    قم بمعالجة مقاطع الفيديو الخاصة بك بالكامل في المتصفح. سريع، خاص، ومجاني.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 w-fit">
                        <Upload className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">محول الفيديو</h3>
                    <p className="text-muted-foreground text-sm">
                        حول MP4 إلى WebM أو GIF أو استخرج الصوت كملف MP3.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-all">
                        افتح المحول
                    </button>
                </div>

                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="p-3 rounded-xl bg-red-500/10 w-fit">
                        <Scissors className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold">قص الفيديو</h3>
                    <p className="text-muted-foreground text-sm">
                        قص وتحرير مقاطع الفيديو الخاصة بك دون رفعها إلى أي خادم.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-all">
                        افتح أداة القص
                    </button>
                </div>
            </div>

            <div className="glass-card p-12 rounded-3xl border-dashed border-2 border-border flex flex-col items-center justify-center text-center gap-6">
                <div className="p-6 rounded-full bg-muted/50">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">اسحب الفيديو هنا</h3>
                    <p className="text-muted-foreground">اختر ملفاً لبدء المعالجة محلياً.</p>
                </div>
                <button className="px-8 py-3 bg-accent rounded-xl font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all">
                    اختر ملفاً
                </button>
            </div>
        </div>
    );
}
