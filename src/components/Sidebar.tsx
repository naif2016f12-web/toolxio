"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Presentation,
    FileText,
    Table,
    Video,
    FileSearch,
    Settings,
    HelpCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "AI PPT Creator", icon: Presentation, href: "/ppt" },
    { name: "AI Doc Writer", icon: FileText, href: "/doc" },
    { name: "AI Sheets", icon: Table, href: "/sheets" },
    { name: "Video Tools", icon: Video, href: "/video" },
    { name: "PDF Tools", icon: FileSearch, href: "/pdf" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Toolxio
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-accent text-white shadow-lg shadow-blue-500/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-white" : "text-muted-foreground group-hover:text-blue-400"
                            )} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-foreground transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium">Help Center</span>
                </button>
            </div>
        </aside>
    );
}
