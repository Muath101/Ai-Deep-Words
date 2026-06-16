import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Building2, Globe2, Code2, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { fadeUp, Section } from "@/lib/ui";

export default function Contact() {
  const { tr } = useLang();

  const inquiryTypes = [
    { icon: Building2, key: "enterprise",  label: tr("Enterprise Inquiry", "استفسار مؤسسي"),   desc: tr("Large-scale dataset programs for AI companies", "برامج بيانات واسعة لشركات الذكاء") },
    { icon: Globe2,    key: "government",   label: tr("Government Inquiry", "استفسار حكومي"),    desc: tr("Public sector AI infrastructure programs", "برامج بنية ذكاء للقطاع العام") },
    { icon: Users,     key: "partnership",  label: tr("Partnership Inquiry", "استفسار شراكة"),   desc: tr("Strategic partnerships and integrations", "شراكات استراتيجية وتكاملات") },
    { icon: Code2,     key: "developer",    label: tr("Developer Inquiry", "استفسار مطوّر"),     desc: tr("API access, SDKs, and technical questions", "وصول API وحِزم تطوير وأسئلة تقنية") },
  ];

  const [selectedType, setSelectedType] = useState(inquiryTypes[0].label);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "enterprise-inquiry",
        fullName: form.name,
        email: form.email,
        organization: form.company,
        inquiryType: selectedType,
        message: form.message,
      }),
    })
      .then(() => setSubmitted(true))
      .catch((error) => {
        console.error("Form submission failed:", error);
        setSubmitted(true);
      });
  };

  return (
    <div>
      {/* HERO */}
      <section className="section-lightblue pt-28 pb-14 md:py-36 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-4 py-1.5 rounded-full border border-blue-300 bg-blue-100 text-blue-700 text-xs uppercase tracking-widest font-medium mb-6 inline-block">{tr("Contact", "تواصل")}</span>
          <h1 className="font-display text-3xl md:text-6xl font-bold text-slate-900 mb-5">{tr("Start a Conversation", "ابدأ محادثة")}</h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {tr("Tell us what you're building. We'll identify the right program and respond within one business day.", "أخبرنا بما تبنيه. سنحدّد البرنامج المناسب ونردّ خلال يوم عمل واحد.")}
          </p>
        </motion.div>
      </section>

      {/* FORM */}
      <Section className="section-white">
        <div className="container mx-auto px-5 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Inquiry type selector */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div variants={fadeUp} custom={0}>
                <h2 className="font-display text-base font-semibold text-slate-500 uppercase tracking-widest mb-4">{tr("Inquiry Type", "نوع الاستفسار")}</h2>
                <div className="space-y-2">
                  {inquiryTypes.map((type) => (
                    <button key={type.key} onClick={() => setSelectedType(type.label)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-start active:scale-[0.99] ${
                        selectedType === type.label ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>
                      <type.icon className={`h-5 w-5 mt-0.5 shrink-0 ${selectedType === type.label ? "text-blue-200" : "text-blue-500"}`} />
                      <div>
                        <div className={`font-semibold text-sm mb-0.5 ${selectedType === type.label ? "text-white" : "text-slate-800"}`}>{type.label}</div>
                        <div className={`text-xs ${selectedType === type.label ? "text-blue-100" : "text-slate-500"}`}>{type.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="card-light rounded-xl p-5 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-50"><Mail className="h-4 w-4 text-blue-600" /></div>
                  <span className="font-semibold text-slate-800 text-sm">{tr("Direct Email", "بريد مباشر")}</span>
                </div>
                <a href="mailto:partner@aidpwords.com" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">partner@aidpwords.com</a>
                <p className="text-slate-500 text-xs mt-1.5">{tr("We respond within one business day.", "نردّ خلال يوم عمل واحد.")}</p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div variants={fadeUp} custom={1}>
                {submitted ? (
                  <div className="card-light rounded-2xl p-10 md:p-12 border border-emerald-200 bg-emerald-50 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">{tr("Message Received", "تم استلام رسالتك")}</h3>
                    <p className="text-slate-600">{tr("Thank you for reaching out. Our team will respond within one business day.", "شكراً لتواصلك. سيردّ فريقنا خلال يوم عمل واحد.")}</p>
                  </div>
                ) : (
                  <form
                    name="enterprise-inquiry"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="card-light rounded-2xl p-6 md:p-8 space-y-5"
                  >
                    {/* Netlify form metadata */}
                    <input type="hidden" name="form-name" value="enterprise-inquiry" />
                    <input type="hidden" name="inquiryType" value={selectedType} />
                    <p className="hidden">
                      <label>{tr("Don't fill this out if you're human:", "لا تملأ هذا الحقل:")} <input name="bot-field" /></label>
                    </p>

                    <div className="text-xs text-blue-600 font-semibold uppercase tracking-widest pb-2 border-b border-slate-100">{selectedType}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{tr("Full Name", "الاسم الكامل")}</label>
                        <input required type="text" name="fullName" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                          placeholder={tr("Your name", "اسمك")} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{tr("Work Email", "البريد المهني")}</label>
                        <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                          placeholder="you@company.com" dir="ltr" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{tr("Organization", "المؤسسة")}</label>
                      <input type="text" name="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        placeholder={tr("Company or institution", "الشركة أو المؤسسة")} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{tr("What Are You Building?", "ماذا تبني؟")}</label>
                      <textarea required name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                        placeholder={tr("Describe your project, the Arabic AI capability you need, estimated scale, and timeline...", "صِف مشروعك، والقدرة العربية التي تحتاجها، والحجم المتوقّع، والجدول الزمني...")} />
                    </div>

                    <button type="submit" className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.99]">
                      {tr("Send Message", "إرسال الرسالة")}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
