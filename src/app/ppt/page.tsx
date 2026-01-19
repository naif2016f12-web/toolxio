"use client";

import { useState } from "react";
import { Presentation, Download, Sparkles, Plus, Trash2 } from "lucide-react";
import pptxgen from "pptxgenjs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Slide {
    title: string;
    content: string;
}

export default function PPTPage() {
    const [topic, setTopic] = useState("");
    const [slides, setSlides] = useState<Slide[]>([
        { title: "المقدمة", content: "تفاصيل حول الموضوع..." },
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const addSlide = () => {
        setSlides([...slides, { title: "شريحة جديدة", content: "" }]);
    };

    const removeSlide = (index: number) => {
        setSlides(slides.filter((_, i) => i !== index));
    };

    const updateSlide = (index: number, field: keyof Slide, value: string) => {
        const newSlides = [...slides];
        newSlides[index][field] = value;
        setSlides(newSlides);
    };

    const generatePPT = async () => {
        setIsGenerating(true);
        try {
            const pres = new pptxgen();
            (pres as any).rtl = true; // Enable RTL for PPT

            slides.forEach((slideData) => {
                const slide = pres.addSlide();

                // Add Title
                slide.addText(slideData.title, {
                    x: 0.5,
                    y: 1,
                    w: "90%",
                    h: 1,
                    fontSize: 36,
                    bold: true,
                    color: "3b82f6",
                    align: "right", // Right align for Arabic
                });

                // Add Content
                slide.addText(slideData.content, {
                    x: 0.5,
                    y: 2,
                    w: "90%",
                    h: 3,
                    fontSize: 20,
                    color: "333333",
                    align: "right", // Right align for Arabic
                    bullet: true,
                });
            });

            await pres.writeFile({ fileName: `${topic || "Toolxio-عرض-تقديمي"}.pptx` });
        } catch (error) {
            console.error("Failed to generate PPT:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                        <Presentation className="w-6 h-6 text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold">منشئ العروض التقديمية AI</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    قم بإنشاء شرائح احترافية في ثوانٍ. أضف شرائحك وقم بتحميلها كملف PPTX.
                </p>
            </header>

            <div className="glass-card p-6 rounded-2xl mb-8">
                <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                    موضوع العرض التقديمي
                </label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="مثال: مستقبل الذكاء الاصطناعي في الطب"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">الشرائح</h3>
                    <button
                        onClick={addSlide}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> إضافة شريحة
                    </button>
                </div>

                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-2xl relative group"
                    >
                        <button
                            onClick={() => removeSlide(index)}
                            className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">عنوان الشريحة {index + 1}</label>
                                <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => updateSlide(index, "title", e.target.value)}
                                    className="w-full bg-transparent border-b border-border text-lg font-semibold py-2 focus:outline-none focus:border-accent transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block uppercase">المحتوى (سطر واحد لكل نقطة)</label>
                                <textarea
                                    value={slide.content}
                                    onChange={(e) => updateSlide(index, "content", e.target.value)}
                                    rows={3}
                                    className="w-full bg-transparent border-none text-muted-foreground resize-none focus:outline-none"
                                    placeholder="أدخل محتوى الشريحة هنا..."
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={generatePPT}
                disabled={isGenerating}
                className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all",
                    isGenerating
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98]"
                )}
            >
                {isGenerating ? (
                    <>جاري التوليد...</>
                ) : (
                    <>
                        <Download className="w-6 h-6" /> تحميل ملف PPTX
                    </>
                )}
            </button>
        </div>
    );
}
