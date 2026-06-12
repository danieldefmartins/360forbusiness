"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Sparkles,
  Building2,
  User,
  Mail,
  MapPin,
  Globe,
  ImagePlus,
  Layers,
  Target,
  Gift,
  Rocket,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Hammer,
  UtensilsCrossed,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  Home,
  HeartHandshake,
  PartyPopper,
  Shapes,
  PartyPopper as Celebrate,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getIntakeContent } from "./content";
import { STEPS, visibleFields, isStepComplete, type FieldConfig } from "./steps.config";
import { useIntakeStore } from "./useIntakeStore";
import FieldRenderer from "./FieldRenderer";

const STEP_ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  Sparkles,
  Building2,
  User,
  Mail,
  MapPin,
  Globe,
  ImagePlus,
  Layers,
  Target,
  Gift,
  Rocket,
  CheckCircle2,
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  home_construction: Hammer,
  food_restaurant: UtensilsCrossed,
  retail_ecom: ShoppingBag,
  professional_services: Briefcase,
  health_wellness: HeartPulse,
  real_estate: Home,
  faith_nonprofit: HeartHandshake,
  events: PartyPopper,
  other: Shapes,
};

export default function IntakeWizard({ locale }: { locale: Locale }) {
  const c = getIntakeContent(locale);
  const store = useIntakeStore(locale);
  const { answers, stepIndex, setField, goToStep, commit, saveStatus, hydrated } = store;

  const [showResume, setShowResume] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const step = STEPS[stepIndex];
  const stepText = c.steps[stepIndex];
  const StepIcon = STEP_ICONS[step.icon] ?? Sparkles;
  const complete = isStepComplete(step, answers);
  const isLast = stepIndex === STEPS.length - 1;
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  async function goNext() {
    await commit("in_progress");
    if (!isLast) goToStep(stepIndex + 1);
  }

  function goBack() {
    if (stepIndex > 0) goToStep(stepIndex - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    const ok = await commit("completed");
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Avoid hydration flash: render a stable shell until localStorage has been read.
  if (!hydrated) {
    return (
      <div className="intake-shell form-360">
        <div className="intake-loading">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="intake-shell form-360">
        <div className="intake-done">
          <div className="intake-done-icon">
            <Celebrate className="w-9 h-9" />
          </div>
          <h2>{c.done.title}</h2>
          <p>{c.done.body}</p>
          <Link href={`/${locale}`} className="intake-btn intake-btn-primary">
            {c.done.cta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="intake-shell form-360">
      {/* Resume banner */}
      {showResume && store.hasSavedProgress && (
        <div className="intake-resume">
          <div>
            <strong>{c.nav.resumeTitle}</strong>
            <span>{c.nav.resumeBody}</span>
          </div>
          <div className="intake-resume-actions">
            <button className="intake-btn intake-btn-ghost" onClick={() => { store.reset(); setShowResume(false); }}>
              {c.nav.resumeNo}
            </button>
            <button className="intake-btn intake-btn-primary" onClick={() => setShowResume(false)}>
              {c.nav.resumeYes}
            </button>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="intake-progress">
        <div className="intake-progress-meta">
          <span>
            {c.nav.step} {stepIndex + 1} {c.nav.of} {STEPS.length}
          </span>
          <SaveBadge status={saveStatus} c={c} />
        </div>
        <div className="intake-progress-track">
          <div className="intake-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step header */}
      <div className="intake-step-head">
        <div className="intake-step-icon">
          <StepIcon className="w-6 h-6" />
        </div>
        <div>
          <h2>{stepText.title}</h2>
          {stepText.subtitle && <p>{stepText.subtitle}</p>}
        </div>
      </div>

      {/* Step body */}
      <div className="intake-card">
        {step.kind === "category" ? (
          <CategoryGrid c={c} selected={answers.category as string} onSelect={(id) => { setField("category", id); }} />
        ) : step.kind === "review" ? (
          <Review c={c} answers={answers} onEdit={(i) => goToStep(i)} consent={answers.consent === true} onConsent={(v) => setField("consent", v)} />
        ) : (
          <>
            {step.id === "package" && (
              <div className="intake-package-intro">
                <h3>{c.package.introTitle}</h3>
                <p>{c.package.introBody}</p>
                <ul>
                  {c.package.includes.map((item) => (
                    <li key={item}>
                      <Check className="w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <StepFields step={step} answers={answers} setField={setField} c={c} submissionId={store.id} />
          </>
        )}
      </div>

      {/* Nav */}
      <div className="intake-nav">
        <button
          className="intake-btn intake-btn-ghost"
          onClick={goBack}
          disabled={stepIndex === 0}
          style={{ visibility: stepIndex === 0 ? "hidden" : "visible" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {c.nav.back}
        </button>

        {isLast ? (
          <button className="intake-btn intake-btn-primary" onClick={handleSubmit} disabled={!complete || submitting}>
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
            {c.nav.submit}
          </button>
        ) : (
          <button className="intake-btn intake-btn-primary" onClick={goNext} disabled={!complete}>
            {c.nav.next}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function SaveBadge({ status, c }: { status: string; c: ReturnType<typeof getIntakeContent> }) {
  if (status === "saving")
    return (
      <span className="intake-save">
        <Loader2 className="w-3.5 h-3.5 animate-spin" /> {c.nav.saving}
      </span>
    );
  if (status === "saved")
    return (
      <span className="intake-save intake-save-ok">
        <Check className="w-3.5 h-3.5" /> {c.nav.saved}
      </span>
    );
  if (status === "error")
    return <span className="intake-save intake-save-err">{c.nav.saveError}</span>;
  return null;
}

function CategoryGrid({
  c,
  selected,
  onSelect,
}: {
  c: ReturnType<typeof getIntakeContent>;
  selected?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="intake-cats">
      {c.categories.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.id] ?? Shapes;
        return (
          <button
            key={cat.id}
            type="button"
            className={`intake-cat ${selected === cat.id ? "intake-cat-on" : ""}`}
            onClick={() => onSelect(cat.id)}
          >
            <Icon className="w-7 h-7" />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StepFields({
  step,
  answers,
  setField,
  c,
  submissionId,
}: {
  step: (typeof STEPS)[number];
  answers: Record<string, unknown>;
  setField: (f: string, v: unknown) => void;
  c: ReturnType<typeof getIntakeContent>;
  submissionId: string | null;
}) {
  const fields = visibleFields(step, answers);
  return (
    <div className="intake-fields">
      {fields.map((field) => {
        const text = c.fields[field.id as keyof typeof c.fields];
        if (!text) return null;
        return (
          <div key={field.id} className={field.half ? "intake-half" : "intake-full"}>
            <FieldRenderer
              field={field}
              text={text}
              value={answers[field.id]}
              onChange={(v) => setField(field.id, v)}
              submissionId={submissionId}
              yesLabel={c.nav.yes}
              noLabel={c.nav.no}
              optionalLabel={c.nav.optional}
              selectHint={c.nav.selectHint}
              addPersonLabel={c.package.addPerson}
            />
          </div>
        );
      })}
    </div>
  );
}

function Review({
  c,
  answers,
  onEdit,
  consent,
  onConsent,
}: {
  c: ReturnType<typeof getIntakeContent>;
  answers: Record<string, unknown>;
  onEdit: (stepIndex: number) => void;
  consent: boolean;
  onConsent: (v: boolean) => void;
}) {
  const rows = useMemo(() => buildReviewRows(c, answers), [c, answers]);
  return (
    <div className="intake-review">
      {rows.map((group) => (
        <div className="intake-review-group" key={group.stepIndex}>
          <div className="intake-review-head">
            <h4>{group.title}</h4>
            <button className="intake-review-edit" onClick={() => onEdit(group.stepIndex)}>
              {c.review.edit}
            </button>
          </div>
          <dl>
            {group.items.map((it) => (
              <div key={it.label}>
                <dt>{it.label}</dt>
                <dd>{it.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <label className="intake-consent">
        <input type="checkbox" checked={consent} onChange={(e) => onConsent(e.target.checked)} />
        <span>{c.review.consent}</span>
      </label>
    </div>
  );
}

interface ReviewItem {
  label: string;
  value: string;
}
interface ReviewGroup {
  stepIndex: number;
  title: string;
  items: ReviewItem[];
}

function buildReviewRows(
  c: ReturnType<typeof getIntakeContent>,
  answers: Record<string, unknown>,
): ReviewGroup[] {
  const groups: ReviewGroup[] = [];

  STEPS.forEach((step, i) => {
    if (step.kind === "review") return;

    if (step.kind === "category") {
      const cat = c.categories.find((x) => x.id === answers.category);
      if (cat) groups.push({ stepIndex: i, title: c.steps[i].title, items: [{ label: c.steps[i].title, value: cat.label }] });
      return;
    }

    const items: ReviewItem[] = [];
    visibleFields(step, answers).forEach((field) => {
      const v = answers[field.id];
      const formatted = formatValue(field, v, c);
      if (formatted) {
        const text = c.fields[field.id as keyof typeof c.fields];
        items.push({ label: text?.label ?? field.id, value: formatted });
      }
    });
    if (items.length) groups.push({ stepIndex: i, title: c.steps[i].title, items });
  });

  return groups;
}

function formatValue(
  field: FieldConfig,
  value: unknown,
  c: ReturnType<typeof getIntakeContent>,
): string {
  if (value === null || value === undefined || value === "") return "";
  if (field.type === "yesno") return value === true ? c.nav.yes : value === false ? c.nav.no : "";
  if (field.type === "file") {
    const files = value as { name: string }[];
    return Array.isArray(files) && files.length ? files.map((f) => f.name).join(", ") : "";
  }
  if (field.type === "people") {
    const people = value as { name?: string; title?: string }[];
    return Array.isArray(people)
      ? people
          .filter((p) => p.name || p.title)
          .map((p) => [p.name, p.title].filter(Boolean).join(" — "))
          .join("; ")
      : "";
  }
  if (Array.isArray(value)) return (value as string[]).join(", ");
  return String(value);
}
