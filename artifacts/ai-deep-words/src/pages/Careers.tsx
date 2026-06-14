import { motion } from "framer-motion";
import { Globe2, Mic, Brain, Code2, ChevronRight, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/i18n";
import { fadeUp, Section } from "@/lib/ui";

const colorMap: Record<string, string> = {
  blue: "from-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "from-purple-500/10 border-purple-500/20 text-purple-400",
  emerald: "from-emerald-500/10 border-emerald-500/20 text-emerald-400",
  cyan: "from-cyan-500/10 border-cyan-500/20 text-cyan-400",
};

export default function Careers() {
  const { tr } = useLang();

  const roles = [
    { icon: Globe2, color: "blue", title: tr("Senior Arabic Linguist", "لغوي عربي أول"), type: tr("Full-time", "دوام كامل"), location: tr("Remote (Arab World)", "عن بُعد (العالم العربي)"), dept: tr("Linguistics", "اللغويات"),
      desc: tr("Lead annotation quality for dialect-specific programs. Requires native fluency in Gulf, Levantine, or Egyptian Arabic.", "قيادة جودة الوسم لبرامج خاصة باللهجات. يتطلّب إتقاناً أصلياً للهجة الخليجية أو الشامية أو المصرية.") },
    { icon: Mic, color: "purple", title: tr("Speech Data Engineer", "مهندس بيانات كلام"), type: tr("Full-time", "دوام كامل"), location: tr("Remote", "عن بُعد"), dept: tr("Engineering", "الهندسة"),
      desc: tr("Build and optimize audio processing pipelines — VAD, diarization, forced alignment, and QA tooling for Arabic speech datasets.", "بناء وتحسين خطوط معالجة الصوت — كشف النشاط الصوتي وفصل المتحدثين والمحاذاة وأدوات الجودة لبيانات الكلام العربي.") },
    { icon: Brain, color: "emerald", title: tr("NLP Annotation Specialist", "أخصائي وسم لغوي"), type: tr("Full-time", "دوام كامل"), location: tr("Remote (Arab World)", "عن بُعد (العالم العربي)"), dept: tr("Operations", "العمليات"),
      desc: tr("Execute NER, POS, and semantic annotation for enterprise Arabic NLP programs under linguistic specialist guidance.", "تنفيذ وسم الكيانات والأقسام والوسم الدلالي لبرامج معالجة اللغة العربية المؤسسية بإشراف أخصائيين لغويين.") },
    { icon: Code2, color: "cyan", title: tr("ML Infrastructure Engineer", "مهندس بنية تعلّم آلي"), type: tr("Full-time", "دوام كامل"), location: tr("Remote", "عن بُعد"), dept: tr("Engineering", "الهندسة"),
      desc: tr("Own the infrastructure that powers dataset delivery — API scalability, CDN optimization, and secure enterprise delivery pipelines.", "امتلاك البنية التي تُشغّل تسليم البيانات — قابلية توسّع API وتحسين CDN وخطوط تسليم مؤسسية آمنة.") },
    { icon: Globe2, color: "purple", title: tr("Dialect Research Lead", "قائد أبحاث اللهجات"), type: tr("Full-time", "دوام كامل"), location: tr("Remote (MENA)", "عن بُعد (الشرق الأوسط)"), dept: tr("Research", "الأبحاث"),
      desc: tr("Drive research into underrepresented Arabic dialects. Define coverage standards and build annotation taxonomies for new dialect programs.", "قيادة الأبحاث في اللهجات العربية ضعيفة التمثيل. تحديد معايير التغطية وبناء تصنيفات الوسم لبرامج لهجات جديدة.") },
    { icon: Brain, color: "emerald", title: tr("Medical Arabic Annotator", "مُوسِّم عربي طبي"), type: tr("Contract", "عقد"), location: tr("Remote", "عن بُعد"), dept: tr("Operations", "العمليات"),
      desc: tr("Annotate clinical Arabic text for medical entity recognition and ICD coding. Medical or healthcare background required.", "وسم نص عربي سريري للتعرّف على الكيانات الطبية وترميز ICD. يتطلّب خلفية طبية أو صحية.") },
  ];

  const values = [
    { label: tr("Fully Remote", "عن بُعد بالكامل"),       desc: tr("Work from anywhere in the world. We are globally distributed.", "اعمل من أي مكان في العالم. نحن موزّعون عالمياً.") },
    { label: tr("Arabic-First Culture", "ثقافة عربية أولاً"), desc: tr("Every decision we make starts with Arabic. Not an afterthought.", "كل قرار نتخذه يبدأ بالعربية. ليست فكرة لاحقة.") },
    { label: tr("Mission-Driven", "مدفوعون بالرسالة"),     desc: tr("Your work directly closes the Arabic AI gap at global scale.", "عملك يغلق مباشرةً فجوة الذكاء العربي على نطاق عالمي.") },
    { label: tr("Elite Standards", "معايير نخبوية"),       desc: tr("We hire slow and expect excellence. The bar is high — and worth it.", "نوظّف بتأنٍّ ونتوقّع التميّز. المعيار عالٍ — ويستحق.") },
  ];

  return (
    <div className="bg-[#0F172A] text-white">
      <section className="relative pt-28 pb-14 md:py-36 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs uppercase tracking-widest font-medium mb-6 inline-block">{tr("Careers", "الوظائف")}</span>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-white mb-5">{tr("Build the Future of", "ابنِ مستقبل")}<br />{tr("Arabic AI With Us", "الذكاء العربي معنا")}</h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            {tr("We are assembling the world's best team in Arabic linguistic AI. If you're exceptional at what you do and care deeply about Arabic, this is where you belong.", "نجمع أفضل فريق في العالم في الذكاء اللغوي العربي. إن كنت استثنائياً فيما تفعله وتهتم عميقاً بالعربية، فهذا مكانك.")}
          </p>
        </motion.div>
      </section>

      <Section>
        <div className="container mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 md:mb-16">
            {values.map((v, i) => (
              <motion.div key={v.label} variants={fadeUp} custom={i} className="glass-card rounded-xl p-5 md:p-6 border border-white/8">
                <h4 className="font-semibold text-white mb-2">{v.label}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">{tr("Open Roles", "الوظائف المتاحة")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {roles.map((role, i) => (
              <motion.div key={role.title} variants={fadeUp} custom={i * 0.2} whileHover={{ y: -2 }}
                className={`glass-card rounded-2xl p-6 border bg-gradient-to-br ${colorMap[role.color].split(" ").slice(0, 2).join(" ")} hover:border-white/15 transition-all group`}>
                <div className="flex items-start justify-between mb-4">
                  <role.icon className={`h-6 w-6 ${colorMap[role.color].split(" ")[2]}`} />
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${role.type === tr("Contract", "عقد") ? "bg-amber-500/10 border border-amber-500/20 text-amber-300" : "bg-white/5 border border-white/10 text-slate-400"}`}>{role.type}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{role.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{role.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-5">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{role.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{role.dept}</span>
                </div>
                <Link href="/contact" className={`flex items-center gap-2 text-sm font-medium transition-colors ${colorMap[role.color].split(" ")[2]} hover:opacity-80`}>
                  {tr("Apply Now", "قدّم الآن")} <ChevronRight className="h-4 w-4 dir-flip" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0B0F14] to-purple-600/10 p-8 md:p-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{tr("Don't see your role?", "لم تجد وظيفتك؟")}</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
              {tr("We're always looking for exceptional Arabic linguists, speech engineers, and AI infrastructure specialists. Send us your background and we'll reach out when the right opportunity opens.", "نبحث دائماً عن لغويين عرب استثنائيين ومهندسي كلام وأخصائيي بنية ذكاء. أرسل لنا خلفيتك وسنتواصل عند توفّر الفرصة المناسبة.")}
            </p>
            <a href="mailto:partner@aidpwords.com" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue active:scale-95">
              {tr("Send Your Resume", "أرسل سيرتك الذاتية")} <ArrowRight className="h-5 w-5 dir-flip" />
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
