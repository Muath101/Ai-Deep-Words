import { useRef, useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Mic, Brain, Heart, Globe2, Zap, Shield, CheckCircle2,
  ArrowRight, Play, Pause, ChevronRight, Database, Lock, Users, Award
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { fadeUp, Section } from "@/lib/ui";

function AnimatedWaveform() {
  const barData = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      h1: Math.random() * 40 + 10,
      h2: Math.random() * 80 + 20,
      h3: Math.random() * 40 + 10,
      dur: 1.2 + Math.random() * 1,
      delay: i * 0.03,
    })),
  []);

  return (
    <div className="flex items-center justify-center gap-[3px] h-16 md:h-24 opacity-60">
      {barData.map((b, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-300"
          animate={{ height: [`${b.h1}%`, `${b.h2}%`, `${b.h3}%`] }}
          transition={{ duration: b.dur, repeat: Infinity, repeatType: "reverse", delay: b.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function InteractivePlayground() {
  const { tr } = useLang();
  const dialects = [
    tr("Saudi Najdi", "نجدية"), tr("Saudi Hijazi", "حجازية"), tr("Gulf", "خليجية"),
    tr("Egyptian", "مصرية"), tr("Levantine", "شامية"), tr("MSA", "فصحى"),
  ];
  const tones = [
    tr("Professional", "احترافية"), tr("Customer Support", "دعم العملاء"),
    tr("Sales", "مبيعات"), tr("Calm Narration", "سرد هادئ"),
  ];

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
    const baseFreq = 200;
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
    <div className="card-dark rounded-2xl p-5 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-6">
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">{tr("Sample Text", "نص تجريبي")}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 text-right font-arabic resize-none h-28 focus:outline-none focus:border-blue-400/60 transition-colors"
              dir="rtl"
              placeholder="اكتب النص هنا..."
            />
          </div>
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">{tr("Select Dialect", "اختر اللهجة")}</label>
            <div className="flex flex-wrap gap-2">
              {dialects.map((d) => (
                <button key={d} onClick={() => setDialect(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all active:scale-95 ${
                    dialect === d ? "bg-blue-500/25 border-blue-400/60 text-blue-200" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-widest mb-3">{tr("Voice Tone", "نبرة الصوت")}</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button key={t} onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all active:scale-95 ${
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
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all glow-blue active:scale-95 ${
                playing ? "bg-blue-500/20 border border-blue-400/50 text-blue-300" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {playing ? tr("Stop Playback", "إيقاف التشغيل") : tr("Play Voice Sample", "تشغيل العيّنة")}
            </button>
            <p className="text-xs text-slate-500 mt-3">{tr("Demo synthesis · No login required", "تركيب تجريبي · بدون تسجيل دخول")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { tr } = useLang();
  const isMobile = useIsMobile();

  const metrics = [
    { value: "22+",    label: tr("Arab Countries", "دولة عربية") },
    { value: "32+",    label: tr("Arabic Dialects", "لهجة عربية") },
    { value: "4,000+", label: tr("Hours Voice Data", "ساعة صوت") },
    { value: "15M+",   label: tr("Words Dataset", "كلمة") },
    { value: "97.4%",  label: tr("Accuracy Rate", "نسبة الدقة") },
  ];

  const trustBadges = [
    { icon: Shield, label: tr("HIPAA Compliant", "متوافق مع HIPAA"),     color: "blue"    },
    { icon: Lock,   label: tr("GDPR Ready", "جاهز لـ GDPR"),             color: "emerald" },
    { icon: Award,  label: tr("Secure Infrastructure", "بنية تحتية آمنة"), color: "purple"  },
    { icon: Users,  label: tr("Human-in-the-Loop QA", "مراجعة بشرية للجودة"), color: "cyan"  },
  ];

  const clients = [
    { name: "Google", sub: "AI & Cloud" }, { name: "Microsoft", sub: "Azure AI" },
    { name: "Amazon", sub: "AWS & Alexa" }, { name: "Meta", sub: "AI Research" },
    { name: "Apple", sub: "Siri & ML" }, { name: "Anthropic", sub: "Claude AI" },
    { name: "OpenAI", sub: "GPT Models" }, { name: "Huawei", sub: "AI Labs" },
    { name: "Accenture", sub: "AI Practice" }, { name: "IBM", sub: "Watson AI" },
  ];

  const problems = [
    tr("Arabic dialect fragmentation across 22+ countries", "تشتّت اللهجات العربية عبر أكثر من 22 دولة"),
    tr("No production-grade dialect-specific datasets", "غياب بيانات إنتاجية مخصّصة للهجات"),
    tr("Weak medical and legal Arabic AI coverage", "ضعف التغطية الطبية والقانونية للعربية"),
    tr("Poor cross-dialect speech recognition accuracy", "تدنّي دقة التعرّف على الكلام بين اللهجات"),
    tr("Missing enterprise-grade annotation standards", "غياب معايير وسم بمستوى المؤسسات"),
  ];

  const solutions = [
    tr("Native speaker pipelines across every Arab country", "خطوط عمل بمتحدثين أصليين في كل دولة عربية"),
    tr("Dialect-aware QA and validation workflows", "مسارات جودة وتحقّق واعية باللهجات"),
    tr("Secure, compliant enterprise delivery infrastructure", "بنية تسليم مؤسسية آمنة ومتوافقة"),
    tr("Large-scale annotation at millions of utterances", "وسم واسع النطاق بملايين العبارات"),
    tr("Medical-grade and legal-grade Arabic AI assets", "أصول عربية بمستوى طبي وقانوني"),
  ];

  const pipelineSteps = [
    { label: tr("Collect", "جمع"),               desc: tr("Native speaker recording across 32+ dialects", "تسجيل بمتحدثين أصليين عبر أكثر من 32 لهجة") },
    { label: tr("Validate", "تحقّق"),             desc: tr("Multi-pass audio quality assurance", "ضمان جودة الصوت عبر عدة مراحل") },
    { label: tr("Annotate", "وسم"),              desc: tr("Expert linguistic annotation pipelines", "خطوط وسم لغوي بخبرة متخصصة") },
    { label: tr("Multi-Layer QA", "جودة متعددة"), desc: tr("Dialect-aware validation workflows", "مسارات تحقّق واعية باللهجات") },
    { label: tr("Secure Processing", "معالجة آمنة"), desc: tr("Encrypted, compliant infrastructure", "بنية مشفّرة ومتوافقة") },
    { label: tr("Enterprise Delivery", "تسليم مؤسسي"), desc: tr("API, HuggingFace, cloud delivery", "تسليم عبر API وHuggingFace والسحابة") },
  ];

  const services = [
    { icon: Mic,    title: tr("Voice Intelligence", "الذكاء الصوتي"),        desc: tr("Production-grade Arabic speech datasets across 32+ dialects with native-speaker validation and professional recording environments.", "بيانات كلام عربية بجودة إنتاجية عبر أكثر من 32 لهجة مع تحقّق بمتحدثين أصليين وبيئات تسجيل احترافية."), color: "blue" },
    { icon: Brain,  title: tr("NLP Solutions", "حلول معالجة اللغة"),         desc: tr("Enterprise Arabic NLP annotation pipelines with POS tagging, named entity recognition, sentiment analysis, and semantic labeling.", "خطوط وسم عربية للمؤسسات تشمل وسم الأقسام والكيانات وتحليل المشاعر والوسم الدلالي."), color: "violet" },
    { icon: Heart,  title: tr("Medical AI Infrastructure", "بنية الذكاء الطبي"), desc: tr("HIPAA-compliant medical Arabic linguistic assets for clinical NLP, radiology reporting, and healthcare AI systems.", "أصول لغوية طبية متوافقة مع HIPAA لمعالجة اللغة السريرية وتقارير الأشعة وأنظمة الرعاية الصحية."), color: "emerald" },
    { icon: Globe2, title: tr("Dialect Annotation", "وسم اللهجات"),          desc: tr("Granular dialect-aware annotation covering Najdi, Hijazi, Gulf, Egyptian, Levantine, Moroccan, and MSA variants.", "وسم دقيق واعٍ باللهجات يغطي النجدية والحجازية والخليجية والمصرية والشامية والمغربية والفصحى."), color: "cyan" },
    { icon: Zap,    title: tr("Speech Data Pipelines", "خطوط بيانات الكلام"), desc: tr("Scalable automated and human-in-the-loop speech processing pipelines delivering enterprise-grade audio intelligence.", "خطوط معالجة كلام آلية وبشرية قابلة للتوسّع تقدّم ذكاءً صوتياً بمستوى المؤسسات."), color: "blue" },
  ];

  const differentiators = [
    { icon: Globe2,       label: tr("32+ Dialects", "أكثر من 32 لهجة"),              desc: tr("The most comprehensive Arabic dialect coverage available commercially.", "أوسع تغطية للهجات العربية متاحة تجارياً.") },
    { icon: Users,        label: tr("Native Speaker Network", "شبكة متحدثين أصليين"), desc: tr("10,000+ native speakers across every Arab country and dialect.", "أكثر من 10,000 متحدث أصلي في كل دولة ولهجة عربية.") },
    { icon: Shield,       label: tr("Enterprise Compliance", "امتثال للمؤسسات"),     desc: tr("HIPAA, GDPR, and custom compliance frameworks for regulated industries.", "أطر امتثال HIPAA وGDPR ومخصّصة للقطاعات المنظّمة.") },
    { icon: Heart,        label: tr("Medical-Grade Assets", "أصول بمستوى طبي"),      desc: tr("Clinical and healthcare Arabic AI datasets built to the highest accuracy standards.", "بيانات عربية سريرية وصحية مبنية على أعلى معايير الدقة.") },
    { icon: CheckCircle2, label: tr("Human-in-the-Loop QA", "مراجعة بشرية للجودة"),   desc: tr("Every dataset validated by native-speaker experts, not just automated checks.", "كل مجموعة بيانات يراجعها خبراء متحدثون أصليون، لا الفحص الآلي فقط.") },
    { icon: Zap,          label: tr("Scalable Delivery", "تسليم قابل للتوسّع"),       desc: tr("From 10-hour pilots to enterprise programs at millions of utterances.", "من تجارب 10 ساعات إلى برامج مؤسسية بملايين العبارات.") },
    { icon: Database,     label: tr("Arabic-First Infrastructure", "بنية عربية أولاً"), desc: tr("Built exclusively for Arabic from the ground up — not adapted from English.", "مبنية حصرياً للعربية من الأساس — لا مكيّفة عن الإنجليزية.") },
  ];

  const integrations = [
    { name: "REST APIs", color: "blue" }, { name: "HuggingFace", color: "yellow" },
    { name: "AWS SageMaker", color: "orange" }, { name: "Azure ML", color: "blue" },
    { name: "Whisper", color: "green" }, { name: "Kaldi", color: "purple" },
    { name: "ESPnet", color: "cyan" }, { name: "Coqui TTS", color: "pink" },
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

  const scaleStats = [
    { value: "4,000+", label: tr("Voice Hours", "ساعة صوت"),     color: "blue"    },
    { value: "15M+",   label: tr("Word Tokens", "رمز لغوي"),     color: "cyan"    },
    { value: "32+",    label: tr("Dialects", "لهجة"),            color: "violet"  },
    { value: "200+",   label: tr("Annotation Cats", "فئة وسم"),  color: "emerald" },
    { value: "500K+",  label: tr("Medical Terms", "مصطلح طبي"),  color: "blue"    },
    { value: "97.4%",  label: tr("QA Accuracy", "دقة الجودة"),   color: "cyan"    },
  ];

  const countries = [
    tr("Saudi Arabia","السعودية"), tr("UAE","الإمارات"), tr("Egypt","مصر"), tr("Jordan","الأردن"),
    tr("Iraq","العراق"), tr("Syria","سوريا"), tr("Lebanon","لبنان"), tr("Kuwait","الكويت"),
    tr("Qatar","قطر"), tr("Bahrain","البحرين"), tr("Oman","عُمان"), tr("Yemen","اليمن"),
    tr("Libya","ليبيا"), tr("Tunisia","تونس"), tr("Algeria","الجزائر"), tr("Morocco","المغرب"),
    tr("Sudan","السودان"), tr("Palestine","فلسطين"), tr("Somalia","الصومال"), tr("Mauritania","موريتانيا"),
    tr("Djibouti","جيبوتي"), tr("Comoros","جزر القمر"),
  ];
  const visibleCountries = isMobile ? countries.slice(0, 12) : countries;
  const visibleProblems = isMobile ? problems.slice(0, 3) : problems;
  const visibleSolutions = isMobile ? solutions.slice(0, 3) : solutions;

  return (
    <div className="relative">

      {/* ───────── HERO ───────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0F172A]">
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
            {tr("Arabic AI Infrastructure", "البنية التحتية للذكاء الاصطناعي العربي")}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="relative z-10 font-display text-[2rem] leading-[1.15] md:text-6xl lg:text-7xl font-bold md:leading-tight max-w-5xl mb-5 text-white">
          {tr("Building the Linguistic ", "نبني البنية اللغوية ")}
          <span className="text-gradient-light">{tr("Infrastructure", "للذكاء")}</span>
          {tr(" for Global AI", " الاصطناعي العالمي")}
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="relative z-10 text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed mb-9">
          {isMobile
            ? tr("Production-grade Arabic voice, NLP, and medical datasets for next-generation AI.",
                 "بيانات صوتية ولغوية وطبية عربية بجودة إنتاجية لأنظمة الذكاء الاصطناعي.")
            : tr("Production-grade Arabic voice, NLP, and medical datasets powering the next generation of speech and language AI across 22+ countries and 32+ dialects.",
                 "بيانات صوتية ولغوية وطبية عربية بجودة إنتاجية تُشغّل الجيل القادم من الذكاء الاصطناعي للكلام واللغة عبر أكثر من 22 دولة و32 لهجة.")}
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="relative z-10 flex flex-col sm:flex-row gap-3 mb-14 md:mb-20 w-full max-w-lg sm:max-w-none justify-center">
          <Link href="/contact" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue flex items-center justify-center gap-2 text-sm md:text-base active:scale-95">
            {tr("Start a Project", "ابدأ مشروعك")} <ArrowRight className="h-4 w-4 dir-flip" />
          </Link>
          <Link href="/services" className="px-7 py-3.5 bg-white/8 hover:bg-white/14 border border-white/14 text-white rounded-xl font-semibold transition-all text-sm md:text-base text-center active:scale-95">
            {tr("Explore Services", "استكشف الخدمات")}
          </Link>
          <Link href="/datasets" className="hidden sm:flex px-7 py-3.5 bg-white/4 hover:bg-white/8 border border-white/8 text-slate-300 rounded-xl font-semibold transition-all items-center gap-2 text-sm md:text-base">
            <Play className="h-4 w-4 text-cyan-400" /> {tr("Voice Samples", "عيّنات صوتية")}
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-10 max-w-4xl w-full">
          {metrics.map((m, i) => (
            <div key={m.label} className={`text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────── TRUST STRIP ───────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <p className="text-xs text-slate-400 uppercase tracking-widest">{tr("Enterprise Trust & Compliance", "الثقة والامتثال للمؤسسات")}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((b, i) => (
              <motion.div key={b.label} variants={fadeUp} custom={i}
                className="card-light rounded-xl p-5 md:p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-xl ${b.color === "blue" ? "bg-blue-50" : b.color === "emerald" ? "bg-emerald-50" : b.color === "purple" ? "bg-violet-50" : "bg-cyan-50"}`}>
                  <b.icon className={`h-6 w-6 ${b.color === "blue" ? "text-blue-600" : b.color === "emerald" ? "text-emerald-600" : b.color === "purple" ? "text-violet-600" : "text-cyan-600"}`} />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-800">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── CLIENTS ───────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">{tr("Trusted By Global Technology Leaders", "موثوق من كبرى شركات التقنية العالمية")}</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3">{tr("Our Clients", "عملاؤنا")}</h2>
            <p className="hidden sm:block text-slate-500 text-sm max-w-xl mx-auto">
              {tr("Global technology leaders and healthcare institutions rely on our Arabic linguistic and data operations.", "تعتمد كبرى شركات التقنية والمؤسسات الصحية على عملياتنا اللغوية والبياناتية العربية.")}
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="flex gap-4 md:gap-5 w-max">
              {[...clients, ...clients].map((cl, i) => (
                <div key={i} className="card-light rounded-xl px-6 md:px-8 py-4 md:py-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px] group cursor-default">
                  <span className="font-display text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{cl.name}</span>
                  <span className="text-xs text-slate-400 mt-1">{cl.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ───────── ARABIC AI GAP ───────── */}
      <Section className="section-lightblue border-b border-blue-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("The Challenge", "التحدّي")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("The Arabic AI Gap", "فجوة الذكاء الاصطناعي العربي")}</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
              {tr("Arabic is one of the world's most spoken languages — yet critically underrepresented in AI training infrastructure.", "العربية من أكثر لغات العالم انتشاراً — ومع ذلك تظل ضعيفة التمثيل في بنية تدريب الذكاء الاصطناعي.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <motion.div variants={fadeUp} custom={1} className="card-light rounded-2xl p-6 md:p-8 border-red-100">
              <h3 className="font-display text-lg md:text-xl font-semibold text-red-600 mb-5">{tr("The Problem", "المشكلة")}</h3>
              <ul className="space-y-3.5">
                {visibleProblems.map((p) => (
                  <li key={p} className="flex gap-3 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="card-light rounded-2xl p-6 md:p-8 border-emerald-100">
              <h3 className="font-display text-lg md:text-xl font-semibold text-emerald-700 mb-5">{tr("The AI Deep Words Solution", "حلّ AI Deep Words")}</h3>
              <ul className="space-y-3.5">
                {visibleSolutions.map((s) => (
                  <li key={s} className="flex gap-3 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ───────── DATA PIPELINE ───────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Infrastructure", "البنية التحتية")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("Data Pipeline", "خط معالجة البيانات")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("From raw speech to enterprise-ready datasets — a six-stage production pipeline.", "من الكلام الخام إلى بيانات جاهزة للمؤسسات — خط إنتاج من ست مراحل.")}</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {pipelineSteps.map((step, i) => (
                <motion.div key={step.label} variants={fadeUp} custom={i * 0.5} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-display font-bold text-lg mb-4 md:mb-6 shadow-lg shadow-blue-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1.5">{step.label}</h4>
                  <p className="hidden sm:block text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── SERVICES ───────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Services", "الخدمات")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("Enterprise Infrastructure Pillars", "ركائز البنية التحتية للمؤسسات")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("Five core capabilities powering Arabic AI at enterprise scale.", "خمس قدرات أساسية تُشغّل الذكاء الاصطناعي العربي على مستوى المؤسسات.")}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i * 0.5}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group card-light rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className={`p-3 rounded-xl inline-flex mb-5 ${s.color === "blue" ? "bg-blue-50" : s.color === "violet" ? "bg-violet-50" : s.color === "emerald" ? "bg-emerald-50" : "bg-cyan-50"}`}>
                  <s.icon className={`h-6 w-6 ${s.color === "blue" ? "text-blue-600" : s.color === "violet" ? "text-violet-600" : s.color === "emerald" ? "text-emerald-600" : "text-cyan-600"}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2.5">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── PLAYGROUND ───────── */}
      <Section className="section-navy">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-12">
            <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Live Demo", "عرض حي")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-white mb-4">{tr("Interactive Voice Playground", "مساحة الصوت التفاعلية")}</h2>
            <p className="hidden sm:block text-slate-400 max-w-xl mx-auto">{tr("Type text, select a dialect and tone, and hear the difference. No login required.", "اكتب نصاً، واختر لهجة ونبرة، واستمع للفرق. بدون تسجيل دخول.")}</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <InteractivePlayground />
          </motion.div>
        </div>
      </Section>

      {/* ───────── DATASET SCALE ───────── */}
      <Section className="section-lightblue border-b border-blue-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Dataset Scale", "حجم البيانات")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("The Numbers That Matter", "الأرقام التي تهم")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("Breadth, depth, and accuracy at production scale.", "اتساع وعمق ودقة على نطاق إنتاجي.")}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-16">
            {scaleStats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i * 0.3}
                className="card-light rounded-xl p-5 md:p-6 text-center hover:shadow-md transition-shadow">
                <div className={`font-display text-xl md:text-2xl font-bold mb-1 ${stat.color === "blue" ? "text-blue-600" : stat.color === "cyan" ? "text-cyan-600" : stat.color === "violet" ? "text-violet-600" : "text-emerald-600"}`}>{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="card-light rounded-2xl p-6 md:p-8">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-5 text-center">{tr("Coverage Across the Arab World", "تغطية تشمل العالم العربي")}</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
              {visibleCountries.map((country, i) => (
                <motion.span key={country} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-medium">
                  {country}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ───────── WHY ───────── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Competitive Advantage", "الميزة التنافسية")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("Why AI Deep Words", "لماذا AI Deep Words")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("Seven reasons enterprise AI teams trust us as their Arabic infrastructure provider.", "سبعة أسباب تجعل فرق الذكاء الاصطناعي تثق بنا كمزوّد بنيتها العربية.")}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {differentiators.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} custom={i * 0.3} whileHover={{ y: -3 }}
                className="card-light rounded-xl p-5 md:p-6 hover:shadow-md hover:border-blue-200 transition-all">
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

      {/* ───────── INTEGRATIONS ───────── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Integrations", "التكاملات")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("Works With Your Stack", "يعمل مع أدواتك")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("Native integrations with the AI ecosystem tools your team already uses.", "تكاملات أصيلة مع أدوات منظومة الذكاء الاصطناعي التي يستخدمها فريقك.")}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {integrations.map((int, i) => (
              <motion.div key={int.name} variants={fadeUp} custom={i * 0.3} whileHover={{ scale: 1.03 }}
                className={`rounded-xl p-5 md:p-6 border font-semibold text-sm flex items-center justify-center transition-all cursor-default ${intColorMap[int.color]}`}>
                {int.name}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── FINAL CTA ───────── */}
      <Section className="section-blue">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0}
            className="relative rounded-3xl overflow-hidden bg-white/8 border border-white/15 p-8 md:p-16 text-center backdrop-blur-sm">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-white/10 blur-[80px]" />
            </div>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-white mb-4">{tr("Power Your Arabic AI Infrastructure", "شغّل بنيتك العربية للذكاء الاصطناعي")}</h2>
            <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10">{tr("Join the enterprise teams building the next generation of Arabic AI with production-grade data.", "انضم إلى فرق المؤسسات التي تبني الجيل القادم من الذكاء الاصطناعي العربي ببيانات بجودة إنتاجية.")}</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/contact" className="px-8 md:px-10 py-4 bg-white text-blue-700 rounded-xl font-bold transition-all hover:bg-blue-50 flex items-center gap-2 justify-center shadow-lg active:scale-95">
                {tr("Start a Project", "ابدأ مشروعك")} <ArrowRight className="h-5 w-5 dir-flip" />
              </Link>
              <Link href="/contact" className="px-8 md:px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all active:scale-95">
                {tr("Contact Enterprise Sales", "تواصل مع مبيعات المؤسسات")}
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

    </div>
  );
}
