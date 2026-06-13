import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Mic, Brain, Code2, ChevronRight, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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

const roles = [
  {
    icon: Globe2,
    title: "Senior Arabic Linguist",
    type: "Full-time",
    location: "Remote (Arab World)",
    dept: "Linguistics",
    color: "blue",
    desc: "Lead annotation quality for dialect-specific programs. Requires native fluency in Gulf, Levantine, or Egyptian Arabic.",
  },
  {
    icon: Mic,
    title: "Speech Data Engineer",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    color: "purple",
    desc: "Build and optimize audio processing pipelines — VAD, diarization, forced alignment, and QA tooling for Arabic speech datasets.",
  },
  {
    icon: Brain,
    title: "NLP Annotation Specialist",
    type: "Full-time",
    location: "Remote (Arab World)",
    dept: "Operations",
    color: "emerald",
    desc: "Execute NER, POS, and semantic annotation for enterprise Arabic NLP programs under linguistic specialist guidance.",
  },
  {
    icon: Code2,
    title: "ML Infrastructure Engineer",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    color: "cyan",
    desc: "Own the infrastructure that powers dataset delivery — API scalability, CDN optimization, and secure enterprise delivery pipelines.",
  },
  {
    icon: Globe2,
    title: "Dialect Research Lead",
    type: "Full-time",
    location: "Remote (MENA)",
    dept: "Research",
    color: "purple",
    desc: "Drive research into underrepresented Arabic dialects. Define coverage standards and build annotation taxonomies for new dialect programs.",
  },
  {
    icon: Brain,
    title: "Medical Arabic Annotator",
    type: "Contract",
    location: "Remote",
    dept: "Operations",
    color: "emerald",
    desc: "Annotate clinical Arabic text for medical entity recognition and ICD coding. Medical or healthcare background required.",
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "from-purple-500/10 border-purple-500/20 text-purple-400",
  emerald: "from-emerald-500/10 border-emerald-500/20 text-emerald-400",
  cyan: "from-cyan-500/10 border-cyan-500/20 text-cyan-400",
};

const values = [
  { label: "Fully Remote", desc: "Work from anywhere in the world. We are globally distributed." },
  { label: "Arabic-First Culture", desc: "Every decision we make starts with Arabic. Not an afterthought." },
  { label: "Mission-Driven", desc: "Your work directly closes the Arabic AI gap at global scale." },
  { label: "Elite Standards", desc: "We hire slow and expect excellence. The bar is high — and worth it." },
];

export default function Careers() {
  return (
    <div>
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Careers</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Build the Future of<br />Arabic AI With Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We are assembling the world's best team in Arabic linguistic AI. If you're exceptional at what you do and care deeply about Arabic, this is where you belong.
          </p>
        </motion.div>
      </section>

      <Section>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {values.map((v, i) => (
              <motion.div key={v.label} variants={fadeUp} custom={i} className="glass-card rounded-xl p-6 border border-white/8">
                <h4 className="font-semibold text-white mb-2">{v.label}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Open Roles</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                variants={fadeUp}
                custom={i * 0.2}
                whileHover={{ y: -2 }}
                className={`glass-card rounded-2xl p-6 border bg-gradient-to-br ${colorMap[role.color].split(" ").slice(0, 2).join(" ")} hover:border-white/15 transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <role.icon className={`h-6 w-6 ${colorMap[role.color].split(" ")[2]}`} />
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    role.type === "Contract" ? "bg-amber-500/10 border border-amber-500/20 text-amber-300" : "bg-white/5 border border-white/10 text-slate-400"
                  }`}>
                    {role.type}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{role.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{role.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-5">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{role.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{role.dept}</span>
                </div>
                <Link href="/contact" className={`flex items-center gap-2 text-sm font-medium transition-colors ${colorMap[role.color].split(" ")[2]} hover:opacity-80`}>
                  Apply Now <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-transparent via-[#0B0F14]/40 to-transparent">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0B0F14] to-purple-600/10 p-16 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Don't see your role?</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              We're always looking for exceptional Arabic linguists, speech engineers, and AI infrastructure specialists. Send us your background and we'll reach out when the right opportunity opens.
            </p>
            <a href="mailto:partner@aidpwords.com" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue">
              Send Your Resume <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
