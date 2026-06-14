import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { tr } = useLang();
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center max-w-lg">
        <div className="flex items-end justify-center gap-[4px] h-16 mb-10 opacity-40">
          {[14, 22, 30, 22, 14].map((h, i) => (
            <div key={i} className="w-[6px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-300" style={{ height: `${h * 1.5}px` }} />
          ))}
        </div>

        <div className="mb-4">
          <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs uppercase tracking-widest font-medium">
            {tr("404 — Page Not Found", "404 — الصفحة غير موجودة")}
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">{tr("Lost in the Data", "تهت في البيانات")}</h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          {tr("This page doesn't exist in our dataset. Let's get you back to the Arabic AI infrastructure you were looking for.",
              "هذه الصفحة غير موجودة في بياناتنا. لنُعِدك إلى البنية التحتية للذكاء الاصطناعي العربي التي تبحث عنها.")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all active:scale-95">
            <Home className="h-4 w-4" /> {tr("Back to Home", "العودة للرئيسية")}
          </Link>
          <Link href="/contact" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 border border-white/14 text-white rounded-xl font-semibold transition-all active:scale-95">
            {tr("Contact Us", "تواصل معنا")} <ArrowRight className="h-4 w-4 dir-flip" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
