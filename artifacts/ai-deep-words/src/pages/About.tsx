import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import abdulazizImg from "@assets/Abdulaziz_1781444292397.jpeg";
import asimImg      from "@assets/WhatsApp_Image_2026-06-13_at_11.51.04_PM_1781389308135.jpeg";
import muathImg     from "@assets/WhatsApp_Image_2026-06-13_at_7.59.20_PM_1781389308135.jpeg";
import abdullahImg  from "@assets/abdullah_1781444256577.png";

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

const team = [
  {
    name: "Abdulaziz Al-Tamri",
    role: "Head of Delivery & Executive Director",
    bio: "Leads company strategy, enterprise partnerships, and large-scale Arabic AI data programs — aligning delivery, security, and measurable quality outcomes across every engagement.",
    img: abdulazizImg,
  },
  {
    name: "Asim Ibrahim",
    role: "Head of Technology",
    bio: "Leads data engineering, automation pipelines, and secure infrastructure — including diarization tooling, encrypted storage, PII workflows, and enterprise delivery systems.",
    img: asimImg,
  },
  {
    name: "Muath Al-Hulwani",
    role: "Head of Linguistics",
    bio: "Directs dialect coverage, linguistic QA, and annotation standards — ensuring accurate representation across 32+ Arabic dialects using native-speaker validation workflows.",
    img: muathImg,
  },
  {
    name: "Abdullah Abdullatif",
    role: "Project Management",
    bio: "Drives operational coordination, contributor workflows, milestone execution, and delivery management across enterprise Arabic AI data programs.",
    img: abdullahImg,
  },
];

const values = [
  { title: "Arabic-First",        desc: "We built this company for Arabic from the ground up — not as an adaptation or afterthought." },
  { title: "Native Speaker Trust", desc: "Every annotation, every dataset, every QA decision flows through native Arabic expertise." },
  { title: "Enterprise Integrity", desc: "We operate at the compliance standards of the industries we serve — healthcare, government, enterprise AI." },
  { title: "Linguistic Precision", desc: "Accuracy isn't a metric for us — it's the minimum standard from which everything else is measured." },
];

export default function About() {
  return (
    <div>
      {/* ─── HERO — Light Blue ─── */}
      <section className="section-lightblue py-28 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">About</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            The Infrastructure Layer<br />Powering Arabic AI
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We exist to permanently close the Arabic AI gap — by building the linguistic infrastructure that enterprise AI teams have been waiting for.
          </p>
        </motion.div>
      </section>

      {/* ─── MISSION — White ─── */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Arabic is spoken by over 400 million people across 22 countries. It is one of the world's most structurally complex languages — with 32+ distinct regional dialects, rich morphology, and a vast written tradition. Yet in the global AI infrastructure ecosystem, Arabic remains critically underrepresented.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                AI Deep Words was founded to solve this permanently. Not through generic localization of English-first tools — but through purpose-built, Arabic-first infrastructure that meets the production standards of enterprise AI.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We build the datasets, pipelines, and annotation systems that power the next generation of Arabic speech recognition, natural language understanding, and conversational AI — across every domain, every dialect, and every enterprise standard.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-4">
              {[
                { value: "2020", label: "Founded"           },
                { value: "22+",  label: "Countries Covered" },
                { value: "32+",  label: "Dialects Supported"},
                { value: "50+",  label: "Enterprise Clients" },
              ].map((stat) => (
                <div key={stat.label} className="card-light rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                  <div className="font-display text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── PHILOSOPHY — Off-white ─── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Philosophy</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">How We Think</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} custom={i}
                className="card-light rounded-2xl p-8 hover:shadow-md hover:border-blue-200 transition-all">
                <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TEAM — Off-white ─── */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Team</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">The People Behind the Infrastructure</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A team of engineers, linguists, and operators who have dedicated their careers to Arabic AI.</p>
          </motion.div>

          <div className="space-y-5">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} custom={i * 0.3}
                className="card-light rounded-2xl hover:shadow-md hover:border-blue-200 transition-all overflow-hidden">
                <div className="flex flex-col sm:flex-row items-stretch">
                  {/* Photo — LEFT */}
                  <div className="relative w-full sm:w-52 flex-shrink-0 h-52 sm:h-auto overflow-hidden bg-slate-100">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center min-h-[13rem]">
                        <div className="w-20 h-20 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                          <span className="font-display text-2xl font-bold text-blue-600">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info — RIGHT */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-1">{member.role}</span>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">{member.name}</h3>
                    <p className="text-slate-600 leading-relaxed max-w-xl">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FUTURE — Blue CTA ─── */}
      <Section className="section-blue">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">The Future of Arabic AI</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
              Arabic AI is not a niche market. It is a global imperative. The 400 million Arabic speakers who interact with AI daily deserve systems built on infrastructure as rigorous as the language itself. We are building that infrastructure — one dataset, one dialect, one deployment at a time.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-blue-700 rounded-xl font-bold transition-all hover:bg-blue-50 shadow-lg">
              Work With Us <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
