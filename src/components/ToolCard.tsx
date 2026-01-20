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
                <div className="glass-card p-4 lg:p-6 rounded-2xl h-full flex flex-col gap-3 lg:gap-4">
                    <div className={cn("p-2 lg:p-3 rounded-xl w-fit bg-opacity-10", color)}>
                        <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6", color.replace("bg-", "text-"))} />
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">{title}</h3>
                        <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="mt-auto pt-2 lg:pt-4 flex items-center text-xs lg:text-sm font-medium text-blue-400 group-hover:text-blue-300">
                        افتح الأداة ←
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
