"use client";

import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-blue-500/10">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <h1 className="text-4xl font-bold">سياسة الخصوصية</h1>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6 text-muted-foreground leading-relaxed text-lg">
                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">1. جمع المعلومات</h2>
                    <p>
                        نحن في Toolxio نحترم خصوصيتك. يتم معالجة جميع الملفات (المستندات، الفيديوهات، الجداول) محلياً داخل متصفحك. نحن لا نقوم برفع أو تخزين أي من ملفاتك الخاصة على خوادمنا.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">2. ملفات تعريف الارتباط (Cookies)</h2>
                    <p>
                        نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور. كما نستخدم خدمات طرف ثالث مثل Google AdSense التي قد تستخدم ملفات تعريف الارتباط لعرض الإعلانات بناءً على زياراتك السابقة.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">3. أمن البيانات</h2>
                    <p>
                        نحن نلتزم بحماية بياناتك الشخصية المحدودة (مثل معلومات الحساب إذا وجدت) باستخدام تقنيات تشفير حديثة.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">4. إعلانات جوجل</h2>
                    <p>
                        بصفته طرفاً ثالثاً، يستخدم Google ملفات تعريف ارتباط لخدمة الإعلانات على موقعنا. استخدام Google لملف تعريف الارتباط DART يتيح له عرض الإعلانات للمستخدمين بناءً على زيارتهم لموقعنا والمواقع الأخرى على الإنترنت.
                    </p>
                </section>
            </div>
        </div>
    );
}
