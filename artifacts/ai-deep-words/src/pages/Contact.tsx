import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Building2, Globe2, Code2, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className={`py-20 ${className}`}>
      {children}
    </motion.section>
  );
}

const inquiryTypes = [
  { icon: Building2, label: "Enterprise Inquiry", desc: "Large-scale dataset programs for AI companies" },
  { icon: Globe2, label: "Government Inquiry", desc: "Public sector AI infrastructure programs" },
  { icon: Users, label: "Partnership Inquiry", desc: "Strategic partnerships and integrations" },
  { icon: Code2, label: "Developer Inquiry", desc: "API access, SDKs, and technical questions" },
];

export default function Contact() {
  const [selectedType, setSelectedType] = useState("Enterprise Inquiry");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Contact</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Start a Conversation</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tell us what you're building. We'll identify the right program and respond within one business day.
          </p>
        </motion.div>
      </section>

      <Section>
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={fadeUp} custom={0}>
                <h2 className="font-display text-xl font-semibold mb-6 text-white">Inquiry Type</h2>
                <div className="space-y-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.label}
                      onClick={() => setSelectedType(type.label)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                        selectedType === type.label
                          ? "bg-blue-600/15 border-blue-500/40 text-white"
                          : "glass-card border-white/8 text-slate-400 hover:border-white/15"
                      }`}
                    >
                      <type.icon className={`h-5 w-5 mt-0.5 shrink-0 ${selectedType === type.label ? "text-blue-400" : "text-slate-500"}`} />
                      <div>
                        <div className={`font-medium text-sm mb-1 ${selectedType === type.label ? "text-white" : "text-slate-300"}`}>{type.label}</div>
                        <div className="text-xs text-slate-500">{type.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="glass-card rounded-xl p-6 border border-white/8">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-white text-sm">Direct Email</span>
                </div>
                <a href="mailto:partner@aidpwords.com" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  partner@aidpwords.com
                </a>
                <p className="text-slate-500 text-xs mt-2">We respond within one business day.</p>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div variants={fadeUp} custom={1}>
                {submitted ? (
                  <div className="glass-card rounded-2xl p-12 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-7 w-7 text-emerald-400" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Message Received</h3>
                    <p className="text-slate-400">Thank you for reaching out. Our team will respond within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-white/8 space-y-6">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-6">{selectedType}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-widest mb-2">Organization</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                        placeholder="Company or institution"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 uppercase tracking-widest mb-2">What Are You Building?</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                        placeholder="Describe your project, the Arabic AI capability you need, estimated scale, and timeline..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
