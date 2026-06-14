import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

function DeepWordsLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="36" height="30" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="0"  y="14" width="5" height="8"  rx="2.5" fill="#7AABF7" />
        <rect x="8"  y="8"  width="5" height="16" rx="2.5" fill="#5F97F4" />
        <rect x="16" y="1"  width="5" height="30" rx="2.5" fill="#4B84F0" />
        <rect x="24" y="6"  width="5" height="20" rx="2.5" fill="#5F97F4" />
        <rect x="32" y="13" width="5" height="9"  rx="2.5" fill="#7AABF7" />
      </svg>
      <span className={`font-display text-[18px] tracking-tight select-none ${dark ? "text-slate-900" : "text-white"}`}>
        Deep<span className="font-bold">Words</span>
      </span>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, dir, toggle, tr } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close drawer on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { label: tr("Services", "الخدمات"),     href: "/services"   },
    { label: tr("Datasets", "البيانات"),     href: "/datasets"   },
    { label: tr("Developers", "المطوّرون"),  href: "/developers" },
    { label: tr("Docs", "التوثيق"),          href: "/docs"       },
    { label: tr("Company", "الشركة"),        href: "/about"      },
  ];

  const isScrolled = scrolled;
  const isAr = lang === "ar";

  // Drawer is theme-aware: light panel when nav is over a white background, dark over the hero
  const dark = !isScrolled;
  const c = dark
    ? {
        panel: "#1e293b", border: "rgba(255,255,255,0.1)",
        closeColor: "#94a3b8", closeBg: "rgba(255,255,255,0.08)",
        linkColor: "#e2e8f0", linkActiveColor: "#60a5fa", linkActiveBg: "rgba(96,165,250,0.12)",
        divider: "rgba(255,255,255,0.1)", langColor: "#cbd5e1", langBg: "rgba(255,255,255,0.06)",
      }
    : {
        panel: "#ffffff", border: "rgba(15,23,42,0.08)",
        closeColor: "#64748b", closeBg: "rgba(15,23,42,0.05)",
        linkColor: "#334155", linkActiveColor: "#2563eb", linkActiveBg: "rgba(37,99,235,0.08)",
        divider: "rgba(15,23,42,0.08)", langColor: "#475569", langBg: "rgba(15,23,42,0.04)",
      };

  const mobileDrawer = (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.45)" }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            dir={dir}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: "12px", left: "12px", right: "12px", zIndex: 9999,
              backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)", display: "flex", flexDirection: "column",
              padding: "20px", maxWidth: "420px",
              marginLeft: isAr ? "0" : "auto", marginRight: isAr ? "auto" : "0",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <DeepWordsLogo dark={!dark} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label={tr("Close menu", "إغلاق القائمة")}
                style={{ color: c.closeColor, padding: "8px", borderRadius: "10px", background: c.closeBg }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "13px 14px", borderRadius: "12px", fontWeight: 500, fontSize: "15px",
                      transition: "all 0.15s", color: active ? c.linkActiveColor : c.linkColor,
                      background: active ? c.linkActiveBg : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}
                  >
                    {link.label}
                    {active && <ArrowRight className="h-4 w-4 dir-flip" />}
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${c.divider}` }}>
              <button
                onClick={toggle}
                style={{
                  display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px",
                  color: c.langColor, background: c.langBg, borderRadius: "12px", fontSize: "14px",
                  fontWeight: 600, width: "100%",
                }}
              >
                <Globe className="h-4 w-4" />
                <span>{isAr ? "English" : "العربية"}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        dir={dir}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
            : "bg-[#0F172A]/85 backdrop-blur-sm border-b border-white/8 py-4"
        }`}
      >
        <div className="container mx-auto px-5 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <DeepWordsLogo dark={isScrolled} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  location === link.href
                    ? isScrolled ? "text-blue-600" : "text-white"
                    : isScrolled ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={toggle}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? "text-slate-500" : "text-slate-300"}`}
              aria-label={tr("Switch to Arabic", "التبديل إلى الإنجليزية")}
            >
              <Globe className="h-4 w-4" />
              <span>{isAr ? "EN" : "ع"}</span>
            </button>

            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
              style={{ boxShadow: "0 0 18px rgba(37,99,235,0.3)" }}
            >
              {tr("Start a Project", "ابدأ مشروعك")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg border transition-all ${
              isScrolled
                ? "text-slate-700 bg-white border-slate-200 shadow-sm hover:bg-slate-50"
                : "text-white bg-white/20 border-white/30 hover:bg-white/30"
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label={tr("Open menu", "فتح القائمة")}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {createPortal(mobileDrawer, document.body)}
    </>
  );
}
