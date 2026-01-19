"use client";

import ToolCard from "@/components/ToolCard";
import {
  Presentation,
  FileText,
  Table,
  Video,
  FileSearch,
  Sparkles
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "AI Presentation Creator",
      description: "Transform your ideas into stunning PPTX slides in seconds. Just provide a topic and we'll do the rest.",
      icon: Presentation,
      color: "bg-blue-500",
      href: "/ppt",
    },
    {
      title: "AI Document Writer",
      description: "Generate professional letters, reports, and essays. Instantly export to high-quality Word Docx files.",
      icon: FileText,
      color: "bg-indigo-500",
      href: "/doc",
    },
    {
      title: "AI Sheets Generator",
      description: "Create smart financial tables, schedules, and data trackers. Download as Excel XLSX files ready to use.",
      icon: Table,
      color: "bg-green-500",
      href: "/sheets",
    },
    {
      title: "Video Tools",
      description: "Quick video processing and tools for your media needs. All processed right in your browser.",
      icon: Video,
      color: "bg-purple-500",
      href: "/video",
    },
    {
      title: "PDF Converter & Tools",
      description: "Merge, split, and convert PDF files with ease. Privacy-focused browser-side processing.",
      icon: FileSearch,
      color: "bg-orange-500",
      href: "/pdf",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">AI Integration</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Welcome to Toolxio</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your all-in-one platform for smart document creation and media tools.
          Select an AI-powered tool below to get started.
        </p>
      </header>

      <div className="bento-grid">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
}
