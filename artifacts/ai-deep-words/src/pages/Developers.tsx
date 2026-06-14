import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal, Zap, Lock, Globe2 } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/i18n";
import { fadeUp, Section } from "@/lib/ui";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded" aria-label="Copy code">
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
  { method: "GET",  path: "/v1/datasets",      key: "list_ds"    },
  { method: "GET",  path: "/v1/datasets/{id}", key: "get_ds"     },
  { method: "GET",  path: "/v1/utterances",    key: "stream_utt" },
  { method: "POST", path: "/v1/programs",      key: "create_prog"},
  { method: "GET",  path: "/v1/programs/{id}", key: "prog_status"},
  { method: "POST", path: "/v1/export",        key: "export"     },
  { method: "GET",  path: "/v1/dialects",      key: "dialects"   },
  { method: "GET",  path: "/v1/account",       key: "account"    },
];

const methodColor: Record<string, string> = {
  GET:    "text-emerald-700 bg-emerald-100 border-emerald-200",
  POST:   "text-blue-700   bg-blue-100   border-blue-200",
  DELETE: "text-red-700    bg-red-100    border-red-200",
};

export default function Developers() {
  const { tr } = useLang();
  const [activeSnippet, setActiveSnippet] = useState("Python");

  const features = [
    { icon: Zap,    label: tr("Sub-100ms Response", "استجابة دون 100 مللي ثانية"), desc: tr("Metadata and listing endpoints respond in under 100ms globally.", "نقاط البيانات الوصفية والقوائم تستجيب في أقل من 100 مللي ثانية عالمياً.") },
    { icon: Lock,   label: tr("API Key Auth", "مصادقة بمفتاح API"),               desc: tr("Bearer token authentication with scoped read/write permissions.", "مصادقة برمز Bearer مع صلاحيات قراءة/كتابة محدّدة النطاق.") },
    { icon: Globe2, label: tr("CDN-Delivered Audio", "صوت عبر CDN"),              desc: tr("Audio assets served from 30+ edge locations globally.", "أصول صوتية تُقدَّم من أكثر من 30 موقعاً طرفياً عالمياً.") },
  ];

  const endpointDesc: Record<string, string> = {
    list_ds:     tr("List all available datasets", "عرض كل البيانات المتاحة"),
    get_ds:      tr("Get dataset metadata and stats", "جلب البيانات الوصفية والإحصاءات"),
    stream_utt:  tr("Stream utterances with filters", "بثّ العبارات مع تصفية"),
    create_prog: tr("Create custom dataset program", "إنشاء برنامج بيانات مخصّص"),
    prog_status: tr("Check program status", "التحقّق من حالة البرنامج"),
    export:      tr("Export dataset in specified format", "تصدير البيانات بصيغة محددة"),
    dialects:    tr("List all supported dialect codes", "عرض كل رموز اللهجات المدعومة"),
    account:     tr("Account usage and quota", "استخدام الحساب والحصة"),
  };

  return (
    <div>
      {/* HERO */}
      <section className="section-lightblue pt-28 pb-14 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">{tr("Developers", "المطوّرون")}</span>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-slate-900 mb-5">{tr("Build With Arabic AI", "ابنِ بالذكاء العربي")}</h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {tr("A clean REST API, native SDKs for Python and Node.js, and enterprise-grade infrastructure designed for production AI pipelines.", "واجهة REST نظيفة، وحِزم تطوير أصلية لـ Python وNode.js، وبنية بمستوى المؤسسات مصمّمة لخطوط الذكاء الإنتاجية.")}
          </p>
        </motion.div>
      </section>

      {/* FEATURES + CODE */}
      <Section className="section-white border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
            {features.map((f, i) => (
              <motion.div key={f.label} variants={fadeUp} custom={i} className="card-light rounded-xl p-6 flex gap-4 hover:shadow-md transition-shadow">
                <div className="p-2.5 rounded-xl bg-blue-50 shrink-0 self-start"><f.icon className="h-5 w-5 text-blue-600" /></div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{f.label}</h4>
                  <p className="text-slate-600 text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code editor (dark terminal) */}
          <motion.div variants={fadeUp} custom={0} className="rounded-2xl border border-slate-700 overflow-hidden mb-12 shadow-lg" dir="ltr">
            <div className="flex border-b border-slate-700 bg-slate-800 overflow-x-auto">
              {Object.keys(snippets).map((lang) => (
                <button key={lang} onClick={() => setActiveSnippet(lang)}
                  className={`px-5 md:px-6 py-3.5 text-sm font-medium border-r border-slate-700 transition-all whitespace-nowrap ${
                    activeSnippet === lang ? "bg-blue-600/30 text-blue-300" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"}`}>
                  {lang}
                </button>
              ))}
              <div className="ml-auto flex items-center pr-4"><CopyButton text={snippets[activeSnippet].code} /></div>
            </div>
            <div className="bg-slate-900 p-5 md:p-6">
              <pre className="text-xs md:text-sm text-slate-200 font-mono overflow-x-auto leading-relaxed whitespace-pre"><code>{snippets[activeSnippet].code}</code></pre>
            </div>
          </motion.div>

          {/* Endpoints */}
          <motion.div variants={fadeUp} custom={1}>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">{tr("API Endpoints", "نقاط الـ API")}</h2>
            <div className="space-y-2">
              {endpoints.map((ep) => (
                <motion.div key={ep.path} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-xl card-light hover:shadow-sm hover:border-blue-200 transition-all" dir="ltr">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border font-mono shrink-0 ${methodColor[ep.method]}`}>{ep.method}</span>
                  <code className="text-blue-700 font-mono text-sm">{ep.path}</code>
                  <span className="text-slate-500 text-sm hidden md:block ml-auto" dir="auto">{endpointDesc[ep.key]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SDK & AUTH */}
      <Section className="section-offwhite border-b border-slate-100">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="card-light rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-50"><Terminal className="h-5 w-5 text-blue-600" /></div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{tr("SDK Installation", "تثبيت حزمة التطوير")}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">Python</p>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-emerald-400 border border-slate-700" dir="ltr">pip install deepwords</div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">Node.js</p>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-emerald-400 border border-slate-700" dir="ltr">npm install @deepwords/sdk</div>
                </div>
              </div>
            </div>

            <div className="card-light rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-6">{tr("Authentication", "المصادقة")}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{tr("All API requests require a Bearer token. Generate your API key from the enterprise dashboard after account approval.", "تتطلّب كل طلبات API رمز Bearer. أنشئ مفتاح API من لوحة المؤسسات بعد اعتماد الحساب.")}</p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-700 mb-4" dir="ltr">Authorization: Bearer dw_sk_XXXXXXXXX</div>
              <p className="text-slate-500 text-xs">{tr("Keys are scoped per project. Rotate them in the dashboard at any time.", "المفاتيح محدّدة لكل مشروع. يمكنك تدويرها من اللوحة في أي وقت.")}</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="section-lightblue">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">{tr("Ready to integrate?", "جاهز للتكامل؟")}</h2>
            <p className="text-slate-600 mb-8">{tr("Apply for API access — enterprise accounts are approved within 2 business days.", "تقدّم للحصول على وصول API — تُعتمد حسابات المؤسسات خلال يومَي عمل.")}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
              {tr("Apply for API Access", "تقدّم للوصول إلى API")}
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
