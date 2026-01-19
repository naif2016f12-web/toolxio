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
      title: "منشئ الفيديو AI",
      description: "حول أفكارك النصية إلى فيديوهات سينمائية مذهلة بدقة 4K باستخدام محركات الذكاء الاصطناعي.",
      icon: Sparkles,
      color: "bg-purple-500",
      href: "/video-ai",
    },
    {
      title: "منشئ العروض التقديمية AI",
      description: "حول أفكارك إلى شرائح PPTX مذهلة في ثوانٍ. ما عليك سوى تقديم موضوع وسنتولى نحن الباقي.",
      icon: Presentation,
      color: "bg-blue-500",
      href: "/ppt",
    },
    {
      title: "كاتب المستندات AI",
      description: "قم بتوليد خطابات احترافية، تقارير، ومقالات. قم بتصديرها فوراً إلى ملفات Word Docx عالية الجودة.",
      icon: FileText,
      color: "bg-indigo-500",
      href: "/doc",
    },
    {
      title: "منشئ جداول البيانات AI",
      description: "أنشئ جداول مالية ذكية، جداول زمنية، ومتتبعات بيانات. قم بالتحميل كملفات Excel XLSX جاهزة للاستخدام.",
      icon: Table,
      color: "bg-green-500",
      href: "/sheets",
    },
    {
      title: "أدوات الفيديو",
      description: "معالجة سريعة للفيديو وأدوات لاحتياجات الوسائط الخاصة بك. يتم معالجتها بالكامل في متصفحك.",
      icon: Video,
      color: "bg-purple-500",
      href: "/video",
    },
    {
      title: "محول وأدوات PDF",
      description: "دمج وتقسيم وتحويل ملفات PDF بسهولة. معالجة تركز على الخصوصية وتتم داخل المتصفح.",
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
          <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">تكامل الذكاء الاصطناعي</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">مرحباً بك في Toolxio</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          منصتك الشاملة لإنشاء المستندات الذكية وأدوات الوسائط.
          اختر أداة مدعومة بالذكاء الاصطناعي أدناه للبدء.
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
