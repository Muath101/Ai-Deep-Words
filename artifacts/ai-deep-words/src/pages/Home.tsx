import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Mic, Brain, Heart, Globe2, Zap, Shield, CheckCircle2,
  ArrowRight, Play, Pause, ChevronRight, Database, Lock, Users, Award
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedWaveform() {
  const bars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="flex items-center justify-center gap-[3px] h-24 opacity-50">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-300"
          animate={{
            height: [
              `${Math.random() * 40 + 10}%`,
              `${Math.random() * 80 + 20}%`,
              `${Math.random() * 40 + 10}%`,
            ],
          }}
          transition={{
            duration: 1.2 + Math.random() * 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.03,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const metrics = [
  { value: "22+",    label: "Arab Countries" },
  { value: "32+",    label: "Arabic Dialects" },
  { value: "4,000+", label: "Hours Voice Data" },
  { value: "15M+",   label: "Words Dataset" },
  { value: "97.4%",  label: "Accuracy Rate" },
];

const trustBadges = [
  { icon: Shield, label: "HIPAA Compliant",        color: "blue"    },
  { icon: Lock,   label: "GDPR Ready",             color: "emerald" },
  { icon: Award,  label: "Secure Infrastructure",  color: "purple"  },
  { icon: Users,  label: "Human-in-the-Loop QA",   color: "cyan"    },
];

const clients = [
  { name: "Google",    sub: "AI & Cloud"     },
  { name: "Microsoft", sub: "Azure AI"       },
  { name: "Amazon",    sub: "AWS & Alexa"    },
  { name: "Meta",      sub: "AI Research"    },
  { name: "Apple",     sub: "Siri & ML"      },
  { name: "Anthropic", sub: "Claude AI"      },
  { name: "OpenAI",    sub: "GPT Models"     },
  { name: "Huawei",    sub: "AI Labs"        },
  { name: "Accenture", sub: "AI Practice"    },
  { name: "IBM",       sub: "Watson AI"      },
];

const pipelineSteps = [
  { label: "Collect",           desc: "Native speaker recording across 32+ dialects" },
  { label: "Validate",          desc: "Multi-pass audio quality assurance" },
  { label: "Annotate",          desc: "Expert linguistic annotation pipelines" },
  { label: "Multi-Layer QA",    desc: "Dialect-aware validation workflows" },
  { label: "Secure Processing", desc: "Encrypted, compliant infrastructure" },
  { label: "Enterprise Delivery", desc: "API, HuggingFace, cloud delivery" },
];

const services = [
  { icon: Mic,    title: "Voice Intelligence",        desc: "Production-grade Arabic speech datasets across 32+ dialects with native-speaker validation and professional recording environments.", color: "blue"    },
  { icon: Brain,  title: "NLP Solutions",             desc: "Enterprise Arabic NLP annotation pipelines with POS tagging, named entity recognition, sentiment analysis, and semantic labeling.",  color: "violet"  },
  { icon: Heart,  title: "Medical AI Infrastructure", desc: "HIPAA-compliant medical Arabic linguistic assets for clinical NLP, radiology reporting, and healthcare AI systems.",                 color: "emerald" },
  { icon: Globe2, title: "Dialect Annotation",        desc: "Granular dialect-aware annotation covering Najdi, Hijazi, Gulf, Egyptian, Levantine, Moroccan, and MSA variants.",                 color: "cyan"    },
  { icon: Zap,    title: "Speech Data Pipelines",     desc: "Scalable automated and human-in-the-loop speech processing pipelines delivering enterprise-grade audio intelligence.",              color: "blue"    },
];

const dialects = ["Saudi Najdi", "Saudi Hijazi", "Gulf", "Egyptian", "Levantine", "MSA"];
const tones    = ["Professional", "Customer Support", "Sales", "Calm Narration"];

function InteractivePlayground() {
  const [dialect, setDialect] = useState(dialects[0]);
  const [tone, setTone]       = useState(tones[0]);
  const [text, setText]       = useState("مرحباً، كيف يمكنني مساعدتك اليوم؟");
  const [playing, setPlaying] = useState(false);
  const [bars, setBars]       = useState<number[]>(Array(20).fill(3));
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const playDemo = () => {
    if (playing) {
      audioCtxRef.current?.close();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      setBars(Array(20).fill(3));
      return;
    }
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const baseFreq = tone === "Professional" ? 180 : tone === "Customer Support" ? 220 : tone === "Sales" ? 250 : 160;
    const playTone = (freq: number, start: number, dur: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(vol * 0.3, ctx.currentTime + start + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    };
    [0, 0.3, 0.5, 0.9, 1.2, 1.6, 1.9, 2.3, 2.7, 3.1].forEach((t, i) =>
      playTone(baseFreq + (i % 3 === 0 ? 40 : i % 3 === 1 ? 20 : 0), t, 0.25, 0.8)
    );
    setPlaying(true);
    intervalRef.current = window.setInterval(() =>
      setBars(Array(20).fill(0).map(() => Math.floor(Math.random() * 90) + 5)), 80);
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false); setBars(Array(20).fill(3));
    }, 3500);
  };

  return (
    <div className="card-dark rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">Sample Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 text-right font-arabic resize-none h-28 focus:outline-none focus:border-blue-400/60 transition-colors"
              dir="rtl"
              placeholder="اكتب النص هنا..."
            />
          </div>
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">Select Dialect</label>
            <div className="flex flex-wrap gap-2">
              {dialects.map((d) => (
                <button key={d} onClick={() => setDialect(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    dialect === d ? "bg-blue-500/25 border-blue-400/60 text-blue-200" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">Voice Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button key={t} onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    tone === t ? "bg-cyan-500/25 border-cyan-400/60 text-cyan-200" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-full bg-white/5 rounded-xl p-6 border border-white/8">
            <div className="flex items-end justify-center gap-1 h-20">
              {bars.map((h, i) => (
                <motion.div key={i} animate={{ height: `${h}%` }} transition={{ duration: 0.08, ease: "linear" }}
                  className={`w-[4px] rounded-full ${playing ? "bg-gradient-to-t from-blue-500 to-cyan-300" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest">{dialect} · {tone}</p>
            <button onClick={playDemo}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all glow-blue ${
                playing ? "bg-blue-500/20 border border-blue-400/50 text-blue-300" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {playing ? "Stop Playback" : "Play Voice Sample"}
            </button>
            <p className="text-xs text-slate-500 mt-3">Demo synthesis · No login required</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const differentiators = [
  { icon: Globe2,       label: "32+ Dialects",              desc: "The most comprehensive Arabic dialect coverage available commercially." },
  { icon: Users,        label: "Native Speaker Network",     desc: "10,000+ native speakers across every Arab country and dialect." },
  { icon: Shield,       label: "Enterprise Compliance",      desc: "HIPAA, GDPR, and custom compliance frameworks for regulated industries." },
  { icon: Heart,        label: "Medical-Grade Assets",       desc: "Clinical and healthcare Arabic AI datasets built to the highest accuracy standards." },
  { icon: CheckCircle2, label: "Human-in-the-Loop QA",       desc: "Every dataset validated by native-speaker experts, not just automated checks." },
  { icon: Zap,          label: "Scalable Delivery",          desc: "From 10-hour pilots to enterprise programs at millions of utterances." },
  { icon: Database,     label: "Arabic-First Infrastructure", desc: "Built exclusively for Arabic from the ground up — not adapted from English." },
];

const integrations = [
  { name: "REST APIs",      color: "blue"   },
  { name: "HuggingFace",   color: "yellow" },
  { name: "AWS SageMaker", color: "orange" },
  { name: "Azure ML",      color: "blue"   },
  { name: "Whisper",       color: "green"  },
  { name: "Kaldi",         color: "purple" },
  { name: "ESPnet",        color: "cyan"   },
  { name: "Coqui TTS",     color: "pink"   },
];

const intColorMap: Record<string, string> = {
  blue:   "bg-blue-50   border-blue-200   hover:border-blue-400   text-blue-700",
  yellow: "bg-yellow-50 border-yellow-200 hover:border-yellow-400 text-yellow-700",
  orange: "bg-orange-50 border-orange-200 hover:border-orange-400 text-orange-700",
  green:  "bg-green-50  border-green-200  hover:border-green-400  text-green-700",
  purple: "bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-700",
  cyan:   "bg-cyan-50   border-cyan-200   hover:border-cyan-400   text-cyan-700",
  pink:   "bg-pink-50   border-pink-200   hover:border-pink-400   text-pink-700",
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"}
      className={`py-24 md:py-32 ${className}`}>
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="relative">

      {/* ───────────────── HERO — Navy dark ───────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0F172A]">
        {/* Ambient glows */}
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[280px] bg-violet-600/8 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[280px] bg-cyan-600/8 rounded-full blur-[100px]" />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-xl mb-8">
          <AnimatedWaveform />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="relative z-10 mb-5">
          <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs uppercase tracking-widest font-medium">
            Arabic AI Infrastructure
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="relative z-10 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mb-6 text-white">
          Building the Linguistic{" "}
          <span className="text-gradient-light">Infrastructure</span>{" "}
          for Global AI
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="relative z-10 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Production-grade Arabic voice, NLP, and medical datasets powering the next generation
          of speech and language AI across 22+ countries and 32+ dialects.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="relative z-10 flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/contact" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue flex items-center gap-2">
            Start a Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/services" className="px-8 py-3.5 bg-white/6 hover:bg-white/12 border border-white/12 text-white rounded-xl font-semibold transition-all">
            Explore Services
          </Link>
          <button className="px-8 py-3.5 bg-white/4 hover:bg-white/8 border border-white/8 text-slate-300 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Play className="h-4 w-4 text-cyan-400" /> Listen to Voice Samples
          </button>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 max-w-4xl w-full">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── TRUST STRIP — White ───────────────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Enterprise Trust & Compliance</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((b, i) => (
              <motion.div key={b.label} variants={fadeUp} custom={i}
                className="card-light rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-xl ${
                  b.color === "blue"    ? "bg-blue-50"    :
                  b.color === "emerald" ? "bg-emerald-50" :
                  b.color === "purple"  ? "bg-violet-50"  : "bg-cyan-50"}`}>
                  <b.icon className={`h-6 w-6 ${
                    b.color === "blue"    ? "text-blue-600"    :
                    b.color === "emerald" ? "text-emerald-600" :
                    b.color === "purple"  ? "text-violet-600"  : "text-cyan-600"}`} />
                </div>
                <span className="text-sm font-semibold text-slate-800">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────── OUR CLIENTS — Off-white ───────────────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Trusted By Global Technology Leaders</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3">Our Clients</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Global technology leaders and healthcare institutions rely on our Arabic linguistic and data operations.
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="flex gap-5 w-max"
            >
              {[...clients, ...clients].map((c, i) => (
                <div key={i}
                  className="card-light rounded-xl px-8 py-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center min-w-[140px] group cursor-default">
                  <span className="font-display text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{c.name}</span>
                  <span className="text-xs text-slate-400 mt-1">{c.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={1} className="text-center mt-8">
            <p className="text-slate-400 text-xs">Enterprise partnerships · NDAs available · aidpwords.com</p>
          </motion.div>
        </div>
      </Section>

      {/* ───────────────── ARABIC AI GAP — Light Blue ───────────────── */}
      <Section className="section-lightblue border-b border-blue-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">The Challenge</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">The Arabic AI Gap</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Arabic is one of the world's most spoken languages — yet critically underrepresented in AI training infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} custom={1}
              className="card-light rounded-2xl p-8 border-red-100">
              <h3 className="font-display text-xl font-semibold text-red-600 mb-6">The Problem</h3>
              <ul className="space-y-4">
                {["Arabic dialect fragmentation across 22+ countries",
                  "No production-grade dialect-specific datasets",
                  "Weak medical and legal Arabic AI coverage",
                  "Poor cross-dialect speech recognition accuracy",
                  "Missing enterprise-grade annotation standards",
                ].map((p) => (
                  <li key={p} className="flex gap-3 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}
              className="card-light rounded-2xl p-8 border-emerald-100">
              <h3 className="font-display text-xl font-semibold text-emerald-700 mb-6">The AI Deep Words Solution</h3>
              <ul className="space-y-4">
                {["Native speaker pipelines across every Arab country",
                  "Dialect-aware QA and validation workflows",
                  "Secure, compliant enterprise delivery infrastructure",
                  "Large-scale annotation at millions of utterances",
                  "Medical-grade and legal-grade Arabic AI assets",
                ].map((s) => (
                  <li key={s} className="flex gap-3 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ───────────────── DATA PIPELINE — White ───────────────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Infrastructure</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">Data Pipeline</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From raw speech to enterprise-ready datasets — a six-stage production pipeline.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {pipelineSteps.map((step, i) => (
                <motion.div key={step.label} variants={fadeUp} custom={i * 0.5} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-display font-bold text-lg mb-6 shadow-lg shadow-blue-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">{step.label}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────────── SERVICES — Off-white ───────────────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Services</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">Enterprise Infrastructure Pillars</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Five core capabilities powering Arabic AI at enterprise scale.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i * 0.5}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group card-light rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all cursor-default">
                <div className={`p-3 rounded-xl inline-flex mb-6 ${
                  s.color === "blue"    ? "bg-blue-50"    :
                  s.color === "violet"  ? "bg-violet-50"  :
                  s.color === "emerald" ? "bg-emerald-50" : "bg-cyan-50"}`}>
                  <s.icon className={`h-6 w-6 ${
                    s.color === "blue"    ? "text-blue-600"    :
                    s.color === "violet"  ? "text-violet-600"  :
                    s.color === "emerald" ? "text-emerald-600" : "text-cyan-600"}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <div className={`flex items-center gap-2 mt-6 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                  s.color === "blue" ? "text-blue-600" : s.color === "violet" ? "text-violet-600" : s.color === "emerald" ? "text-emerald-600" : "text-cyan-600"}`}>
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────── PLAYGROUND — Navy dark ───────────────── */}
      <Section className="section-navy">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Live Demo</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Interactive Voice Playground</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Type text, select a dialect and tone, and hear the difference. No login required.</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <InteractivePlayground />
          </motion.div>
        </div>
      </Section>

      {/* ───────────────── DATASET SCALE — Light Blue ───────────────── */}
      <Section className="section-lightblue border-b border-blue-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Dataset Scale</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">The Numbers That Matter</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Breadth, depth, and accuracy at production scale.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {[
              { value: "4,000+",  label: "Voice Hours",        color: "blue"    },
              { value: "15M+",    label: "Word Tokens",        color: "cyan"    },
              { value: "32+",     label: "Dialects",           color: "violet"  },
              { value: "200+",    label: "Annotation Cats",    color: "emerald" },
              { value: "500K+",   label: "Medical Terms",      color: "blue"    },
              { value: "97.4%",   label: "QA Accuracy",        color: "cyan"    },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i * 0.3}
                className="card-light rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className={`font-display text-2xl font-bold mb-1 ${
                  stat.color === "blue"   ? "text-blue-600"   :
                  stat.color === "cyan"   ? "text-cyan-600"   :
                  stat.color === "violet" ? "text-violet-600" : "text-emerald-600"}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="card-light rounded-2xl p-8">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-6 text-center">Coverage Across the Arab World</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
              {["Saudi Arabia", "UAE", "Egypt", "Jordan", "Iraq", "Syria", "Lebanon",
                "Kuwait", "Qatar", "Bahrain", "Oman", "Yemen", "Libya", "Tunisia",
                "Algeria", "Morocco", "Sudan", "Palestine", "Somalia", "Mauritania", "Djibouti", "Comoros"].map((country, i) => (
                <motion.span key={country}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-medium">
                  {country}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ───────────────── WHY AI DEEP WORDS — White ───────────────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Competitive Advantage</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why AI Deep Words</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Seven reasons enterprise AI teams trust us as their Arabic infrastructure provider.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} custom={i * 0.3}
                whileHover={{ y: -3 }}
                className="card-light rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="p-2.5 rounded-xl bg-blue-50 inline-flex mb-4">
                  <d.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{d.label}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────── INTEGRATIONS — Off-white ───────────────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Integrations</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">Works With Your Stack</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Native integrations with the AI ecosystem tools your team already uses.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((int, i) => (
              <motion.div key={int.name} variants={fadeUp} custom={i * 0.3}
                whileHover={{ scale: 1.03 }}
                className={`rounded-xl p-6 border font-semibold text-sm flex items-center justify-center transition-all cursor-default ${intColorMap[int.color]}`}>
                {int.name}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────── FINAL CTA — Blue ───────────────── */}
      <Section className="section-blue">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0}
            className="relative rounded-3xl overflow-hidden bg-white/8 border border-white/15 p-16 text-center backdrop-blur-sm">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-white/10 blur-[80px]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Power Your Arabic AI Infrastructure
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
              Join the enterprise teams building the next generation of Arabic AI with production-grade data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="px-10 py-4 bg-white text-blue-700 rounded-xl font-bold transition-all hover:bg-blue-50 flex items-center gap-2 justify-center shadow-lg">
                Start a Project <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact"
                className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all">
                Contact Enterprise Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

    </div>
  );
}
