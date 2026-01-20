"use client";

import { useState } from "react";
import { Table, Download, Plus, Trash2, LayoutGrid } from "lucide-react";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SheetsPage() {
    const [sheetName, setSheetName] = useState("");
    const [columns, setColumns] = useState(["العمود 1", "العمود 2"]);
    const [data, setData] = useState([
        ["بيانات 1", "بيانات 2"],
        ["بيانات 3", "بيانات 4"],
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const addRow = () => {
        setData([...data, Array(columns.length).fill("")]);
    };

    const addColumn = () => {
        setColumns([...columns, `العمود ${columns.length + 1}`]);
        setData(data.map((row) => [...row, ""]));
    };

    const removeRow = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };

    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = value;
        setData(newData);
    };

    const updateColumn = (index: number, value: string) => {
        const newColumns = [...columns];
        newColumns[index] = value;
        setColumns(newColumns);
    };

    const generateExcel = () => {
        setIsGenerating(true);
        try {
            const ws = XLSX.utils.aoa_to_sheet([columns, ...data]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `${sheetName || "Toolxio-جدول"}.xlsx`);
        } catch (error) {
            console.error("Failed to generate Excel:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-6 lg:mb-8 text-center lg:text-right">
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3 lg:mb-4">
                    <div className="p-2 lg:p-3 rounded-xl bg-green-500/10 w-fit">
                        <Table className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold">منشئ جداول البيانات AI</h2>
                </div>
                <p className="text-muted-foreground text-sm lg:text-lg">
                    قم بتوليد جداول بيانات ذكية للشؤون المالية أو الجداول الزمنية. تصدير سهل إلى Excel.
                </p>
            </header>

            <div className="glass-card p-4 lg:p-6 rounded-2xl mb-6 lg:mb-8">
                <label className="block text-xs lg:text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                    اسم الجدول
                </label>
                <input
                    type="text"
                    value={sheetName}
                    onChange={(e) => setSheetName(e.target.value)}
                    placeholder="مثال: ميزانية الشهر 2024"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm lg:text-base text-foreground"
                />
            </div>

            <div className="glass-card rounded-2xl overflow-hidden mb-6 lg:mb-8 border border-border">
                <div className="bg-muted/50 p-3 lg:p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <LayoutGrid className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                        <span className="font-semibold text-sm lg:text-base text-foreground">محرر البيانات</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={addColumn}
                            className="flex-1 sm:flex-none px-3 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                        >
                            <Plus className="w-3 h-3 lg:w-4 lg:h-4" /> عمود
                        </button>
                        <button
                            onClick={addRow}
                            className="flex-1 sm:flex-none px-3 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
                        >
                            <Plus className="w-3 h-3 lg:w-4 lg:h-4" /> صف
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-muted/30">
                                <th className="p-2 lg:p-4 border-b border-l border-border w-10 lg:w-12 text-center text-[10px] lg:text-xs font-bold text-muted-foreground">#</th>
                                {columns.map((col, i) => (
                                    <th key={i} className="p-2 lg:p-4 border-b border-l border-border min-w-[120px] lg:min-w-[150px]">
                                        <input
                                            type="text"
                                            value={col}
                                            onChange={(e) => updateColumn(i, e.target.value)}
                                            className="bg-transparent font-bold text-foreground focus:outline-none w-full text-xs lg:text-sm"
                                        />
                                    </th>
                                ))}
                                <th className="p-2 lg:p-4 border-b border-border w-10 lg:w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-muted/10 transition-colors">
                                    <td className="p-2 lg:p-4 border-b border-l border-border text-center text-[10px] lg:text-xs text-muted-foreground font-mono">
                                        {rowIndex + 1}
                                    </td>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex} className="p-2 lg:p-4 border-b border-l border-border">
                                            <input
                                                type="text"
                                                value={cell}
                                                onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                                className="bg-transparent text-foreground focus:outline-none w-full text-xs lg:text-sm"
                                            />
                                        </td>
                                    ))}
                                    <td className="p-2 lg:p-4 border-b border-border text-center">
                                        <button
                                            onClick={() => removeRow(rowIndex)}
                                            className="text-muted-foreground hover:text-red-400 p-1 rounded-md hover:bg-red-400/10 transition-all"
                                        >
                                            <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                onClick={generateExcel}
                disabled={isGenerating}
                className={cn(
                    "w-full py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg flex items-center justify-center gap-2 lg:gap-3 transition-all",
                    isGenerating
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20 active:scale-[0.98]"
                )}
            >
                <Download className="w-5 h-5 lg:w-6 lg:h-6" /> تصدير إلى Excel XLSX
            </button>
        </div>
    );
}
