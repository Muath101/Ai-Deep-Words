import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

function DeepWordsLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale = size === "sm" ? 0.8 : size === "lg" ? 1.3 : 1;
  const h = 32 * scale;
  const w = 160 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AI Deep Words"
    >
      {/* Waveform bars — matching the logo design */}
      <rect x="0"  y="14" width="5" height="8"  rx="2.5" fill="#7AABF7" />
      <rect x="8"  y="8"  width="5" height="16" rx="2.5" fill="#5F97F4" />
      <rect x="16" y="1"  width="5" height="30" rx="2.5" fill="#4B84F0" />
      <rect x="24" y="6"  width="5" height="20" rx="2.5" fill="#5F97F4" />
      <rect x="32" y="13" width="5" height="9"  rx="2.5" fill="#7AABF7" />

      {/* "Deep" — light weight */}
      <text
        x="46"
        y="23"
        fontFamily="'Space Grotesk', 'Inter', sans-serif"
        fontSize="18"
        fontWeight="400"
        fill="#F8FAFC"
        letterSpacing="-0.3"
      >
        Deep
      </text>

      {/* "Words" — bold weight */}
      <text
        x="93"
        y="23"
        fontFamily="'Space Grotesk', 'Inter', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="-0.3"
      >
        Words
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services",   href: "/services" },
    { label: "Datasets",   href: "/datasets" },
    { label: "Developers", href: "/developers" },
    { label: "Docs",       href: "/docs" },
    { label: "Company",    href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#050505]/92 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <DeepWordsLogo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                location === link.href ? "text-white" : "text-slate-400"
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
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>{lang}</span>
          </button>

          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
            style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-slate-300 p-1"
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
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <DeepWordsLogo size="md" />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    location === link.href ? "text-white" : "text-slate-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold"
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
