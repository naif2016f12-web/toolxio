"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface ToolCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    href: string;
}

export default function ToolCard({ title, description, icon: Icon, color, href }: ToolCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href={href} className="block h-full">
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col gap-4">
                    <div className={cn("p-3 rounded-xl w-fit bg-opacity-10", color)}>
                        <Icon className={cn("w-6 h-6", color.replace("bg-", "text-"))} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                        افتح الأداة ←
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
