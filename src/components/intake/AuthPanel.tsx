"use client";

import { useState } from "react";
import { X, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AuthText = Record<string, string>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function AuthPanel({
  mode,
  defaultEmail,
  t,
  onClose,
  onAuthed,
}: {
  mode: "save" | "login";
  defaultEmail: string;
  t: AuthText;
  onClose: () => void;
  onAuthed: (email: string) => Promise<void> | void;
}) {
  const [stage, setStage] = useState<"email" | "code" | "done">("email");
  const [email, setEmail] = useState(defaultEmail || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendCode() {
    const e = email.trim();
    if (!EMAIL_RE.test(e)) {
      setError(t.error);
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: e,
      options: { shouldCreateUser: true },
    });
    setLoading(false);
    if (err) {
      setError(err.message || t.error);
      return;
    }
    setStage("code");
  }

  async function verify() {
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    if (err) {
      setLoading(false);
      setError(err.message || t.error);
      return;
    }
    await onAuthed(email.trim());
    setLoading(false);
    if (mode === "save") setStage("done");
    else onClose();
  }

  return (
    <div className="intake-modal-overlay" onClick={onClose}>
      <div className="intake-modal form-360" onClick={(e) => e.stopPropagation()}>
        <button className="intake-modal-close" onClick={onClose} aria-label={t.close}>
          <X className="w-5 h-5" />
        </button>

        {stage === "done" ? (
          <div className="intake-modal-done">
            <div className="intake-done-icon">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3>{t.savedTitle}</h3>
            <p>{t.savedBody}</p>
            <button className="intake-btn intake-btn-primary" onClick={onClose}>
              {t.close}
            </button>
          </div>
        ) : (
          <>
            <div className="intake-modal-icon">
              <Mail className="w-6 h-6" />
            </div>
            <h3>{mode === "save" ? t.saveTitle : t.loginTitle}</h3>
            <p className="intake-modal-body">{mode === "save" ? t.saveBody : t.loginBody}</p>

            {stage === "email" ? (
              <>
                <input
                  className="form-input"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCode()}
                />
                <button
                  className="intake-btn intake-btn-primary intake-modal-btn"
                  onClick={sendCode}
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? t.sending : t.sendCode}
                </button>
              </>
            ) : (
              <>
                <p className="intake-help">
                  {t.codeSent} <strong>{email}</strong>
                </p>
                <input
                  className="form-input"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder={t.codePlaceholder}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && verify()}
                />
                <button
                  className="intake-btn intake-btn-primary intake-modal-btn"
                  onClick={verify}
                  disabled={loading || code.trim().length < 6}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? t.verifying : t.verify}
                </button>
              </>
            )}

            {error && <p className="intake-help intake-error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
