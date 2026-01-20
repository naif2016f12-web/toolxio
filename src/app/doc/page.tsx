"use client";

import { useState } from "react";
import { FileText, Download, Save, Undo, Redo } from "lucide-react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DocPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDoc = async () => {
        setIsGenerating(true);
        try {
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                text: title || "مستند بدون عنوان",
                                heading: HeadingLevel.HEADING_1,
                                alignment: AlignmentType.RIGHT, // Right align for Arabic
                                spacing: { after: 400 },
                            }),
                            ...content.split("\n").map((line) =>
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: line,
                                            size: 24,
                                            rightToLeft: true, // Enable RTL in docx
                                        }),
                                    ],
                                    alignment: AlignmentType.RIGHT,
                                    spacing: { after: 200 },
                                })
                            ),
                        ],
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `${title || "Toolxio-مستند"}.docx`);
        } catch (error) {
            console.error("Failed to generate DOCX:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-6 lg:mb-8">
                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 rounded-xl bg-indigo-500/10">
                        <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-500" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">كاتب المستندات AI</h2>
                </div>
                <p className="text-muted-foreground text-base lg:text-lg">
                    قم بصياغة خطابات أو تقارير أو مقالات احترافية. يتم معالجة محتواك بأمان وتصديره بتنسيق Word Docx.
                </p>
            </header>

            <div className="glass-card flex flex-col min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-muted/50 border-b border-border p-3 lg:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <button className="p-1 lg:p-2 text-muted-foreground hover:text-foreground transition-colors"><Undo className="w-4 h-4" /></button>
                        <button className="p-1 lg:p-2 text-muted-foreground hover:text-foreground transition-colors"><Redo className="w-4 h-4" /></button>
                        <div className="w-[1px] h-4 bg-border mx-1 lg:mx-2" />
                        <span className="text-[10px] lg:text-xs font-semibold text-muted-foreground uppercase tracking-widest">محرر المستندات</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-2 lg:px-3 py-1 bg-green-500/10 text-green-500 text-[8px] lg:text-[10px] font-bold rounded-full uppercase">حفظ تلقائي</div>
                    </div>
                </div>

                <div className="p-5 lg:p-8 flex-1 bg-card">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="أدخل عنوان المستند..."
                        className="w-full bg-transparent text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 focus:outline-none placeholder:text-muted-foreground/30"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="ابدأ في كتابة مستندك هنا..."
                        className="w-full bg-transparent text-base lg:text-lg text-muted-foreground resize-none focus:outline-none min-h-[300px] leading-relaxed"
                    />
                </div>

                <div className="p-3 lg:p-4 bg-muted/30 border-t border-border flex justify-end">
                    <button
                        onClick={generateDoc}
                        disabled={isGenerating}
                        className={cn(
                            "w-full lg:w-auto px-6 lg:px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                            isGenerating
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                        )}
                    >
                        {isGenerating ? "جاري التوليد..." : (
                            <>
                                <Download className="w-5 h-5" /> تصدير إلى Word
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
