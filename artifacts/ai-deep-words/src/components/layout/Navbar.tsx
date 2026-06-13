import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import logoUrl from "@assets/high-level-description-a-flat-vector-log_3wU3teLeXXO-g3zBEQ-n9_1781389308136.jpg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Datasets", href: "/datasets" },
    { label: "Developers", href: "/developers" },
    { label: "Docs", href: "/docs" },
    { label: "Company", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-[#050505]/80 backdrop-blur-md border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src={logoUrl} 
            alt="AI Deep Words Logo" 
            className="h-8 w-auto rounded-md object-cover overflow-hidden" 
          />
          <span className="font-display font-semibold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
            AI Deep Words
          </span>
        </Link>

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

        <div className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Globe className="h-4 w-4" />
            <span>EN</span>
          </button>
          
          <Link 
            href="/contact"
            className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all glow-blue"
          >
            Start a Project
          </Link>
        </div>

        <button 
          className="md:hidden text-slate-300"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <img src={logoUrl} alt="Logo" className="h-8 rounded-md" />
                <span className="font-display font-semibold text-lg">AI Deep Words</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
