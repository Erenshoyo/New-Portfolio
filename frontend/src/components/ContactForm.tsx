"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  email: string;
  phone: string;
  whatsapp?: string;
}

export default function ContactForm({
  email,
  phone,
  whatsapp,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://new-portfolio-oqtj.onrender.com"}/api/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Contact Cards - Left Side */}
      <div className="lg:col-span-2 space-y-4">
        {/* Email Card */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 p-5 rounded-2xl glass hover:border-brand-primary/30 transition-all duration-300 group shadow-md"
          >
            <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                Email Me
              </p>
              <p className="text-sm font-medium text-base-content group-hover:text-brand-primary transition-colors">
                {email}
              </p>
            </div>
          </a>
        )}

        {/* Phone Card */}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-4 p-5 rounded-2xl glass hover:border-brand-secondary/30 transition-all duration-300 group shadow-md"
          >
            <div className="p-3 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                Call Me
              </p>
              <p className="text-sm font-medium text-base-content group-hover:text-brand-secondary transition-colors">
                {phone}
              </p>
            </div>
          </a>
        )}

        {/* WhatsApp Card */}
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl glass hover:border-green-500/30 transition-all duration-300 group shadow-md"
          >
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-650 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                WhatsApp
              </p>
              <p className="text-sm font-medium text-base-content group-hover:text-green-550 transition-colors">
                {whatsapp}
              </p>
            </div>
          </a>
        )}
      </div>

      {/* Message Form - Right Side */}
      <div className="lg:col-span-3">
        <form
          onSubmit={handleSubmit}
          className="glass border-base-content/5 rounded-3xl p-6 md:p-8 space-y-5 shadow-lg relative"
        >
          {success && (
            <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-base-content mb-1">
                Message Sent Successfully!
              </h3>
              <p className="text-base-content/60 text-sm max-w-xs">
                Thank you for reaching out. I will get back to you as soon as
                possible.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-base-content/60 uppercase"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-base-200/50 border border-base-content/10 text-base-content placeholder-base-content/40 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-base-content/60 uppercase"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3 rounded-xl bg-base-200/50 border border-base-content/10 text-base-content placeholder-base-content/40 focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-xs font-semibold text-base-content/60 uppercase"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Collaboration Opportunity"
              className="w-full px-4 py-3 rounded-xl bg-base-200/50 border border-base-content/10 text-base-content placeholder-base-content/40 focus:outline-none focus:border-brand-primary transition-colors text-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-xs font-semibold text-base-content/60 uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Hi Tauhid, let's connect..."
              className="w-full px-4 py-3 rounded-xl bg-base-200/50 border border-base-content/10 text-base-content placeholder-base-content/40 focus:outline-none focus:border-brand-primary transition-colors text-sm resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <span className="font-semibold">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span>Sending Message...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
