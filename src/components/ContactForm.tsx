"use client";

import { useState } from "react";
import { Send, Shield } from "lucide-react";
import type { Dictionary } from "@/i18n/en";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);
  const f = dict.contactPage.form;

  if (submitted) {
    return (
      <div className="form-360 text-center py-16">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Thank you!
        </h3>
        <p className="text-slate-500">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form-360"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0">
        <div className="form-group">
          <label className="form-label">{f.name}</label>
          <input
            type="text"
            className="form-input"
            placeholder={f.namePlaceholder}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">{f.email}</label>
          <input
            type="email"
            className="form-input"
            placeholder={f.emailPlaceholder}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">{f.phone}</label>
          <input
            type="tel"
            className="form-input"
            placeholder={f.phonePlaceholder}
          />
        </div>
        <div className="form-group">
          <label className="form-label">{f.company}</label>
          <input
            type="text"
            className="form-input"
            placeholder={f.companyPlaceholder}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{f.service}</label>
        <select className="form-select" required>
          {f.serviceOptions.map((opt, i) => (
            <option key={i} value={i === 0 ? "" : opt} disabled={i === 0}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">{f.message}</label>
        <textarea
          className="form-textarea"
          placeholder={f.messagePlaceholder}
          rows={5}
        />
      </div>

      <button type="submit" className="form-submit">
        {f.submit}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-xs">
        <Shield className="w-3.5 h-3.5" />
        {f.privacy}
      </div>
    </form>
  );
}
