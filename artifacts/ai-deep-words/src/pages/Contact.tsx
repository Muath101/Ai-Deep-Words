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
  { icon: Building2, label: "Enterprise Inquiry",   desc: "Large-scale dataset programs for AI companies"  },
  { icon: Globe2,    label: "Government Inquiry",    desc: "Public sector AI infrastructure programs"       },
  { icon: Users,     label: "Partnership Inquiry",   desc: "Strategic partnerships and integrations"        },
  { icon: Code2,     label: "Developer Inquiry",     desc: "API access, SDKs, and technical questions"     },
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
      {/* ─── HERO — Light Blue ─── */}
      <section className="section-lightblue py-28 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">
            Contact
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Start a Conversation
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tell us what you're building. We'll identify the right program and respond within one business day.
          </p>
        </motion.div>
      </section>

      {/* ─── FORM — White ─── */}
      <Section className="section-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* LEFT — Inquiry type selector */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div variants={fadeUp} custom={0}>
                <h2 className="font-display text-base font-semibold text-slate-500 uppercase tracking-widest mb-4">Inquiry Type</h2>
                <div className="space-y-2">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.label}
                      onClick={() => setSelectedType(type.label)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                        selectedType === type.label
                          ? "bg-blue-600 border-blue-600 text-white shadow-md"
                          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <type.icon className={`h-5 w-5 mt-0.5 shrink-0 ${selectedType === type.label ? "text-blue-200" : "text-blue-500"}`} />
                      <div>
                        <div className={`font-semibold text-sm mb-0.5 ${selectedType === type.label ? "text-white" : "text-slate-800"}`}>
                          {type.label}
                        </div>
                        <div className={`text-xs ${selectedType === type.label ? "text-blue-100" : "text-slate-500"}`}>
                          {type.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Direct email */}
              <motion.div variants={fadeUp} custom={1}
                className="card-light rounded-xl p-5 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">Direct Email</span>
                </div>
                <a href="mailto:partner@aidpwords.com"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                  partner@aidpwords.com
                </a>
                <p className="text-slate-500 text-xs mt-1.5">We respond within one business day.</p>
              </motion.div>
            </div>

            {/* RIGHT — Form */}
            <div className="lg:col-span-3">
              <motion.div variants={fadeUp} custom={1}>
                {submitted ? (
                  <div className="card-light rounded-2xl p-12 border border-emerald-200 bg-emerald-50 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Message Received</h3>
                    <p className="text-slate-600">Thank you for reaching out. Our team will respond within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="card-light rounded-2xl p-8 space-y-5">
                    <div className="text-xs text-blue-600 font-semibold uppercase tracking-widest pb-2 border-b border-slate-100">
                      {selectedType}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Organization</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        placeholder="Company or institution"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">What Are You Building?</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                        placeholder="Describe your project, the Arabic AI capability you need, estimated scale, and timeline..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                    >
                      Send Message →
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
