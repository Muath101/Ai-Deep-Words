import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/i18n";
import { fadeUp, Section } from "@/lib/ui";

import abdulazizImg from "@assets/Abdulaziz_1781444292397.jpeg";
import asimImg      from "@assets/WhatsApp_Image_2026-06-13_at_11.51.04_PM_1781389308135.jpeg";
import muathImg     from "@assets/WhatsApp_Image_2026-06-13_at_7.59.20_PM_1781389308135.jpeg";
import abdullahImg  from "@assets/abdullah_1781444256577.png";

export default function About() {
  const { tr } = useLang();

  const team = [
    { name: tr("Abdulaziz Al-Tamri", "عبدالعزيز التمري"), role: tr("Head of Delivery & Executive Director", "رئيس التسليم والمدير التنفيذي"),
      bio: tr("Leads company strategy, enterprise partnerships, and large-scale Arabic AI data programs — aligning delivery, security, and measurable quality outcomes across every engagement.",
              "يقود استراتيجية الشركة والشراكات المؤسسية وبرامج بيانات الذكاء العربي واسعة النطاق — موائماً بين التسليم والأمان ونتائج الجودة القابلة للقياس في كل تعاون."), img: abdulazizImg },
    { name: tr("Asim Ibrahim", "عاصم إبراهيم"), role: tr("Head of Technology", "رئيس التقنية"),
      bio: tr("Leads data engineering, automation pipelines, and secure infrastructure — including diarization tooling, encrypted storage, PII workflows, and enterprise delivery systems.",
              "يقود هندسة البيانات وخطوط الأتمتة والبنية الآمنة — بما يشمل أدوات فصل المتحدثين والتخزين المشفّر ومسارات البيانات الحساسة وأنظمة التسليم المؤسسية."), img: asimImg },
    { name: tr("Muath Al-Hulwani", "معاذ الحلواني"), role: tr("Head of Linguistics", "رئيس اللغويات"),
      bio: tr("Directs dialect coverage, linguistic QA, and annotation standards — ensuring accurate representation across 32+ Arabic dialects using native-speaker validation workflows.",
              "يوجّه تغطية اللهجات وجودة اللغويات ومعايير الوسم — ضامناً تمثيلاً دقيقاً عبر أكثر من 32 لهجة عربية عبر مسارات تحقّق بمتحدثين أصليين."), img: muathImg },
    { name: tr("Abdullah Abdullatif", "عبدالله عبداللطيف"), role: tr("Project Management", "إدارة المشاريع"),
      bio: tr("Drives operational coordination, contributor workflows, milestone execution, and delivery management across enterprise Arabic AI data programs.",
              "يقود التنسيق التشغيلي ومسارات المساهمين وتنفيذ المراحل وإدارة التسليم عبر برامج بيانات الذكاء العربي المؤسسية."), img: abdullahImg },
  ];

  const values = [
    { title: tr("Arabic-First", "العربية أولاً"),                desc: tr("We built this company for Arabic from the ground up — not as an adaptation or afterthought.", "بنينا هذه الشركة للعربية من الأساس — لا كتكييف أو فكرة لاحقة.") },
    { title: tr("Native Speaker Trust", "ثقة المتحدثين الأصليين"), desc: tr("Every annotation, every dataset, every QA decision flows through native Arabic expertise.", "كل وسم وكل مجموعة بيانات وكل قرار جودة يمرّ عبر خبرة عربية أصلية.") },
    { title: tr("Enterprise Integrity", "نزاهة مؤسسية"),         desc: tr("We operate at the compliance standards of the industries we serve — healthcare, government, enterprise AI.", "نعمل وفق معايير الامتثال للقطاعات التي نخدمها — الرعاية الصحية والحكومة والذكاء المؤسسي.") },
    { title: tr("Linguistic Precision", "دقة لغوية"),           desc: tr("Accuracy isn't a metric for us — it's the minimum standard from which everything else is measured.", "الدقة ليست مقياساً لدينا — بل هي الحدّ الأدنى الذي يُقاس عليه كل شيء آخر.") },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="section-lightblue pt-28 pb-14 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">{tr("About", "من نحن")}</span>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-slate-900 mb-5">
            {tr("The Infrastructure Layer", "طبقة البنية التحتية")}<br />{tr("Powering Arabic AI", "التي تُشغّل الذكاء العربي")}
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {tr("We exist to permanently close the Arabic AI gap — by building the linguistic infrastructure that enterprise AI teams have been waiting for.", "وُجدنا لإغلاق فجوة الذكاء الاصطناعي العربي نهائياً — ببناء البنية اللغوية التي انتظرتها فرق الذكاء المؤسسية.")}
          </p>
        </motion.div>
      </section>

      {/* MISSION */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-5">{tr("Our Mission", "مهمتنا")}</h2>
              <p className="text-slate-700 leading-relaxed mb-5">
                {tr("Arabic is spoken by over 400 million people across 22 countries. It is one of the world's most structurally complex languages — with 32+ distinct regional dialects, rich morphology, and a vast written tradition. Yet in the global AI infrastructure ecosystem, Arabic remains critically underrepresented.",
                    "يتحدّث العربية أكثر من 400 مليون شخص عبر 22 دولة. وهي من أكثر لغات العالم تعقيداً بنيوياً — بأكثر من 32 لهجة إقليمية متمايزة وصرف غني وتراث مكتوب واسع. ومع ذلك تظل العربية ضعيفة التمثيل بشدة في منظومة بنية الذكاء العالمية.")}
              </p>
              <p className="hidden sm:block text-slate-600 leading-relaxed mb-5">
                {tr("AI Deep Words was founded to solve this permanently. Not through generic localization of English-first tools — but through purpose-built, Arabic-first infrastructure that meets the production standards of enterprise AI.",
                    "تأسست AI Deep Words لحلّ هذا نهائياً. ليس عبر توطين عام لأدوات إنجليزية أولاً — بل عبر بنية مبنية لغرضها، عربية أولاً، تلبّي معايير الإنتاج للذكاء المؤسسي.")}
              </p>
              <p className="hidden sm:block text-slate-600 leading-relaxed">
                {tr("We build the datasets, pipelines, and annotation systems that power the next generation of Arabic speech recognition, natural language understanding, and conversational AI — across every domain, every dialect, and every enterprise standard.",
                    "نبني البيانات والخطوط وأنظمة الوسم التي تُشغّل الجيل القادم من التعرّف على الكلام العربي وفهم اللغة الطبيعية والذكاء الحواري — عبر كل مجال وكل لهجة وكل معيار مؤسسي.")}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { value: "2020", label: tr("Founded", "التأسيس") },
                { value: "22+",  label: tr("Countries Covered", "دولة مغطّاة") },
                { value: "32+",  label: tr("Dialects Supported", "لهجة مدعومة") },
                { value: "50+",  label: tr("Enterprise Clients", "عميل مؤسسي") },
              ].map((stat) => (
                <div key={stat.label} className="card-light rounded-2xl p-6 md:p-8 text-center hover:shadow-md transition-shadow">
                  <div className="font-display text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Philosophy", "فلسفتنا")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("How We Think", "كيف نفكّر")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} custom={i} className="card-light rounded-2xl p-6 md:p-8 hover:shadow-md hover:border-blue-200 transition-all">
                <h3 className="font-display text-lg md:text-xl font-semibold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TEAM */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-5 inline-block">{tr("Team", "الفريق")}</span>
            <h2 className="font-display text-2xl md:text-5xl font-bold text-slate-900 mb-4">{tr("The People Behind the Infrastructure", "الأشخاص خلف البنية التحتية")}</h2>
            <p className="hidden sm:block text-slate-500 max-w-xl mx-auto">{tr("A team of engineers, linguists, and operators who have dedicated their careers to Arabic AI.", "فريق من المهندسين واللغويين والمشغّلين كرّسوا مسيرتهم للذكاء الاصطناعي العربي.")}</p>
          </motion.div>

          <div className="space-y-5">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} custom={i * 0.3}
                className="card-light rounded-2xl hover:shadow-md hover:border-blue-200 transition-all overflow-hidden">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="relative w-full sm:w-56 flex-shrink-0 h-72 sm:h-auto overflow-hidden bg-slate-100">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-1">{member.role}</span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">{member.name}</h3>
                    <p className="text-slate-600 leading-relaxed max-w-xl text-sm md:text-base">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FUTURE CTA */}
      <Section className="section-blue">
        <div className="container mx-auto px-5 md:px-12 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">{tr("The Future of Arabic AI", "مستقبل الذكاء الاصطناعي العربي")}</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
              {tr("Arabic AI is not a niche market. It is a global imperative. The 400 million Arabic speakers who interact with AI daily deserve systems built on infrastructure as rigorous as the language itself. We are building that infrastructure — one dataset, one dialect, one deployment at a time.",
                  "الذكاء العربي ليس سوقاً متخصصة، بل ضرورة عالمية. الـ400 مليون متحدث بالعربية الذين يتفاعلون مع الذكاء يومياً يستحقون أنظمة مبنية على بنية صارمة كصرامة اللغة نفسها. ونحن نبني تلك البنية — مجموعة بيانات ولهجة ونشراً في كل مرة.")}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-700 rounded-xl font-bold transition-all hover:bg-blue-50 shadow-lg active:scale-95">
              {tr("Work With Us", "اعمل معنا")} <ArrowRight className="h-5 w-5 dir-flip" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
