"use client";

import { FileSearch, FileText, Merge, Split, RotateCcw, Download, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PDFPage() {
    const tools = [
        { title: "دمج PDF", icon: Merge, description: "دمج عدة ملفات PDF في ملف واحد." },
        { title: "تقسيم PDF", icon: Split, description: "استخراج صفحات أو تقسيم ملف PDF إلى عدة ملفات." },
        { title: "ضغط PDF", icon: RotateCcw, description: "تقليل حجم الملف مع الحفاظ على الجودة." },
        { title: "PDF إلى Word", icon: FileText, description: "تحويل مستندات PDF إلى ملفات Word قابلة للتعديل." },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10">
                        <FileSearch className="w-6 h-6 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-bold">محول وأدوات PDF</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    إدارة مستندات PDF بشكل آمن. تتم جميع عمليات المعالجة محلياً على جهازك.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {tools.map((tool, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: -4 }} // Adjusted for RTL
                        className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-all font-medium"
                    >
                        <div className="p-3 rounded-lg bg-orange-500/10">
                            <tool.icon className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-right">{tool.title}</h4>
                            <p className="text-xs text-muted-foreground text-right">{tool.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-12 rounded-3xl border-dashed border-2 border-border flex flex-col items-center justify-center text-center gap-6">
                <div className="p-6 rounded-full bg-muted/50">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">اسحب ملفات PDF هنا</h3>
                    <p className="text-muted-foreground">أو انقر لتصفح ملفاتك</p>
                </div>
                <button className="px-8 py-3 bg-orange-500 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all text-white">
                    اختر الملفات
                </button>
            </div>
        </div>
    );
}
