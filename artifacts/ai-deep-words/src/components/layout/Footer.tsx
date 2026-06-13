import { Link } from "wouter";
import { Github, Twitter, Linkedin } from "lucide-react";
import logoUrl from "@assets/high-level-description-a-flat-vector-log_3wU3teLeXXO-g3zBEQ-n9_1781389308136.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src={logoUrl} alt="Logo" className="h-8 rounded-md" />
              <span className="font-display font-semibold text-lg">AI Deep Words</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The infrastructure layer powering Arabic AI globally. Production-grade voice datasets and dialect-aware NLP pipelines.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-slate-400 hover:text-white text-sm">Voice Intelligence</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white text-sm">NLP Solutions</Link></li>
              <li><Link href="/datasets" className="text-slate-400 hover:text-white text-sm">Datasets</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white text-sm">Medical AI</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Developers</h4>
            <ul className="space-y-4">
              <li><Link href="/developers" className="text-slate-400 hover:text-white text-sm">Documentation</Link></li>
              <li><Link href="/docs" className="text-slate-400 hover:text-white text-sm">API Reference</Link></li>
              <li><Link href="/docs" className="text-slate-400 hover:text-white text-sm">SDKs</Link></li>
              <li><Link href="/developers" className="text-slate-400 hover:text-white text-sm">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-white text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white text-sm">Contact</Link></li>
              <li><a href="mailto:partner@aidpwords.com" className="text-slate-400 hover:text-white text-sm">partner@aidpwords.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AI Deep Words. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
