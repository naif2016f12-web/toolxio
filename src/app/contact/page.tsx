"use client";

import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-green-500/10">
                    <Mail className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold">اتصل بنا</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10">
                            <Mail className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-lg">البريد الإلكتروني</h3>
                            <p className="text-muted-foreground">support@toolxio.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/10">
                            <MessageSquare className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-lg">الدعم الفني</h3>
                            <p className="text-muted-foreground">متاح على مدار الساعة</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl">
                    <h3 className="font-bold text-foreground text-xl mb-6 text-right">أرسل رسالة</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="الاسم"
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <textarea
                            placeholder="رسالتك..."
                            rows={4}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        />
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                            إرسال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
