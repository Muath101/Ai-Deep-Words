import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Terminal, Zap, Lock, Globe2 } from "lucide-react";
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-slate-500 hover:text-slate-300 transition-colors">
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const snippets: Record<string, { lang: string; code: string }> = {
  Python: {
    lang: "python",
    code: `import deepwords

client = deepwords.Client(api_key="dw_sk_your_api_key")

# Fetch a dataset
dataset = client.datasets.get("ADW-VOICE-001")

# Stream audio utterances
for utterance in client.utterances.stream(
    dataset_id="ADW-VOICE-001",
    dialect="saudi_najdi",
    limit=1000
):
    print(utterance.transcript, utterance.audio_url)

# Request a custom program
program = client.programs.create(
    dialect=["egyptian", "levantine"],
    hours=500,
    annotation=["transcription", "ner", "sentiment"],
    compliance=["hipaa"]
)`,
  },
  "Node.js": {
    lang: "javascript",
    code: `import { DeepWords } from "@deepwords/sdk";

const client = new DeepWords({
  apiKey: process.env.DEEPWORDS_API_KEY,
});

// Fetch dataset metadata
const dataset = await client.datasets.get("ADW-MED-001");
console.log(dataset.stats);

// Stream annotated utterances
const stream = client.utterances.stream({
  datasetId: "ADW-VOICE-001",
  dialect: "gulf",
  format: "wav",
});

for await (const chunk of stream) {
  console.log(chunk.transcript, chunk.confidence);
}`,
  },
  "REST API": {
    lang: "bash",
    code: `# Authenticate
curl -X GET https://api.deepwords.ai/v1/datasets \\
  -H "Authorization: Bearer dw_sk_your_api_key" \\
  -H "Content-Type: application/json"

# Fetch dataset details
curl -X GET https://api.deepwords.ai/v1/datasets/ADW-VOICE-001 \\
  -H "Authorization: Bearer dw_sk_your_api_key"

# List utterances with filters
curl -X GET "https://api.deepwords.ai/v1/utterances?dataset_id=ADW-VOICE-001&dialect=egyptian&limit=50" \\
  -H "Authorization: Bearer dw_sk_your_api_key"

# Create custom program request
curl -X POST https://api.deepwords.ai/v1/programs \\
  -H "Authorization: Bearer dw_sk_your_api_key" \\
  -d '{"dialects":["levantine"],"hours":200}'`,
  },
};

const endpoints = [
  { method: "GET", path: "/v1/datasets", desc: "List all available datasets" },
  { method: "GET", path: "/v1/datasets/{id}", desc: "Get dataset metadata and stats" },
  { method: "GET", path: "/v1/utterances", desc: "Stream utterances with filters" },
  { method: "POST", path: "/v1/programs", desc: "Create custom dataset program" },
  { method: "GET", path: "/v1/programs/{id}", desc: "Check program status" },
  { method: "POST", path: "/v1/export", desc: "Export dataset in specified format" },
  { method: "GET", path: "/v1/dialects", desc: "List all supported dialect codes" },
  { method: "GET", path: "/v1/account", desc: "Account usage and quota" },
];

const methodColor: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  POST: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  DELETE: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Developers() {
  const [activeSnippet, setActiveSnippet] = useState("Python");

  return (
    <div>
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-medium mb-6 inline-block">Developers</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Build With Arabic AI</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A clean REST API, native SDKs for Python and Node.js, and enterprise-grade infrastructure designed for production AI pipelines.
          </p>
        </motion.div>
      </section>

      <Section>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Zap, label: "Sub-100ms Response", desc: "Metadata and listing endpoints respond in under 100ms globally." },
              { icon: Lock, label: "API Key Auth", desc: "Bearer token authentication with scoped read/write permissions." },
              { icon: Globe2, label: "CDN-Delivered Audio", desc: "Audio assets served from 30+ edge locations globally." },
            ].map((f, i) => (
              <motion.div key={f.label} variants={fadeUp} custom={i} className="glass-card rounded-xl p-6 border border-white/8 flex gap-4">
                <f.icon className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">{f.label}</h4>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={0} className="glass-card rounded-2xl border border-white/10 overflow-hidden mb-12">
            <div className="flex border-b border-white/8 bg-white/3">
              {Object.keys(snippets).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveSnippet(lang)}
                  className={`px-6 py-3.5 text-sm font-medium border-r border-white/8 transition-all ${
                    activeSnippet === lang ? "bg-blue-600/20 text-blue-300" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="relative p-6">
              <div className="absolute top-4 right-4">
                <CopyButton text={snippets[activeSnippet].code} />
              </div>
              <pre className="text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed whitespace-pre">
                <code>{snippets[activeSnippet].code}</code>
              </pre>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <h2 className="font-display text-2xl font-bold mb-6 text-white">API Endpoints</h2>
            <div className="space-y-2">
              {endpoints.map((ep, i) => (
                <motion.div
                  key={ep.path}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/8 hover:border-white/15 transition-all"
                >
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border font-mono shrink-0 ${methodColor[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-blue-300 font-mono text-sm">{ep.path}</code>
                  <span className="text-slate-500 text-sm hidden md:block">{ep.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-transparent via-[#0B0F14]/40 to-transparent">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 border border-white/8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="h-5 w-5 text-blue-400" />
                <h3 className="font-display text-lg font-semibold text-white">SDK Installation</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Python</p>
                  <div className="bg-white/3 rounded-xl p-4 font-mono text-sm text-emerald-300 border border-white/8">
                    pip install deepwords
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Node.js</p>
                  <div className="bg-white/3 rounded-xl p-4 font-mono text-sm text-emerald-300 border border-white/8">
                    npm install @deepwords/sdk
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/8">
              <h3 className="font-display text-lg font-semibold text-white mb-6">Authentication</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                All API requests require a Bearer token. Generate your API key from the enterprise dashboard after account approval.
              </p>
              <div className="bg-white/3 rounded-xl p-4 font-mono text-sm text-slate-300 border border-white/8 mb-4">
                Authorization: Bearer dw_sk_XXXXXXXXX
              </div>
              <p className="text-slate-500 text-xs">Keys are scoped per project. Rotate them in the dashboard at any time.</p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to integrate?</h2>
            <p className="text-slate-400 mb-8">Apply for API access — enterprise accounts are approved within 2 business days.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all glow-blue">
              Apply for API Access
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
