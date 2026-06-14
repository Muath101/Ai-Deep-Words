import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, BookOpen, Code2, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CodeBlock = ({ children, color = "text-blue-400" }: { children: string; color?: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm border border-slate-700 overflow-x-auto" dir="ltr">
    <code className={color}>{children}</code>
  </div>
);

export default function Docs() {
  const { tr } = useLang();
  const [activeSection, setActiveSection] = useState("Introduction");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { section: tr("Getting Started", "البدء"), items: [
      { key: "Introduction",  label: tr("Introduction", "مقدمة") },
      { key: "Authentication", label: tr("Authentication", "المصادقة") },
      { key: "Quick Start",   label: tr("Quick Start", "البدء السريع") },
      { key: "Rate Limits",   label: tr("Rate Limits", "حدود المعدل") },
    ]},
    { section: tr("Datasets API", "واجهة البيانات"), items: [
      { key: "List Datasets",    label: tr("List Datasets", "عرض البيانات") },
      { key: "Get Dataset",      label: tr("Get Dataset", "جلب مجموعة") },
      { key: "Stream Utterances", label: tr("Stream Utterances", "بثّ العبارات") },
      { key: "Export Data",      label: tr("Export Data", "تصدير البيانات") },
    ]},
    { section: tr("Programs API", "واجهة البرامج"), items: [
      { key: "Create Program", label: tr("Create Program", "إنشاء برنامج") },
      { key: "Get Status",     label: tr("Get Status", "جلب الحالة") },
      { key: "Update Config",  label: tr("Update Config", "تحديث الإعداد") },
      { key: "Cancel Program", label: tr("Cancel Program", "إلغاء برنامج") },
    ]},
    { section: tr("SDKs", "حِزم التطوير"), items: [
      { key: "Python SDK",      label: tr("Python SDK", "حزمة Python") },
      { key: "Node.js SDK",     label: tr("Node.js SDK", "حزمة Node.js") },
      { key: "TypeScript Types", label: tr("TypeScript Types", "أنواع TypeScript") },
    ]},
    { section: tr("Webhooks", "Webhooks"), items: [
      { key: "Overview",   label: tr("Overview", "نظرة عامة") },
      { key: "Events",     label: tr("Events", "الأحداث") },
      { key: "Signatures", label: tr("Signatures", "التواقيع") },
      { key: "Retry Policy", label: tr("Retry Policy", "سياسة الإعادة") },
    ]},
    { section: tr("Guides", "الأدلة"), items: [
      { key: "Building ASR Pipelines", label: tr("Building ASR Pipelines", "بناء خطوط ASR") },
      { key: "Medical NLP Setup",      label: tr("Medical NLP Setup", "إعداد المعالجة الطبية") },
      { key: "Dialect Classification", label: tr("Dialect Classification", "تصنيف اللهجات") },
      { key: "HuggingFace Integration", label: tr("HuggingFace Integration", "تكامل HuggingFace") },
    ]},
  ];

  const docs: Record<string, { title: string; content: React.ReactNode }> = {
    Introduction: {
      title: tr("Introduction to AI Deep Words API", "مقدمة إلى واجهة AI Deep Words"),
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>{tr("The AI Deep Words API gives your team programmatic access to the most comprehensive Arabic speech and NLP dataset infrastructure available. Whether you're building Arabic ASR models, training LLMs, or deploying dialect-aware NLP systems, our API provides the data layer your pipeline needs.",
                 "تمنح واجهة AI Deep Words فريقك وصولاً برمجياً لأشمل بنية بيانات كلام ومعالجة لغة عربية متاحة. سواء كنت تبني نماذج تعرّف على الكلام العربي أو تدرّب نماذج لغوية كبيرة أو تنشر أنظمة معالجة واعية باللهجات، توفّر واجهتنا طبقة البيانات التي يحتاجها خطّك.")}</p>
          <h3 className="font-display text-lg font-semibold text-slate-900 mt-8">{tr("Base URL", "الرابط الأساسي")}</h3>
          <CodeBlock color="text-blue-400">https://api.deepwords.ai/v1</CodeBlock>
          <h3 className="font-display text-lg font-semibold text-slate-900">{tr("Core Concepts", "المفاهيم الأساسية")}</h3>
          <ul className="space-y-3 list-none">
            {[
              ["Datasets",   tr("Pre-built Arabic linguistic datasets ready for immediate download or streaming.", "بيانات لغوية عربية جاهزة للتحميل أو البثّ الفوري.")],
              ["Utterances", tr("Individual labeled audio or text samples within a dataset, streamable via API.", "عيّنات صوت أو نص موسومة فردية ضمن مجموعة، قابلة للبثّ عبر الواجهة.")],
              ["Programs",   tr("Custom dataset collection and annotation programs scoped to your specifications.", "برامج جمع ووسم بيانات مخصّصة وفق مواصفاتك.")],
              ["Dialects",   tr("Standardized dialect codes for filtering and routing Arabic data by regional variety.", "رموز لهجات معيارية لتصفية وتوجيه البيانات العربية حسب التنوّع الإقليمي.")],
            ].map(([term, def]) => (
              <li key={term} className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <span className="text-blue-700 font-mono text-sm font-bold shrink-0 mt-0.5" dir="ltr">{term}</span>
                <span className="text-slate-600 text-sm">{def}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    Authentication: {
      title: tr("Authentication", "المصادقة"),
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>{tr("All API requests require a bearer token in the Authorization header. API keys are project-scoped and can be rotated from the enterprise dashboard.",
                 "تتطلّب كل طلبات الواجهة رمز bearer في ترويسة Authorization. المفاتيح محدّدة لكل مشروع ويمكن تدويرها من لوحة المؤسسات.")}</p>
          <h3 className="font-display text-lg font-semibold text-slate-900">{tr("Request Header", "ترويسة الطلب")}</h3>
          <CodeBlock color="text-emerald-400">Authorization: Bearer dw_sk_XXXXXXXXXXXXXXXX</CodeBlock>
          <h3 className="font-display text-lg font-semibold text-slate-900">{tr("Key Scopes", "نطاقات المفتاح")}</h3>
          <div className="space-y-3">
            {[
              { scope: "read:datasets",     desc: tr("Read dataset metadata and utterance listings", "قراءة البيانات الوصفية وقوائم العبارات") },
              { scope: "stream:utterances", desc: tr("Stream raw audio and annotated text", "بثّ الصوت الخام والنص الموسوم") },
              { scope: "write:programs",    desc: tr("Create and manage custom dataset programs", "إنشاء وإدارة برامج البيانات المخصّصة") },
              { scope: "admin",             desc: tr("Full account and billing access", "وصول كامل للحساب والفوترة") },
            ].map((s) => (
              <div key={s.scope} className="flex gap-4 items-start p-3 rounded-lg bg-slate-50 border border-slate-200">
                <code className="text-blue-700 font-mono text-xs font-bold shrink-0 mt-0.5 bg-blue-50 px-2 py-0.5 rounded border border-blue-200" dir="ltr">{s.scope}</code>
                <span className="text-slate-600 text-sm">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    "Quick Start": {
      title: tr("Quick Start", "البدء السريع"),
      content: (
        <div className="space-y-6">
          <p className="text-slate-700">{tr("Get your first Arabic utterances in under 5 minutes.", "احصل على أولى عباراتك العربية في أقل من 5 دقائق.")}</p>
          {[
            { step: "1", label: tr("Install the SDK", "ثبّت حزمة التطوير"),       code: "pip install deepwords" },
            { step: "2", label: tr("Initialize the client", "هيّئ العميل"),       code: `from deepwords import Client\nclient = Client(api_key="dw_sk_your_key")` },
            { step: "3", label: tr("Fetch a dataset", "اجلب مجموعة بيانات"),       code: `dataset = client.datasets.get("ADW-VOICE-001")\nprint(dataset.stats)` },
            { step: "4", label: tr("Stream utterances", "ابثّ العبارات"),         code: `for u in client.utterances.stream(dataset_id="ADW-VOICE-001"):\n    print(u.transcript)` },
          ].map((s) => (
            <div key={s.step} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold shrink-0">{s.step}</span>
                <span className="text-sm font-semibold text-slate-800">{s.label}</span>
              </div>
              <div className="ms-9"><CodeBlock color="text-slate-200">{s.code}</CodeBlock></div>
            </div>
          ))}
        </div>
      ),
    },
  };

  const activeDoc = docs[activeSection] || docs["Introduction"];

  const SidebarContent = ({ onSelect }: { onSelect?: () => void }) => (
    <nav className="space-y-5">
      {navItems.map((group) => (
        <div key={group.section}>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-2">{group.section}</p>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.key}>
                <button onClick={() => { setActiveSection(item.key); onSelect?.(); }}
                  className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    activeSection === item.key ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
                  {item.label}
                  {activeSection === item.key && <ChevronRight className="h-3 w-3 text-blue-500 dir-flip" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  const activeLabel = navItems.flatMap((g) => g.items).find((i) => i.key === activeSection)?.label || activeSection;

  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="border-b border-slate-200 bg-white px-4 md:px-6 py-3 sticky top-[56px] md:top-[64px] z-40">
        <div className="container mx-auto flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" aria-label={tr("Open menu", "فتح القائمة")}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="p-1.5 rounded-lg bg-blue-50 hidden md:flex"><BookOpen className="h-4 w-4 text-blue-600" /></div>
          <span className="font-display font-semibold text-slate-900 text-sm md:text-base">{tr("Docs", "التوثيق")}</span>
          <span className="text-slate-300 hidden md:inline">/</span>
          <span className="text-slate-500 text-sm hidden md:inline truncate">{activeLabel}</span>
          <div className="ms-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 max-w-[180px] md:max-w-xs w-full focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={tr("Search...", "بحث...")}
              className="bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none w-full" />
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl p-6 overflow-y-auto lg:hidden" dir="ltr">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50"><BookOpen className="h-4 w-4 text-blue-600" /></div>
                  <span className="font-display font-semibold text-slate-900">{tr("Documentation", "التوثيق")}</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
              </div>
              <SidebarContent onSelect={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 py-8 lg:py-12">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-40"><SidebarContent /></div>
          </aside>

          <main className="flex-1 max-w-3xl">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {docs[activeSection] ? (
                <>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">{activeDoc.title}</h1>
                  <div className="prose max-w-none">{activeDoc.content}</div>
                </>
              ) : (
                <>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">{activeLabel}</h1>
                  <div className="card-light rounded-2xl p-10 md:p-12 text-center">
                    <div className="p-4 rounded-2xl bg-slate-100 inline-flex mb-4"><Code2 className="h-10 w-10 text-slate-400" /></div>
                    <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">{tr("Coming Soon", "قريباً")}</h3>
                    <p className="text-slate-500">{tr("This documentation section is under development. Contact us for early access.", "هذا القسم قيد التطوير. تواصل معنا للوصول المبكر.")}</p>
                  </div>
                </>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
