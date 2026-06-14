import { Link } from "wouter";
import { Linkedin, Twitter, Github } from "lucide-react";
import { useLang } from "@/lib/i18n";

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="32" viewBox="0 0 38 32" fill="none" aria-hidden="true">
        <rect x="0"  y="14" width="5" height="8"  rx="2.5" fill="#7AABF7" />
        <rect x="8"  y="8"  width="5" height="16" rx="2.5" fill="#5F97F4" />
        <rect x="16" y="1"  width="5" height="30" rx="2.5" fill="#4B84F0" />
        <rect x="24" y="6"  width="5" height="20" rx="2.5" fill="#5F97F4" />
        <rect x="32" y="13" width="5" height="9"  rx="2.5" fill="#7AABF7" />
      </svg>
      <span className="font-display text-[17px] tracking-tight text-slate-400 select-none">
        Deep<span className="font-bold text-slate-300">Words</span>
      </span>
    </div>
  );
}

export default function Footer() {
  const { tr } = useLang();

  const columns = [
    {
      title: tr("Products", "المنتجات"),
      links: [
        { label: tr("Voice Intelligence", "الذكاء الصوتي"), href: "/services" },
        { label: tr("NLP Solutions", "حلول معالجة اللغة"),  href: "/services" },
        { label: tr("Datasets", "البيانات"),                href: "/datasets" },
        { label: tr("Medical AI", "الذكاء الطبي"),          href: "/services" },
      ],
    },
    {
      title: tr("Developers", "المطوّرون"),
      links: [
        { label: tr("Documentation", "التوثيق"),    href: "/developers" },
        { label: tr("API Reference", "مرجع الـ API"), href: "/docs" },
        { label: tr("SDKs", "حِزم التطوير"),         href: "/docs" },
        { label: tr("Status", "الحالة"),             href: "/developers" },
      ],
    },
    {
      title: tr("Company", "الشركة"),
      links: [
        { label: tr("About Us", "من نحن"),  href: "/about" },
        { label: tr("Careers", "الوظائف"),  href: "/careers" },
        { label: tr("Contact", "تواصل معنا"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] pt-14 md:pt-20 pb-10">
      <div className="container mx-auto px-5 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <FooterLogo />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-xs">
              {tr("The infrastructure layer powering Arabic AI globally. Production-grade voice datasets and dialect-aware NLP pipelines.",
                  "طبقة البنية التحتية التي تُشغّل الذكاء الاصطناعي العربي عالمياً. بيانات صوتية بجودة إنتاجية وخطوط معالجة لغوية واعية باللهجات.")}
            </p>
            <a href="https://aidpwords.com" className="text-slate-600 hover:text-slate-400 text-xs transition-colors block mb-5">
              aidpwords.com
            </a>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-slate-700 hover:text-blue-400 transition-colors p-1"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-700 hover:text-blue-400 transition-colors p-1"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="GitHub" className="text-slate-700 hover:text-blue-400 transition-colors p-1"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-medium mb-5 md:mb-6 text-xs uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-3.5 md:space-y-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
                {col.title === tr("Company", "الشركة") && (
                  <li>
                    <a href="mailto:partner@aidpwords.com" className="text-slate-500 hover:text-white text-sm transition-colors">partner@aidpwords.com</a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm text-center md:text-start">
            © {new Date().getFullYear()} AI Deep Words ·{" "}
            <a href="https://aidpwords.com" className="hover:text-slate-400 transition-colors">aidpwords.com</a>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">{tr("Privacy Policy", "سياسة الخصوصية")}</Link>
            <Link href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">{tr("Terms of Service", "شروط الخدمة")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
