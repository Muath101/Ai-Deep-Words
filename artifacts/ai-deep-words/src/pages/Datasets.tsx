import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Filter, Download, ChevronRight, Database, Clock, Globe2, FileText } from "lucide-react";
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

const allDialects = ["All", "MSA", "Saudi Najdi", "Saudi Hijazi", "Gulf", "Egyptian", "Levantine", "Moroccan", "Iraqi", "Yemeni"];
const categories  = ["All", "Voice", "NLP", "Medical", "Conversational", "Legal"];

const datasets = [
  {
    id: "ADW-VOICE-001", name: "Saudi Arabic Voice Corpus",
    dialect: "Saudi Najdi", category: "Voice",
    hours: "800+", tokens: null, speakers: "2,400+",
    format: ["WAV", "FLAC", "JSON"], languages: ["ar-SA"], accuracy: "98.2%",
    desc: "The most comprehensive Najdi dialect speech corpus available. Multi-speaker, multi-environment, with phonetic transcription and speaker metadata.",
  },
  {
    id: "ADW-MED-001", name: "Medical Arabic NLP Corpus",
    dialect: "MSA", category: "Medical",
    hours: null, tokens: "5M+", speakers: null,
    format: ["JSONL", "CSV", "Parquet"], languages: ["ar"], accuracy: "97.4%",
    desc: "Clinical text annotated for medical entities, ICD codes, medications, procedures, and clinical assertions. HIPAA-compliant metadata.",
  },
  {
    id: "ADW-CONV-EG-001", name: "Egyptian Conversational Dataset",
    dialect: "Egyptian", category: "Conversational",
    hours: "600+", tokens: "3M+", speakers: "1,800+",
    format: ["WAV", "JSON", "TSV"], languages: ["ar-EG"], accuracy: "96.8%",
    desc: "Natural conversation recordings covering customer service, social, and professional domains. Multi-turn dialogue with intent labels.",
  },
  {
    id: "ADW-LEV-NLP-001", name: "Levantine NLP Annotation Pack",
    dialect: "Levantine", category: "NLP",
    hours: null, tokens: "8M+", speakers: null,
    format: ["JSONL", "CoNLL", "Parquet"], languages: ["ar-LB", "ar-SY", "ar-JO"], accuracy: "97.1%",
    desc: "Named entity recognition, sentiment, and POS-tagged Levantine text corpus spanning news, social media, and formal written domains.",
  },
  {
    id: "ADW-GULF-001", name: "Gulf Arabic Voice Pack",
    dialect: "Gulf", category: "Voice",
    hours: "400+", tokens: null, speakers: "1,200+",
    format: ["WAV", "FLAC"], languages: ["ar-AE", "ar-KW", "ar-QA", "ar-BH"], accuracy: "97.9%",
    desc: "Gulf Arabic voice corpus covering UAE, Kuwait, Qatar, and Bahrain dialects with rich demographic metadata and clean studio recordings.",
  },
  {
    id: "ADW-MSA-001", name: "Modern Standard Arabic Foundation Pack",
    dialect: "MSA", category: "NLP",
    hours: "1,200+", tokens: "15M+", speakers: "3,000+",
    format: ["WAV", "JSONL", "CSV", "Parquet"], languages: ["ar"], accuracy: "98.9%",
    desc: "Our flagship MSA dataset covering voice, text, and annotation across broadcast, academic, legal, and governmental Arabic domains.",
  },
];

const categoryStyle: Record<string, string> = {
  Voice:          "bg-blue-100 border-blue-200 text-blue-700",
  NLP:            "bg-violet-100 border-violet-200 text-violet-700",
  Medical:        "bg-emerald-100 border-emerald-200 text-emerald-700",
  Conversational: "bg-cyan-100 border-cyan-200 text-cyan-700",
  Legal:          "bg-amber-100 border-amber-200 text-amber-700",
};

export default function Datasets() {
  const [selectedDialect,  setSelectedDialect]  = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = datasets.filter((d) => {
    const dialectMatch  = selectedDialect  === "All" || d.dialect   === selectedDialect;
    const categoryMatch = selectedCategory === "All" || d.category  === selectedCategory;
    return dialectMatch && categoryMatch;
  });

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="section-lightblue py-28 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Datasets</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-6">Enterprise Dataset Catalog</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Production-ready Arabic datasets across every dialect, domain, and format. Filter by dialect or category.
          </p>
        </motion.div>
      </section>

      {/* ─── CATALOG ─── */}
      <Section className="section-white">
        <div className="container mx-auto px-6 md:px-12">

          {/* Filter bar */}
          <motion.div variants={fadeUp} custom={0}
            className="card-light rounded-2xl p-5 mb-8 flex flex-wrap gap-4 items-center border-slate-200">
            <div className="flex items-center gap-2 text-slate-500">
              <Filter className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Filter</span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium mr-1">Dialect:</span>
              {allDialects.map((d) => (
                <button key={d} onClick={() => setSelectedDialect(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedDialect === d
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                  }`}>
                  {d}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium mr-1">Category:</span>
              {categories.map((c) => (
                <button key={c} onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedCategory === c
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-violet-400 hover:text-violet-600"
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dataset list */}
          <div className="space-y-4">
            {filtered.map((ds, i) => (
              <motion.div key={ds.id} variants={fadeUp} custom={i * 0.2}
                className="card-light rounded-2xl hover:shadow-md hover:border-blue-200 transition-all overflow-hidden group">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs text-slate-400 font-mono">{ds.id}</span>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${categoryStyle[ds.category] || "bg-slate-100 border-slate-200 text-slate-600"}`}>
                          {ds.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 border border-slate-200 text-slate-600">
                          {ds.dialect}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {ds.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{ds.desc}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        {ds.hours    && <span className="flex items-center gap-1.5"><Clock    className="h-3.5 w-3.5 text-slate-400" />{ds.hours} hours</span>}
                        {ds.tokens   && <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-slate-400" />{ds.tokens} tokens</span>}
                        {ds.speakers && <span className="flex items-center gap-1.5"><Globe2   className="h-3.5 w-3.5 text-slate-400" />{ds.speakers} speakers</span>}
                        <span className="flex items-center gap-1.5"><Database className="h-3.5 w-3.5 text-slate-400" />{ds.accuracy} accuracy</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:items-end shrink-0">
                      <div className="flex flex-wrap gap-1.5">
                        {ds.format.map((f) => (
                          <span key={f} className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono">
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ds.languages.map((l) => (
                          <span key={l} className="px-2 py-1 rounded bg-blue-100 border border-blue-200 text-xs text-blue-700 font-mono">
                            {l}
                          </span>
                        ))}
                      </div>
                      <Link href="/contact"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all mt-2 shadow-sm">
                        <Download className="h-4 w-4" /> Request Access <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              No datasets match the selected filters. Try adjusting your selection.
            </div>
          )}

          {/* Custom dataset CTA */}
          <motion.div variants={fadeUp} custom={3}
            className="mt-12 card-light rounded-2xl p-8 border-blue-100 text-center bg-blue-50">
            <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">Need a Custom Dataset?</h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              We build custom Arabic dataset programs from scratch — specify dialect, domain, size, and annotation schema.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md">
              Request Custom Dataset <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
