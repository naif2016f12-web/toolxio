"use client";

import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-indigo-500/10">
                    <FileText className="w-8 h-8 text-indigo-500" />
                </div>
                <h1 className="text-4xl font-bold">شروط الاستخدام</h1>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6 text-muted-foreground leading-relaxed text-lg">
                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">1. قبول الشروط</h2>
                    <p>
                        باستخدامك لموقع Toolxio، فإنك توافق على الامتثال لهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى التوقف عن استخدام الموقع.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">2. الاستخدام المسموح به</h2>
                    <p>
                        يُسمح باستخدام أدوات الذكاء الاصطناعي المتوفرة لأغراض قانونية وأخلاقية فقط. يُحظر استخدام المنصة لتوليد محتوى مسيء أو ضار أو ينتهك حقوق الملكية الفكرية للآخرين.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">3. إخلاء المسؤولية</h2>
                    <p>
                        تُقدم الخدمة "كما هي" دون أي ضمانات. نحن غير مسؤولين عن أي أخطاء قد تحدث في المستندات المولدة أو الملفات المعالجة، ويتحمل المستخدم مسؤولية مراجعة النتائج.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-3">4. التعديلات</h2>
                    <p>
                        نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات فوراً على هذه الصفحة.
                    </p>
                </section>
            </div>
        </div>
    );
}
