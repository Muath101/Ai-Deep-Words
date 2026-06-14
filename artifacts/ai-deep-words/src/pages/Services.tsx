import { motion } from "framer-motion";
import { Mic, Brain, Heart, Globe2, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { fadeUp, Section } from "@/lib/ui";

export default function Services() {
  const { tr } = useLang();
  const isMobile = useIsMobile();

  const services = [
    {
      icon: Mic, color: "blue",
      title: tr("Voice Intelligence", "الذكاء الصوتي"),
      subtitle: tr("Production-grade Arabic speech datasets", "بيانات كلام عربية بجودة إنتاجية"),
      desc: tr("The most comprehensive Arabic speech dataset program available commercially. We capture, validate, and deliver speaker-diverse audio across every dialect, accent, and recording environment your models need to achieve real-world performance.",
               "أشمل برنامج بيانات كلام عربية متاح تجارياً. نلتقط ونتحقّق ونسلّم صوتاً متنوّع المتحدثين عبر كل لهجة ولكنة وبيئة تسجيل تحتاجها نماذجك لأداء واقعي."),
      descShort: tr("The most comprehensive Arabic speech dataset program available — speaker-diverse audio across every dialect.",
                    "أشمل برنامج بيانات كلام عربية متاح — صوت متنوّع المتحدثين عبر كل لهجة."),
      steps: [
        tr("Remote and studio recording across 22+ countries", "تسجيل عن بُعد وفي الاستوديو عبر أكثر من 22 دولة"),
        tr("Age, gender, and dialect-stratified speaker diversity", "تنوّع متحدثين حسب العمر والجنس واللهجة"),
        tr("Multi-microphone capture with controlled SNR environments", "التقاط متعدّد الميكروفونات ببيئات ضوضاء مضبوطة"),
        tr("Diarization, segmentation, and transcript alignment", "فصل المتحدثين والتقطيع ومحاذاة النصوص"),
        tr("Expert phonetic validation and quality grading", "تحقّق صوتي خبير وتقييم للجودة"),
        tr("FLAC/WAV/MP3 delivery with rich metadata schemas", "تسليم FLAC/WAV/MP3 مع بيانات وصفية غنية"),
      ],
      benefits: [tr("4,000+ hours available immediately", "أكثر من 4,000 ساعة متاحة فوراً"), tr("Custom recording programs in 4-8 weeks", "برامج تسجيل مخصّصة خلال 4-8 أسابيع"), tr("HIPAA-compliant data handling", "معالجة بيانات متوافقة مع HIPAA")],
      iconBg: "bg-blue-50", iconColor: "text-blue-600", numBg: "bg-blue-600",
      benefitStyle: "bg-blue-50 border-blue-200 text-blue-700", btnStyle: "bg-blue-600 hover:bg-blue-700 text-white", cardBorder: "border-blue-100",
    },
    {
      icon: Brain, color: "violet",
      title: tr("NLP Solutions", "حلول معالجة اللغة"),
      subtitle: tr("Arabic annotation at enterprise scale", "وسم عربي على مستوى المؤسسات"),
      desc: tr("End-to-end Arabic NLP annotation pipelines built for enterprise language model development. From raw text to richly annotated training corpora — executed by native Arabic linguists with specialized domain expertise.",
               "خطوط وسم عربية متكاملة مبنية لتطوير نماذج اللغة المؤسسية. من النص الخام إلى مدوّنات تدريب غنية الوسم — ينفّذها لغويون عرب أصليون بخبرة متخصّصة."),
      descShort: tr("End-to-end Arabic NLP annotation pipelines, executed by native linguists.",
                    "خطوط وسم عربية متكاملة ينفّذها لغويون أصليون."),
      steps: [
        tr("POS tagging and morphological analysis", "وسم الأقسام والتحليل الصرفي"),
        tr("Named entity recognition (persons, organizations, locations, dates)", "التعرّف على الكيانات (أشخاص، منظمات، أماكن، تواريخ)"),
        tr("Sentiment and emotion annotation", "وسم المشاعر والانفعالات"),
        tr("Semantic role labeling and coreference resolution", "وسم الأدوار الدلالية وحل الإحالات"),
        tr("Intent and entity extraction for conversational AI", "استخراج النوايا والكيانات للذكاء الحواري"),
        tr("Custom taxonomy development for domain-specific NLP", "تطوير تصنيفات مخصّصة لمجالات محددة"),
      ],
      benefits: [tr("50M+ token capacity per program", "سعة تتجاوز 50 مليون رمز لكل برنامج"), tr("Dialect-stratified annotation available", "وسم مصنّف حسب اللهجة متاح"), tr("Multi-pass inter-annotator agreement validation", "تحقّق باتفاق المُوسِّمين عبر عدة مراحل")],
      iconBg: "bg-violet-50", iconColor: "text-violet-600", numBg: "bg-violet-600",
      benefitStyle: "bg-violet-50 border-violet-200 text-violet-700", btnStyle: "bg-violet-600 hover:bg-violet-700 text-white", cardBorder: "border-violet-100",
    },
    {
      icon: Heart, color: "emerald",
      title: tr("Medical AI Infrastructure", "بنية الذكاء الطبي"),
      subtitle: tr("HIPAA-compliant clinical Arabic datasets", "بيانات سريرية عربية متوافقة مع HIPAA"),
      desc: tr("Medical Arabic AI is one of the most demanding and underserved niches in language AI. We deliver clinical-grade linguistic assets for radiology reporting, clinical NLP, patient interaction, and healthcare documentation systems.",
               "الذكاء الطبي العربي من أكثر المجالات تطلّباً وأقلّها خدمة. نقدّم أصولاً لغوية بمستوى سريري لتقارير الأشعة ومعالجة اللغة السريرية وتفاعل المرضى وأنظمة التوثيق الصحي."),
      descShort: tr("Clinical-grade Arabic linguistic assets for radiology, clinical NLP, and healthcare AI.",
                    "أصول لغوية عربية بمستوى سريري للأشعة ومعالجة اللغة والرعاية الصحية."),
      steps: [
        tr("Clinical term extraction and ICD coding", "استخراج المصطلحات السريرية وترميز ICD"),
        tr("Medical Arabic vocabulary normalization", "توحيد المفردات الطبية العربية"),
        tr("Radiology report annotation and templating", "وسم تقارير الأشعة وقوالبها"),
        tr("Medication, dosage, and procedure labeling", "وسم الأدوية والجرعات والإجراءات"),
        tr("Patient consent and communication corpus development", "تطوير مدوّنات موافقة وتواصل المرضى"),
        tr("HIPAA-compliant data handling and secure delivery", "معالجة بيانات متوافقة مع HIPAA وتسليم آمن"),
      ],
      benefits: [tr("500K+ medical terms annotated", "أكثر من 500 ألف مصطلح طبي مُوسَّم"), tr("Physician-validated annotation standards", "معايير وسم معتمدة من أطباء"), tr("All delivery under HIPAA and GDPR", "كل التسليم وفق HIPAA وGDPR")],
      iconBg: "bg-emerald-50", iconColor: "text-emerald-600", numBg: "bg-emerald-600",
      benefitStyle: "bg-emerald-50 border-emerald-200 text-emerald-700", btnStyle: "bg-emerald-600 hover:bg-emerald-700 text-white", cardBorder: "border-emerald-100",
    },
    {
      icon: Globe2, color: "cyan",
      title: tr("Dialect Annotation", "وسم اللهجات"),
      subtitle: tr("32+ dialect-specific annotation programs", "أكثر من 32 برنامج وسم خاص باللهجات"),
      desc: tr("Arabic dialect diversity is the core challenge for any Arabic AI system. We provide granular, linguist-led annotation covering the full spectrum of dialectal Arabic — from hyperlocal regional varieties to standardized MSA.",
               "تنوّع اللهجات العربية هو التحدّي الجوهري لأي نظام ذكاء عربي. نقدّم وسماً دقيقاً يقوده لغويون يغطي كامل طيف العربية — من اللهجات المحلية الدقيقة إلى الفصحى المعيارية."),
      descShort: tr("Granular, linguist-led annotation across the full spectrum of Arabic dialects.",
                    "وسم دقيق يقوده لغويون عبر كامل طيف اللهجات العربية."),
      steps: [
        tr("Dialect identification and classification labeling", "تحديد اللهجات ووسم تصنيفها"),
        tr("Code-switching detection and annotation", "كشف ووسم التبديل بين اللغات"),
        tr("Dialect-specific lexicon development", "تطوير معاجم خاصة باللهجات"),
        tr("Cross-dialect semantic equivalence mapping", "ربط التكافؤ الدلالي بين اللهجات"),
        tr("Regional phonetic transcription", "نسخ صوتي إقليمي"),
        tr("Native speaker validation for every dialect variety", "تحقّق بمتحدثين أصليين لكل لهجة"),
      ],
      benefits: [tr("Najdi, Hijazi, Gulf, Egyptian, Levantine, Moroccan, and more", "نجدية وحجازية وخليجية ومصرية وشامية ومغربية وغيرها"), tr("Sub-regional dialect annotation available", "وسم لهجات دون-إقليمية متاح"), tr("Native-speaker-validated annotation", "وسم مُتحقَّق بمتحدثين أصليين")],
      iconBg: "bg-cyan-50", iconColor: "text-cyan-600", numBg: "bg-cyan-600",
      benefitStyle: "bg-cyan-50 border-cyan-200 text-cyan-700", btnStyle: "bg-cyan-600 hover:bg-cyan-700 text-white", cardBorder: "border-cyan-100",
    },
    {
      icon: Zap, color: "blue",
      title: tr("Speech Data Pipelines", "خطوط بيانات الكلام"),
      subtitle: tr("Scalable automated + human annotation", "وسم آلي وبشري قابل للتوسّع"),
      desc: tr("For programs requiring millions of utterances, we combine automated preprocessing with expert human review layers — delivering speed at scale without sacrificing annotation quality.",
               "للبرامج التي تتطلّب ملايين العبارات، نجمع المعالجة الآلية مع طبقات مراجعة بشرية خبيرة — لتحقيق السرعة على نطاق واسع دون التضحية بجودة الوسم."),
      descShort: tr("Automated preprocessing plus expert human review — speed at scale, quality intact.",
                    "معالجة آلية مع مراجعة بشرية خبيرة — سرعة على نطاق واسع بجودة محفوظة."),
      steps: [
        tr("Automated segmentation and VAD processing", "تقطيع آلي ومعالجة كشف النشاط الصوتي"),
        tr("Forced alignment with transcript verification", "محاذاة قسرية مع التحقّق من النصوص"),
        tr("Human-in-the-loop quality sampling at configurable rates", "عيّنات جودة بشرية بمعدلات قابلة للضبط"),
        tr("Streaming delivery through REST API or cloud storage", "تسليم متدفّق عبر REST API أو التخزين السحابي"),
        tr("Real-time annotation dashboard and progress reporting", "لوحة وسم وتقارير تقدّم فورية"),
        tr("Iterative model feedback loops integrated into pipeline", "حلقات تغذية راجعة متكررة مدمجة في الخط"),
      ],
      benefits: [tr("1M+ utterance programs supported", "دعم برامج تتجاوز مليون عبارة"), tr("Configurable human QA sampling rates", "معدلات عيّنات جودة بشرية قابلة للضبط"), tr("Sub-2-week turnaround for standard programs", "إنجاز خلال أقل من أسبوعين للبرامج القياسية")],
      iconBg: "bg-blue-50", iconColor: "text-blue-600", numBg: "bg-blue-600",
      benefitStyle: "bg-blue-50 border-blue-200 text-blue-700", btnStyle: "bg-blue-600 hover:bg-blue-700 text-white", cardBorder: "border-blue-100",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="section-lightblue pt-28 pb-14 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">{tr("Services", "الخدمات")}</span>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-slate-900 mb-5">{tr("Arabic AI Infrastructure", "البنية التحتية للذكاء الاصطناعي العربي")}</h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {tr("Five enterprise-grade capabilities designed to give AI teams the Arabic language infrastructure they need to ship real products.",
                "خمس قدرات بمستوى المؤسسات تمنح فرق الذكاء الاصطناعي البنية اللغوية العربية اللازمة لإطلاق منتجات حقيقية.")}
          </p>
        </motion.div>
      </section>

      {/* SERVICE SECTIONS */}
      {services.map((service, si) => {
        const steps = isMobile ? service.steps.slice(0, 4) : service.steps;
        return (
          <Section key={service.title} className={si % 2 === 0 ? "section-white border-b border-slate-100" : "section-offwhite border-b border-slate-100"}>
            <div className="container mx-auto px-5 md:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${si % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                {/* info */}
                <motion.div variants={fadeUp} custom={0}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${service.benefitStyle} mb-5`}>
                    <service.icon className={`h-4 w-4 ${service.iconColor}`} />
                    <span className={`text-xs font-medium ${service.iconColor}`}>{service.subtitle}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">{service.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6 md:mb-8">{isMobile ? service.descShort : service.desc}</p>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-7 md:mb-8">
                    {service.benefits.map((b) => (
                      <span key={b} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${service.benefitStyle}`}>
                        <CheckCircle2 className="h-3 w-3" />{b}
                      </span>
                    ))}
                  </div>
                  <Link href="/contact" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-95 ${service.btnStyle}`}>
                    {tr("Start a Program", "ابدأ برنامجاً")} <ArrowRight className="h-4 w-4 dir-flip" />
                  </Link>
                </motion.div>

                {/* pipeline */}
                <motion.div variants={fadeUp} custom={1} className={`card-light rounded-2xl p-6 md:p-8 border ${service.cardBorder}`}>
                  <h3 className="font-semibold text-slate-700 mb-5 md:mb-6 text-xs uppercase tracking-widest">{tr("Pipeline Process", "مراحل المعالجة")}</h3>
                  <ol className="space-y-3.5 md:space-y-4">
                    {steps.map((step, i) => (
                      <li key={step} className="flex gap-4 items-start">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 ${service.numBg}`}>{i + 1}</span>
                        <span className="text-slate-700 text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section className="section-lightblue">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="card-light rounded-3xl p-8 md:p-16 text-center border border-blue-100 shadow-sm">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">{tr("Ready to build Arabic AI?", "جاهز لبناء ذكاء عربي؟")}</h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">{tr("Tell us what you're building and we'll scope the right program for your team.", "أخبرنا بما تبنيه وسنحدّد البرنامج المناسب لفريقك.")}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
              {tr("Start a Project", "ابدأ مشروعك")} <ArrowRight className="h-5 w-5 dir-flip" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
