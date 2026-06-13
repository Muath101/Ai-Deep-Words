import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Search, BookOpen, Code2, Webhook, Package } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const navItems = [
  { section: "Getting Started", items: ["Introduction", "Authentication", "Quick Start", "Rate Limits"] },
  { section: "Datasets API", items: ["List Datasets", "Get Dataset", "Stream Utterances", "Export Data"] },
  { section: "Programs API", items: ["Create Program", "Get Status", "Update Config", "Cancel Program"] },
  { section: "SDKs", items: ["Python SDK", "Node.js SDK", "TypeScript Types"] },
  { section: "Webhooks", items: ["Overview", "Events", "Signatures", "Retry Policy"] },
  { section: "Guides", items: ["Building ASR Pipelines", "Medical NLP Setup", "Dialect Classification", "HuggingFace Integration"] },
];

const docs: Record<string, { title: string; content: React.ReactNode }> = {
  Introduction: {
    title: "Introduction to AI Deep Words API",
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p>The AI Deep Words API gives your team programmatic access to the most comprehensive Arabic speech and NLP dataset infrastructure available. Whether you're building Arabic ASR models, training LLMs, or deploying dialect-aware NLP systems, our API provides the data layer your pipeline needs.</p>
        <h3 className="font-display text-lg font-semibold text-white mt-8">Base URL</h3>
        <div className="bg-white/3 rounded-xl p-4 font-mono text-sm text-blue-300 border border-white/8">
          https://api.deepwords.ai/v1
        </div>
        <h3 className="font-display text-lg font-semibold text-white">Core Concepts</h3>
        <ul className="space-y-3 list-none">
          {[
            ["Datasets", "Pre-built Arabic linguistic datasets ready for immediate download or streaming."],
            ["Utterances", "Individual labeled audio or text samples within a dataset, streamable via API."],
            ["Programs", "Custom dataset collection and annotation programs scoped to your specifications."],
            ["Dialects", "Standardized dialect codes for filtering and routing Arabic data by regional variety."],
          ].map(([term, def]) => (
            <li key={term} className="flex gap-3">
              <span className="text-blue-400 font-mono text-sm shrink-0 mt-0.5">{term}</span>
              <span className="text-slate-400 text-sm">{def}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  Authentication: {
    title: "Authentication",
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p>All API requests require a bearer token in the Authorization header. API keys are project-scoped and can be rotated from the enterprise dashboard.</p>
        <h3 className="font-display text-lg font-semibold text-white">Request Header</h3>
        <div className="bg-white/3 rounded-xl p-4 font-mono text-sm text-emerald-300 border border-white/8">
          Authorization: Bearer dw_sk_XXXXXXXXXXXXXXXX
        </div>
        <h3 className="font-display text-lg font-semibold text-white">Key Scopes</h3>
        <div className="space-y-3">
          {[
            { scope: "read:datasets", desc: "Read dataset metadata and utterance listings" },
            { scope: "stream:utterances", desc: "Stream raw audio and annotated text" },
            { scope: "write:programs", desc: "Create and manage custom dataset programs" },
            { scope: "admin", desc: "Full account and billing access" },
          ].map((s) => (
            <div key={s.scope} className="flex gap-4 items-start p-3 rounded-lg bg-white/3 border border-white/8">
              <code className="text-blue-300 font-mono text-xs shrink-0 mt-0.5">{s.scope}</code>
              <span className="text-slate-400 text-sm">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "Quick Start": {
    title: "Quick Start",
    content: (
      <div className="space-y-6">
        <p className="text-slate-300">Get your first Arabic utterances in under 5 minutes.</p>
        {[
          { step: "1", label: "Install the SDK", code: "pip install deepwords" },
          { step: "2", label: "Initialize the client", code: `from deepwords import Client\nclient = Client(api_key="dw_sk_your_key")` },
          { step: "3", label: "Fetch a dataset", code: `dataset = client.datasets.get("ADW-VOICE-001")\nprint(dataset.stats)` },
          { step: "4", label: "Stream utterances", code: `for u in client.utterances.stream(dataset_id="ADW-VOICE-001"):\n    print(u.transcript)` },
        ].map((s) => (
          <div key={s.step} className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 font-bold shrink-0">{s.step}</span>
              <span className="text-sm font-medium text-slate-200">{s.label}</span>
            </div>
            <pre className="bg-white/3 rounded-xl p-4 font-mono text-sm text-slate-300 border border-white/8 overflow-x-auto ml-9">
              <code>{s.code}</code>
            </pre>
          </div>
        ))}
      </div>
    ),
  },
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [search, setSearch] = useState("");

  const activeDoc = docs[activeSection] || docs["Introduction"];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/8 bg-[#0B0F14]/60 backdrop-blur-md px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <span className="font-display font-semibold text-white">Documentation</span>
          <span className="text-white/20">/</span>
          <span className="text-slate-400 text-sm">{activeSection}</span>
          <div className="ml-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 max-w-xs w-full">
            <Search className="h-4 w-4 text-slate-500 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs..."
              className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 py-12">
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-6 sticky top-24">
              {navItems.map((group) => (
                <div key={group.section}>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{group.section}</p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => setActiveSection(item)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                            activeSection === item
                              ? "bg-blue-600/15 text-blue-300 border border-blue-500/20"
                              : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                          }`}
                        >
                          {item}
                          {activeSection === item && <ChevronRight className="h-3 w-3" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <main className="flex-1 max-w-3xl">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display text-3xl font-bold text-white mb-8">{activeDoc.title}</h1>
              <div className="prose prose-invert max-w-none">
                {activeDoc.content}
              </div>

              {!docs[activeSection] && (
                <div className="glass-card rounded-2xl p-12 border border-white/8 text-center">
                  <Code2 className="h-10 w-10 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-white mb-2">Coming Soon</h3>
                  <p className="text-slate-400">This documentation section is under development. Contact us for early access.</p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
