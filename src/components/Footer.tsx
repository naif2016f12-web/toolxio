import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-border pt-10 pb-10 text-center">
            <div className="flex justify-center gap-6 mb-6 text-sm text-muted-foreground font-medium">
                <Link href="/privacy" className="hover:text-accent transition-colors">سياسة الخصوصية</Link>
                <Link href="/terms" className="hover:text-accent transition-colors">شروط الاستخدام</Link>
                <Link href="/contact" className="hover:text-accent transition-colors">اتصل بنا</Link>
            </div>
            <p className="text-muted-foreground/60 text-xs">
                © 2026 Toolxio - جميع الحقوق محفوظة. منصة مدعومة بالذكاء الاصطناعي.
            </p>
        </footer>
    );
}
