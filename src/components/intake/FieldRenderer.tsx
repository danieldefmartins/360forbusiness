"use client";

import { useRef, useState } from "react";
import { Check, UploadCloud, X, Loader2, Plus } from "lucide-react";
import { supabase, INTAKE_BUCKET } from "@/lib/supabase";
import type { FieldConfig } from "./steps.config";

// Stable keys for the business-card people repeater (column labels come from text.options).
const PEOPLE_KEYS = ["name", "title", "phone", "email"] as const;
type Person = Partial<Record<(typeof PEOPLE_KEYS)[number], string>>;

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
}: {
  value: UploadedFile[];
  onChange: (v: unknown) => void;
  submissionId: string | null;
  fieldId: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !submissionId) return;
    setUploading(true);
    setError(false);
    const next = [...value];
    for (const file of Array.from(files)) {
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
