import { Link } from "wouter";
import { Linkedin, Twitter, Github } from "lucide-react";

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
  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <FooterLogo />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              The infrastructure layer powering Arabic AI globally. Production-grade voice datasets and dialect-aware NLP pipelines.
            </p>
            <a href="https://aidpwords.com" className="text-slate-600 hover:text-slate-400 text-xs transition-colors block mb-6">
              aidpwords.com
            </a>
            <div className="flex gap-4">
              <a href="#" className="text-slate-700 hover:text-blue-400 transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="text-slate-700 hover:text-blue-400 transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="text-slate-700 hover:text-blue-400 transition-colors"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-xs uppercase tracking-widest">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-slate-500 hover:text-white text-sm transition-colors">Voice Intelligence</Link></li>
              <li><Link href="/services" className="text-slate-500 hover:text-white text-sm transition-colors">NLP Solutions</Link></li>
              <li><Link href="/datasets" className="text-slate-500 hover:text-white text-sm transition-colors">Datasets</Link></li>
              <li><Link href="/services" className="text-slate-500 hover:text-white text-sm transition-colors">Medical AI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-xs uppercase tracking-widest">Developers</h4>
            <ul className="space-y-4">
              <li><Link href="/developers" className="text-slate-500 hover:text-white text-sm transition-colors">Documentation</Link></li>
              <li><Link href="/docs"       className="text-slate-500 hover:text-white text-sm transition-colors">API Reference</Link></li>
              <li><Link href="/docs"       className="text-slate-500 hover:text-white text-sm transition-colors">SDKs</Link></li>
              <li><Link href="/developers" className="text-slate-500 hover:text-white text-sm transition-colors">Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about"   className="text-slate-500 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-slate-500 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><a href="mailto:partner@aidpwords.com" className="text-slate-500 hover:text-white text-sm transition-colors">partner@aidpwords.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AI Deep Words ·{" "}
            <a href="https://aidpwords.com" className="hover:text-slate-400 transition-colors">aidpwords.com</a>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
