import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mic, Brain, Heart, Globe2, Zap, CheckCircle2, ArrowRight } from "lucide-react";
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

const services = [
  {
    icon: Mic,
    color: "blue",
    title: "Voice Intelligence",
    subtitle: "Production-grade Arabic speech datasets",
    desc: "The most comprehensive Arabic speech dataset program available commercially. We capture, validate, and deliver speaker-diverse audio across every dialect, accent, and recording environment your models need to achieve real-world performance.",
    steps: [
      "Remote and studio recording across 22+ countries",
      "Age, gender, and dialect-stratified speaker diversity",
      "Multi-microphone capture with controlled SNR environments",
      "Diarization, segmentation, and transcript alignment",
      "Expert phonetic validation and quality grading",
      "FLAC/WAV/MP3 delivery with rich metadata schemas",
    ],
    benefits: ["4,000+ hours available immediately", "Custom recording programs in 4-8 weeks", "HIPAA-compliant data handling"],
    accent: "from-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
  },
  {
    icon: Brain,
    color: "purple",
    title: "NLP Solutions",
    subtitle: "Arabic annotation at enterprise scale",
    desc: "End-to-end Arabic NLP annotation pipelines built for enterprise language model development. From raw text to richly annotated training corpora — executed by native Arabic linguists with specialized domain expertise.",
    steps: [
      "POS tagging and morphological analysis",
      "Named entity recognition (persons, organizations, locations, dates)",
      "Sentiment and emotion annotation",
      "Semantic role labeling and coreference resolution",
      "Intent and entity extraction for conversational AI",
      "Custom taxonomy development for domain-specific NLP",
    ],
    benefits: ["50M+ token capacity per program", "Dialect-stratified annotation available", "Multi-pass inter-annotator agreement validation"],
    accent: "from-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    glowColor: "bg-purple-500/10",
  },
  {
    icon: Heart,
    color: "emerald",
    title: "Medical AI Infrastructure",
    subtitle: "HIPAA-compliant clinical Arabic datasets",
    desc: "Medical Arabic AI is one of the most demanding and underserved niches in language AI. We deliver clinical-grade linguistic assets for radiology reporting, clinical NLP, patient interaction, and healthcare documentation systems.",
    steps: [
      "Clinical term extraction and ICD coding",
      "Medical Arabic vocabulary normalization",
      "Radiology report annotation and templating",
      "Medication, dosage, and procedure labeling",
      "Patient consent and communication corpus development",
      "HIPAA-compliant data handling and secure delivery",
    ],
    benefits: ["500K+ medical terms annotated", "Physician-validated annotation standards", "All delivery under HIPAA and GDPR"],
    accent: "from-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
  },
  {
    icon: Globe2,
    color: "cyan",
    title: "Dialect Annotation",
    subtitle: "32+ dialect-specific annotation programs",
    desc: "Arabic dialect diversity is the core challenge for any Arabic AI system. We provide granular, linguist-led annotation covering the full spectrum of dialectal Arabic — from hyperlocal regional varieties to standardized MSA.",
    steps: [
      "Dialect identification and classification labeling",
      "Code-switching detection and annotation",
      "Dialect-specific lexicon development",
      "Cross-dialect semantic equivalence mapping",
      "Regional phonetic transcription",
      "Native speaker validation for every dialect variety",
    ],
    benefits: ["Najdi, Hijazi, Gulf, Egyptian, Levantine, Moroccan, and more", "Sub-regional dialect annotation available", "Native-speaker-validated annotation"],
    accent: "from-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
    glowColor: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    color: "blue",
    title: "Speech Data Pipelines",
    subtitle: "Scalable automated + human annotation",
    desc: "For programs requiring millions of utterances, we combine automated preprocessing with expert human review layers — delivering speed at scale without sacrificing annotation quality.",
    steps: [
      "Automated segmentation and VAD processing",
      "Forced alignment with transcript verification",
      "Human-in-the-loop quality sampling at configurable rates",
      "Streaming delivery through REST API or cloud storage",
      "Real-time annotation dashboard and progress reporting",
      "Iterative model feedback loops integrated into pipeline",
    ],
    benefits: ["1M+ utterance programs supported", "Configurable human QA sampling rates", "Sub-2-week turnaround for standard programs"],
    accent: "from-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
  },
];

export default function Services() {
  return (
    <div>
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Services</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Arabic AI Infrastructure</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Five enterprise-grade capabilities designed to give AI teams the Arabic language infrastructure they need to ship real products.
          </p>
        </motion.div>
      </section>

      {services.map((service, si) => (
        <Section key={service.title} className={si % 2 === 1 ? "bg-gradient-to-b from-transparent via-[#0B0F14]/40 to-transparent" : ""}>
          <div className="container mx-auto px-6 md:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${si % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <motion.div variants={fadeUp} custom={0}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-gradient-to-r ${service.accent} mb-6`}>
                  <service.icon className={`h-4 w-4 ${service.iconColor}`} />
                  <span className={`text-xs font-medium ${service.iconColor}`}>{service.subtitle}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-8">{service.desc}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {service.benefits.map((b) => (
                    <span key={b} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                      {b}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  service.color === "blue" ? "bg-blue-600 hover:bg-blue-500 text-white" :
                  service.color === "purple" ? "bg-purple-600 hover:bg-purple-500 text-white" :
                  service.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-500 text-white" :
                  "bg-cyan-600 hover:bg-cyan-500 text-white"
                }`}>
                  Start a {service.title} Program <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className={`glass-card rounded-2xl p-8 border bg-gradient-to-br ${service.accent}`}>
                <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Pipeline Process</h3>
                <ol className="space-y-4">
                  {service.steps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${service.iconColor} bg-white/5 border border-white/10`}>
                        {i + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0B0F14] to-purple-600/10 p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to build Arabic AI?</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">Tell us what you're building and we'll scope the right program for your team.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue">
              Start a Project <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
