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
                                text: title || "Untitled Document",
                                heading: HeadingLevel.HEADING_1,
                                alignment: AlignmentType.CENTER,
                                spacing: { after: 400 },
                            }),
                            ...content.split("\n").map((line) =>
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: line,
                                            size: 24,
                                        }),
                                    ],
                                    spacing: { after: 200 },
                                })
                            ),
                        ],
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `${title || "Toolxio-Document"}.docx`);
        } catch (error) {
            console.error("Failed to generate DOCX:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10">
                        <FileText className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h2 className="text-3xl font-bold">AI Document Writer</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    Craft professional letters, reports, or essays. Your content is securely processed and exported to Word Docx format.
                </p>
            </header>

            <div className="glass-card flex flex-col min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-muted/50 border-b border-border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Undo className="w-4 h-4" /></button>
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Redo className="w-4 h-4" /></button>
                        <div className="w-[1px] h-4 bg-border mx-2" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Document Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase">Auto-Saving</div>
                    </div>
                </div>

                <div className="p-8 flex-1 bg-card">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Document Title..."
                        className="w-full bg-transparent text-3xl font-bold mb-6 focus:outline-none placeholder:text-muted-foreground/30"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your document here..."
                        className="w-full bg-transparent text-lg text-muted-foreground resize-none focus:outline-none min-h-[300px] leading-relaxed"
                    />
                </div>

                <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
                    <button
                        onClick={generateDoc}
                        disabled={isGenerating}
                        className={cn(
                            "px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all",
                            isGenerating
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                        )}
                    >
                        {isGenerating ? "Generating..." : (
                            <>
                                <Download className="w-5 h-5" /> Export to Word
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
