import { Link } from "wouter";
import { Linkedin, Twitter, Github } from "lucide-react";

function DeepWordsLogo() {
  return (
    <svg width="140" height="28" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AI Deep Words">
      <rect x="0"  y="14" width="5" height="8"  rx="2.5" fill="#7AABF7" />
      <rect x="8"  y="8"  width="5" height="16" rx="2.5" fill="#5F97F4" />
      <rect x="16" y="1"  width="5" height="30" rx="2.5" fill="#4B84F0" />
      <rect x="24" y="6"  width="5" height="20" rx="2.5" fill="#5F97F4" />
      <rect x="32" y="13" width="5" height="9"  rx="2.5" fill="#7AABF7" />
      <text x="46" y="23" fontFamily="'Space Grotesk', 'Inter', sans-serif" fontSize="18" fontWeight="400" fill="#94A3B8" letterSpacing="-0.3">Deep</text>
      <text x="93" y="23" fontFamily="'Space Grotesk', 'Inter', sans-serif" fontSize="18" fontWeight="700" fill="#94A3B8" letterSpacing="-0.3">Words</text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <DeepWordsLogo />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              The infrastructure layer powering Arabic AI globally. Production-grade voice datasets and dialect-aware NLP pipelines.
            </p>
            <p className="mb-6">
              <a href="https://aidpwords.com" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                aidpwords.com
              </a>
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-700 hover:text-white transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="text-slate-700 hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="text-slate-700 hover:text-white transition-colors"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 text-xs uppercase tracking-widest">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/services"  className="text-slate-500 hover:text-white text-sm transition-colors">Voice Intelligence</Link></li>
              <li><Link href="/services"  className="text-slate-500 hover:text-white text-sm transition-colors">NLP Solutions</Link></li>
              <li><Link href="/datasets"  className="text-slate-500 hover:text-white text-sm transition-colors">Datasets</Link></li>
              <li><Link href="/services"  className="text-slate-500 hover:text-white text-sm transition-colors">Medical AI</Link></li>
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

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 text-sm">
            © {new Date().getFullYear()} AI Deep Words ·{" "}
            <a href="https://aidpwords.com" className="hover:text-slate-500 transition-colors">aidpwords.com</a>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-700 hover:text-slate-400 text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-700 hover:text-slate-400 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
