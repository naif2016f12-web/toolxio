"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if the app is already installed/running in standalone mode
        if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
            setIsStandalone(true);
        }

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Register Service Worker
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").then(
                    (registration) => {
                        console.log("SW registered:", registration.scope);
                    },
                    (err) => {
                        console.log("SW registration failed:", err);
                    }
                );
            });
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone || !deferredPrompt) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="flex items-center gap-3 px-4 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 group mt-4"
        >
            <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold">تثبيت البرنامج (App)</span>
        </button>
    );
}
