import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

function DeepWordsLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services",   href: "/services"   },
    { label: "Datasets",   href: "/datasets"   },
    { label: "Developers", href: "/developers" },
    { label: "Docs",       href: "/docs"       },
    { label: "Company",    href: "/about"      },
  ];

  /* ── transparent over hero (dark) → white when scrolled into light sections ── */
  const isScrolled = scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/97 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-[#0F172A]/85 backdrop-blur-sm border-b border-white/8 py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <DeepWordsLogo dark={isScrolled} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location === link.href
                  ? isScrolled ? "text-blue-600" : "text-white"
                  : isScrolled ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
            className={`flex items-center gap-1.5 text-sm transition-colors hover:text-blue-600 ${isScrolled ? "text-slate-500" : "text-slate-400"}`}
          >
            <Globe className="h-4 w-4" />
            <span>{lang}</span>
          </button>

          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            style={{ boxShadow: "0 0 18px rgba(37,99,235,0.3)" }}
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className={`md:hidden p-1 transition-colors ${isScrolled ? "text-slate-700" : "text-white"}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <DeepWordsLogo dark />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500 p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-colors ${location === link.href ? "text-blue-600" : "text-slate-600"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
