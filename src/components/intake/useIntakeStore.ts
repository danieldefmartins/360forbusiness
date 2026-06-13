"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Answers } from "./steps.config";

/* Hydrating client state from localStorage requires setState inside a mount
   effect — the persisted values don't exist during the static prerender. */
/* eslint-disable react-hooks/set-state-in-effect */

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const LS_KEY = "tfb_intake_v1";

interface Persisted {
  id: string;
  answers: Answers;
  stepIndex: number;
}

function loadLocal(): Persisted | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

/** Map the flexible answer bag to the promoted top-level columns (for querying + GHL). */
function promotedColumns(a: Answers) {
  return {
    category: (a.category as string) ?? null,
    has_business_name:
      typeof a.has_business_name === "boolean" ? (a.has_business_name as boolean) : null,
    business_name: (a.business_name as string) ?? null,
    contact_name: (a.contact_name as string) ?? (a.owner_name as string) ?? null,
    email: (a.email as string) ?? (a.business_email as string) ?? null,
    phone: (a.phone as string) ?? null,
  };
}

export interface IntakeStore {
  id: string | null;
  answers: Answers;
  stepIndex: number;
  saveStatus: SaveStatus;
  hydrated: boolean;
  /** true when prior progress was found in localStorage on load */
  hasSavedProgress: boolean;
  setField: (field: string, value: unknown) => void;
  goToStep: (step: number) => void;
  /** Persist current answers to Supabase (called on Next/Back). */
  commit: (status?: "in_progress" | "completed") => Promise<boolean>;
  /** Clear local + remote progress markers and restart. */
  reset: () => void;
}

export function useIntakeStore(locale: string): IntakeStore {
  const [id, setId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [hydrated, setHydrated] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Keep latest values for use inside async callbacks without stale closures.
  // Synced in an effect (not during render) to satisfy the react-hooks rules.
  const answersRef = useRef<Answers>(answers);
  const stepRef = useRef(stepIndex);
  useEffect(() => {
    answersRef.current = answers;
    stepRef.current = stepIndex;
  }, [answers, stepIndex]);

  // Hydrate from localStorage on mount (browser-only — window/localStorage are
  // unavailable during the static prerender, per Next static-export docs).
  // setState-in-effect is the intended pattern here: the persisted values can
  // only be read in the browser, after the prerendered HTML hydrates.
  useEffect(() => {
    const existing = loadLocal();
    if (existing?.id) {
      setId(existing.id);
      setAnswers(existing.answers ?? {});
      setStepIndex(existing.stepIndex ?? 0);
      setHasSavedProgress(Object.keys(existing.answers ?? {}).length > 0);
    } else {
      setId(
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      );
    }
    setHydrated(true);
  }, []);

  // Instant local persistence on every change (so nothing is ever lost on refresh).
  useEffect(() => {
    if (!hydrated || !id) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ id, answers, stepIndex }));
    } catch {
      /* storage may be unavailable (private mode) — remote save still covers us */
    }
  }, [answers, stepIndex, hydrated, id]);

  const commit = useCallback(
    async (status: "in_progress" | "completed" = "in_progress") => {
      if (!id) return false;
      const a = answersRef.current;
      setSaveStatus("saving");
      const row: Record<string, unknown> = {
        id,
        locale,
        current_step: stepRef.current,
        status,
        answers: a,
        ...promotedColumns(a),
      };
      if (status === "completed") row.completed_at = new Date().toISOString();
      // Persist via the save_intake RPC (SECURITY DEFINER) — a direct table upsert
      // with the publishable anon key is blocked by RLS/role handling on this project.
      const { error } = await supabase.rpc("save_intake", { p_row: row });
      setSaveStatus(error ? "error" : "saved");
      return !error;
    },
    [id, locale],
  );

  const setField = useCallback((field: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setStepIndex(step);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(LS_KEY);
    } catch {
      /* ignore */
    }
    setAnswers({});
    setStepIndex(0);
    setHasSavedProgress(false);
    setSaveStatus("idle");
    setId(
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    );
  }, []);

  return {
    id,
    answers,
    stepIndex,
    saveStatus,
    hydrated,
    hasSavedProgress,
    setField,
    goToStep,
    commit,
    reset,
  };
}
