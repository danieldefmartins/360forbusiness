"use client";

import { useEffect, useRef, useState } from "react";
import { Check, UploadCloud, X, Loader2, Plus } from "lucide-react";
import { supabase, INTAKE_BUCKET } from "@/lib/supabase";
import type { FieldConfig } from "./steps.config";

/* The AreaPicker fetches counties from /api/areas and must setState with the
   result inside an effect — the canonical data-fetching pattern. */
/* eslint-disable react-hooks/set-state-in-effect */

// Stable keys for the business-card people repeater (column labels come from text.options).
const PEOPLE_KEYS = ["name", "title", "phone", "email"] as const;
type Person = Partial<Record<(typeof PEOPLE_KEYS)[number], string>>;

const LOGIN_KEYS = ["platform", "login", "password"] as const;
type LoginRow = Partial<Record<(typeof LOGIN_KEYS)[number], string>>;

export interface FieldText {
  label: string;
  placeholder?: string;
  help?: string;
  options?: string[];
}

interface UploadedFile {
  name: string;
  path: string;
}

interface Props {
  field: FieldConfig;
  text: FieldText;
  value: unknown;
  onChange: (value: unknown) => void;
  submissionId: string | null;
  yesLabel: string;
  noLabel: string;
  optionalLabel: string;
  selectHint: string;
  addPersonLabel: string;
  answers?: Record<string, unknown>;
  radiusOptions?: string[];
  areaText?: { prompt: string; loading: string; add: string; detected: string };
  fileMaxNote?: string;
  addAnotherLabel?: string;
}

export default function FieldRenderer({
  field,
  text,
  value,
  onChange,
  submissionId,
  yesLabel,
  noLabel,
  optionalLabel,
  selectHint,
  addPersonLabel,
  answers,
  radiusOptions,
  areaText,
  fileMaxNote,
  addAnotherLabel,
}: Props) {
  const isMulti = field.type === "multiselect";
  const showHint = isMulti && !text.help;

  return (
    <div className="form-group">
      <label className="form-label">
        {text.label}
        {field.optional && <span className="intake-optional"> · {optionalLabel}</span>}
      </label>

      {renderControl()}

      {text.help && <p className="intake-help">{text.help}</p>}
      {showHint && <p className="intake-help">{selectHint}</p>}
    </div>
  );

  function renderControl() {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            className="form-textarea"
            placeholder={text.placeholder}
            rows={4}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "select":
        return (
          <select
            className="form-select"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>
              {text.placeholder ?? "—"}
            </option>
            {(text.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "multiselect": {
        const selected = Array.isArray(value) ? (value as string[]) : [];
        return (
          <div className="intake-chips">
            {(text.options ?? []).map((opt) => {
              const on = selected.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  className={`intake-chip ${on ? "intake-chip-on" : ""}`}
                  onClick={() =>
                    onChange(
                      on ? selected.filter((s) => s !== opt) : [...selected, opt],
                    )
                  }
                >
                  {on && <Check className="w-4 h-4" />}
                  {opt}
                </button>
              );
            })}
          </div>
        );
      }

      case "yesno":
        return (
          <div className="intake-yesno">
            {[
              { v: true, label: yesLabel },
              { v: false, label: noLabel },
            ].map(({ v, label }) => (
              <button
                type="button"
                key={label}
                className={`intake-toggle ${value === v ? "intake-toggle-on" : ""}`}
                onClick={() => onChange(v)}
              >
                {label}
              </button>
            ))}
          </div>
        );

      case "file":
        return (
          <FileField
            value={Array.isArray(value) ? (value as UploadedFile[]) : []}
            onChange={onChange}
            submissionId={submissionId}
            fieldId={field.id}
            max={field.max}
            maxNote={fileMaxNote}
          />
        );

      case "people":
        return (
          <PeopleField
            value={Array.isArray(value) ? (value as Person[]) : []}
            onChange={onChange}
            columns={text.options ?? ["Name", "Title", "Phone", "Email"]}
            addLabel={addPersonLabel}
          />
        );

      case "list":
        return (
          <ListField
            value={Array.isArray(value) ? (value as string[]) : []}
            onChange={onChange}
            placeholder={text.placeholder ?? ""}
            addLabel={addAnotherLabel ?? "Add another"}
            max={field.max ?? 5}
          />
        );

      case "logins":
        return (
          <LoginsField
            value={Array.isArray(value) ? (value as LoginRow[]) : []}
            onChange={onChange}
            columns={text.options ?? ["Platform", "Email or username", "Password"]}
            addLabel={text.placeholder ?? "Add account"}
          />
        );

      case "colors":
        return (
          <ColorsField
            value={Array.isArray(value) ? (value as string[]) : []}
            onChange={onChange}
            labels={text.options ?? ["Main", "Secondary", "Accent", "Color 4", "Color 5"]}
            addLabel={text.placeholder ?? "Add color"}
          />
        );

      case "areas":
        return (
          <AreaPicker
            value={Array.isArray(value) ? (value as string[]) : []}
            onChange={onChange}
            zip={(answers?.service_zip as string) ?? ""}
            radiusLabel={(answers?.service_radius as string) ?? ""}
            radiusOptions={radiusOptions ?? []}
            t={
              areaText ?? {
                prompt: "Enter your ZIP and radius above to choose areas.",
                loading: "Finding areas…",
                add: "Add another area",
                detected: "Detected",
              }
            }
          />
        );

      default:
        return (
          <input
            type={field.type === "text" ? "text" : field.type}
            className="form-input"
            placeholder={text.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  }
}

function FileField({
  value,
  onChange,
  submissionId,
  fieldId,
  max,
  maxNote,
}: {
  value: UploadedFile[];
  onChange: (v: unknown) => void;
  submissionId: string | null;
  fieldId: string;
  max?: number;
  maxNote?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const atMax = typeof max === "number" && value.length >= max;

  async function handleFiles(files: FileList | null) {
    if (!files || !submissionId) return;
    setUploading(true);
    setError(false);
    const next = [...value];
    for (const file of Array.from(files)) {
      if (typeof max === "number" && next.length >= max) break; // respect the cap
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${submissionId}/${fieldId}/${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage
        .from(INTAKE_BUCKET)
        .upload(path, file, { upsert: true });
      if (upErr) setError(true);
      else next.push({ name: file.name, path });
    }
    onChange(next);
    setUploading(false);
  }

  return (
    <div>
      {atMax ? (
        <p className="intake-help">{maxNote ?? `Maximum ${max} files — use the Google Drive link for more.`}</p>
      ) : (
        <button
          type="button"
          className="intake-dropzone"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6" />
          )}
          <span>{uploading ? "Uploading…" : "Click to upload"}</span>
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </button>
      )}
      {error && <p className="intake-help intake-error">Some files failed to upload.</p>}
      {value.length > 0 && (
        <ul className="intake-filelist">
          {value.map((f, i) => (
            <li key={f.path}>
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PeopleField({
  value,
  onChange,
  columns,
  addLabel,
}: {
  value: Person[];
  onChange: (v: unknown) => void;
  columns: string[];
  addLabel: string;
}) {
  const rows = value.length > 0 ? value : [{}];

  function update(index: number, key: string, val: string) {
    const next = rows.map((p, i) => (i === index ? { ...p, [key]: val } : p));
    onChange(next);
  }

  function addRow() {
    onChange([...rows, {}]);
  }

  function removeRow(index: number) {
    const next = rows.filter((_, i) => i !== index);
    onChange(next);
  }

  return (
    <div className="intake-people">
      {rows.map((person, i) => (
        <div className="intake-person" key={i}>
          <div className="intake-person-grid">
            {PEOPLE_KEYS.map((key, c) => (
              <input
                key={key}
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                className="form-input"
                placeholder={columns[c] ?? key}
                value={person[key] ?? ""}
                onChange={(e) => update(i, key, e.target.value)}
              />
            ))}
          </div>
          {rows.length > 1 && (
            <button
              type="button"
              className="intake-person-remove"
              aria-label="Remove"
              onClick={() => removeRow(i)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button type="button" className="intake-add" onClick={addRow}>
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  );
}

function ListField({
  value,
  onChange,
  placeholder,
  addLabel,
  max,
}: {
  value: string[];
  onChange: (v: unknown) => void;
  placeholder: string;
  addLabel: string;
  max: number;
}) {
  const rows = value.length > 0 ? value : [""];
  function update(i: number, v: string) {
    onChange(rows.map((r, idx) => (idx === i ? v : r)));
  }
  function addRow() {
    if (rows.length < max) onChange([...rows, ""]);
  }
  function removeRow(i: number) {
    onChange(rows.filter((_, idx) => idx !== i));
  }
  return (
    <div className="intake-people">
      {rows.map((v, i) => (
        <div className="intake-person" key={i}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            placeholder={placeholder}
            value={v}
            onChange={(e) => update(i, e.target.value)}
          />
          {rows.length > 1 && (
            <button
              type="button"
              className="intake-person-remove"
              aria-label="Remove"
              onClick={() => removeRow(i)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {rows.length < max && (
        <button type="button" className="intake-add" onClick={addRow}>
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

function LoginsField({
  value,
  onChange,
  columns,
  addLabel,
}: {
  value: LoginRow[];
  onChange: (v: unknown) => void;
  columns: string[];
  addLabel: string;
}) {
  const rows = value.length > 0 ? value : [{}];
  function update(i: number, key: string, val: string) {
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)));
  }
  function addRow() {
    onChange([...rows, {}]);
  }
  function removeRow(i: number) {
    onChange(rows.filter((_, idx) => idx !== i));
  }
  return (
    <div className="intake-people">
      {rows.map((row, i) => (
        <div className="intake-person" key={i}>
          <div className="intake-person-grid">
            {LOGIN_KEYS.map((key, c) => (
              <input
                key={key}
                type={key === "password" ? "password" : "text"}
                className="form-input"
                placeholder={columns[c] ?? key}
                value={row[key] ?? ""}
                autoComplete={key === "password" ? "new-password" : "off"}
                onChange={(e) => update(i, key, e.target.value)}
              />
            ))}
          </div>
          {rows.length > 1 && (
            <button
              type="button"
              className="intake-person-remove"
              aria-label="Remove"
              onClick={() => removeRow(i)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button type="button" className="intake-add" onClick={addRow}>
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  );
}

function ColorsField({
  value,
  onChange,
  labels,
  addLabel,
}: {
  value: string[];
  onChange: (v: unknown) => void;
  labels: string[];
  addLabel: string;
}) {
  const MAX = 5;
  const rows = value.length ? value : [""];
  const isHex = (s: string) => /^#?[0-9a-fA-F]{6}$/.test(s.trim());
  const norm = (s: string) => (s.startsWith("#") ? s : `#${s}`);

  function update(i: number, hex: string) {
    const next = [...rows];
    next[i] = hex;
    onChange(next.slice(0, MAX));
  }
  function add() {
    if (rows.length < MAX) onChange([...rows, ""]);
  }
  function remove(i: number) {
    onChange(rows.filter((_, idx) => idx !== i));
  }

  return (
    <div className="intake-colors">
      {rows.map((hex, i) => (
        <div className="intake-color-row" key={i}>
          <input
            type="color"
            className="intake-color-swatch"
            value={isHex(hex) ? norm(hex.trim()) : "#554B9E"}
            onChange={(e) => update(i, e.target.value)}
            aria-label={labels[i] ?? `Color ${i + 1}`}
          />
          <input
            type="text"
            className="form-input"
            placeholder={`${labels[i] ?? `Color ${i + 1}`} — #hex`}
            value={hex}
            onChange={(e) => update(i, e.target.value)}
          />
          {rows.length > 1 && (
            <button
              type="button"
              className="intake-person-remove"
              aria-label="Remove"
              onClick={() => remove(i)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {rows.length < MAX && (
        <button type="button" className="intake-add" onClick={add}>
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

function AreaPicker({
  value,
  onChange,
  zip,
  radiusLabel,
  radiusOptions,
  t,
}: {
  value: string[];
  onChange: (v: unknown) => void;
  zip: string;
  radiusLabel: string;
  radiusOptions: string[];
  t: { prompt: string; loading: string; add: string; detected: string };
}) {
  const [counties, setCounties] = useState<string[]>([]);
  const [detected, setDetected] = useState<{ city: string; county: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [custom, setCustom] = useState("");

  const z = (zip || "").trim();
  const idx = radiusOptions.indexOf(radiusLabel);
  const validZip = /^\d{5}$/.test(z);

  useEffect(() => {
    // idx: 0 city · 1-4 miles · 5 statewide · 6 nationwide (no list)
    if (!validZip || idx < 0 || idx === 6) {
      setCounties([]);
      setDetected(null);
      return;
    }
    const milesMap = [0, 10, 25, 50, 100];
    const q = idx === 5 ? "scope=state" : `miles=${milesMap[idx] ?? 25}`;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/areas/?zip=${z}&${q}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.ok) {
          setDetected({ city: d.city, county: d.county });
          setCounties(d.counties ?? []);
        } else {
          setDetected(null);
          setCounties([]);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [z, radiusLabel, idx, validZip]);

  function toggle(c: string) {
    onChange(value.includes(c) ? value.filter((x) => x !== c) : [...value, c]);
  }
  function addCustom() {
    const v = custom.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setCustom("");
  }

  if (!validZip) return <p className="intake-help">{t.prompt}</p>;
  if (loading) return <p className="intake-help">{t.loading}</p>;

  // keep any custom/previously-selected items visible even if not in the fetched list
  const allOptions = Array.from(new Set([...counties, ...value]));

  return (
    <div>
      {detected && (
        <p className="intake-help" style={{ marginBottom: "0.6rem" }}>
          {t.detected}: {detected.city}, {detected.county}
        </p>
      )}
      <div className="intake-chips">
        {allOptions.map((c) => {
          const on = value.includes(c);
          return (
            <button
              type="button"
              key={c}
              className={`intake-chip ${on ? "intake-chip-on" : ""}`}
              onClick={() => toggle(c)}
            >
              {on && <Check className="w-4 h-4" />}
              {c}
            </button>
          );
        })}
      </div>
      <div className="intake-person" style={{ marginTop: "0.6rem" }}>
        <input
          className="form-input"
          placeholder={t.add}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
        />
        <button
          type="button"
          className="intake-person-remove"
          style={{ background: "var(--color-purple-50)", color: "var(--color-purple-600)" }}
          aria-label="Add"
          onClick={addCustom}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
