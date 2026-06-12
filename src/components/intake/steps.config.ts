/**
 * Structural definition of the intake wizard — language-agnostic.
 * Field text/labels/options live in content.ts (keyed by the same field `id`).
 * Branching lives here via `showIf`.
 *
 * Two special steps are rendered by the wizard itself, not by the generic field list:
 *   - "category"  → the opening category picker (writes answers.category)
 *   - "review"    → the summary + consent + submit screen
 */

export type Answers = Record<string, unknown>;

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "yesno"
  | "file"
  | "people"
  | "areas"
  | "colors"
  | "logins"
  | "list";

export interface FieldConfig {
  id: string; // must match a key in content.fields
  type: FieldType;
  optional?: boolean; // default false (required)
  half?: boolean; // render two-up on wider screens
  max?: number; // file fields: max number of uploads
  showIf?: (a: Answers) => boolean;
}

export interface StepConfig {
  id: string; // matches a content.steps id
  icon: string; // lucide icon name (resolved in the wizard)
  /** "category" and "review" are handled specially; others render `fields`. */
  kind?: "category" | "review";
  fields: FieldConfig[];
}

const hasName = (a: Answers) => a.has_business_name === true;
const noName = (a: Answers) => a.has_business_name === false;
const isCat = (id: string) => (a: Answers) => a.category === id;
const wantsPackage = (a: Answers) => a.want_package === true;

export const STEPS: StepConfig[] = [
  { id: "category", icon: "LayoutGrid", kind: "category", fields: [] },

  {
    id: "name",
    icon: "Sparkles",
    fields: [
      { id: "has_business_name", type: "yesno" },
      { id: "business_name", type: "text", showIf: hasName },
      // ── "No" branch: name-discovery questions, then the flow rejoins at step 2 ──
      { id: "name_what", type: "textarea", showIf: noName },
      { id: "name_audience", type: "text", showIf: noName },
      { id: "name_vibe", type: "multiselect", showIf: noName },
      { id: "name_words_love", type: "text", optional: true, showIf: noName },
      { id: "name_words_avoid", type: "text", optional: true, showIf: noName },
      { id: "name_style", type: "select", showIf: noName },
    ],
  },

  {
    id: "general",
    icon: "Building2",
    fields: [
      { id: "tagline", type: "text", optional: true },
      { id: "business_stage", type: "select", half: true },
      { id: "employees", type: "select", half: true },
      // "What do you sell?" — a checklist tailored to the chosen category…
      { id: "offer_home_construction", type: "multiselect", showIf: isCat("home_construction") },
      { id: "offer_food_restaurant", type: "multiselect", showIf: isCat("food_restaurant") },
      { id: "offer_retail_ecom", type: "multiselect", showIf: isCat("retail_ecom") },
      { id: "offer_professional_services", type: "multiselect", showIf: isCat("professional_services") },
      { id: "offer_health_wellness", type: "multiselect", showIf: isCat("health_wellness") },
      { id: "offer_real_estate", type: "multiselect", showIf: isCat("real_estate") },
      { id: "offer_faith_nonprofit", type: "multiselect", showIf: isCat("faith_nonprofit") },
      { id: "offer_events", type: "multiselect", showIf: isCat("events") },
      { id: "offer_other", type: "textarea", showIf: isCat("other") },
      // …plus a free-text box for anything not on the list (hidden for "other").
      { id: "offerings", type: "text", optional: true, showIf: (a) => !!a.category && a.category !== "other" },
      { id: "usp", type: "textarea" },
      // Service area: ZIP + a "how far" picker + optional specific areas (pick, don't type)
      { id: "service_zip", type: "text", half: true },
      { id: "service_radius", type: "select", half: true },
      { id: "service_areas", type: "areas", optional: true },
    ],
  },

  {
    id: "owners",
    icon: "User",
    fields: [
      { id: "owner_name", type: "text", half: true },
      { id: "owner_role", type: "text", optional: true, half: true },
      { id: "owner_story", type: "textarea", optional: true },
      { id: "owner_face", type: "yesno" },
      { id: "languages", type: "multiselect", optional: true },
    ],
  },

  {
    id: "contact",
    icon: "Mail",
    fields: [
      { id: "business_email", type: "email", half: true },
      { id: "phone", type: "tel", half: true },
      { id: "preferred_contact", type: "select", half: true },
      { id: "hours", type: "text", optional: true, half: true },
    ],
  },

  {
    id: "presence",
    icon: "MapPin",
    fields: [
      { id: "assets", type: "multiselect" },
      { id: "locations_detail", type: "textarea", optional: true },
    ],
  },

  {
    id: "online",
    icon: "Globe",
    fields: [
      { id: "website_url", type: "url", optional: true, half: true },
      { id: "website_feeling", type: "select", optional: true, half: true },
      { id: "instagram", type: "text", optional: true, half: true },
      { id: "facebook", type: "text", optional: true, half: true },
      { id: "tiktok", type: "text", optional: true, half: true },
      { id: "youtube", type: "text", optional: true, half: true },
      { id: "linkedin", type: "text", optional: true, half: true },
      { id: "google_business", type: "select", optional: true, half: true },
      { id: "reviews_status", type: "text", optional: true },
      // Optional login access so the agency can post/manage (handled securely — see edge fn)
      { id: "social_logins", type: "logins", optional: true },
    ],
  },

  {
    id: "assets",
    icon: "ImagePlus",
    fields: [
      { id: "media_files", type: "file", optional: true, max: 5 },
      { id: "media_links", type: "textarea", optional: true },
      { id: "logo_files", type: "file", optional: true },
      { id: "brand_colors", type: "colors", optional: true },
      { id: "brand_fonts", type: "text", optional: true },
    ],
  },

  {
    id: "deepdive",
    icon: "Layers",
    fields: [
      // home_construction
      { id: "hc_project_types", type: "multiselect", showIf: isCat("home_construction") },
      { id: "hc_project_value", type: "select", half: true, showIf: isCat("home_construction") },
      { id: "hc_licensed", type: "yesno", showIf: isCat("home_construction") },
      { id: "hc_radius", type: "text", showIf: isCat("home_construction") },
      // food_restaurant
      { id: "fr_cuisine", type: "text", showIf: isCat("food_restaurant") },
      { id: "fr_service", type: "multiselect", showIf: isCat("food_restaurant") },
      { id: "fr_menu_url", type: "url", optional: true, showIf: isCat("food_restaurant") },
      { id: "fr_online_ordering", type: "yesno", showIf: isCat("food_restaurant") },
      // retail_ecom
      { id: "re_products", type: "textarea", showIf: isCat("retail_ecom") },
      { id: "re_platform", type: "select", half: true, showIf: isCat("retail_ecom") },
      { id: "re_aov", type: "select", half: true, showIf: isCat("retail_ecom") },
      { id: "re_instore", type: "yesno", showIf: isCat("retail_ecom") },
      // professional_services
      { id: "ps_services", type: "textarea", showIf: isCat("professional_services") },
      { id: "ps_clients", type: "select", half: true, showIf: isCat("professional_services") },
      { id: "ps_appointments", type: "yesno", showIf: isCat("professional_services") },
      { id: "ps_certs", type: "text", optional: true, showIf: isCat("professional_services") },
      // health_wellness
      { id: "hw_services", type: "textarea", showIf: isCat("health_wellness") },
      { id: "hw_booking", type: "select", half: true, showIf: isCat("health_wellness") },
      { id: "hw_practitioners", type: "select", half: true, showIf: isCat("health_wellness") },
      { id: "hw_memberships", type: "yesno", showIf: isCat("health_wellness") },
      // real_estate
      { id: "rs_type", type: "multiselect", showIf: isCat("real_estate") },
      { id: "rs_market", type: "text", showIf: isCat("real_estate") },
      { id: "rs_brokerage", type: "text", optional: true, showIf: isCat("real_estate") },
      // faith_nonprofit
      { id: "fn_mission", type: "textarea", showIf: isCat("faith_nonprofit") },
      { id: "fn_size", type: "select", half: true, showIf: isCat("faith_nonprofit") },
      { id: "fn_events", type: "yesno", showIf: isCat("faith_nonprofit") },
      { id: "fn_donations", type: "yesno", showIf: isCat("faith_nonprofit") },
      // events
      { id: "ev_types", type: "textarea", showIf: isCat("events") },
      { id: "ev_frequency", type: "select", showIf: isCat("events") },
      { id: "ev_ticketing", type: "yesno", showIf: isCat("events") },
      // other
      { id: "ot_describe", type: "textarea", showIf: isCat("other") },
    ],
  },

  {
    id: "goals",
    icon: "Target",
    fields: [
      { id: "primary_goal", type: "select" },
      { id: "ideal_customer", type: "textarea" },
      { id: "budget", type: "select", half: true },
      { id: "timeline", type: "select", half: true },
      { id: "current_marketing", type: "multiselect" },
      { id: "challenge_options", type: "multiselect" },
      { id: "biggest_challenge", type: "textarea", optional: true },
      { id: "competitors", type: "list", optional: true, max: 5 },
      { id: "success_options", type: "multiselect", optional: true },
      { id: "success_vision", type: "textarea", optional: true },
    ],
  },

  {
    id: "package",
    icon: "Gift",
    fields: [
      { id: "want_package", type: "yesno" },
      // Details we need to actually deliver the package (shown only if they want it):
      { id: "pkg_colors", type: "text", showIf: wantsPackage },
      { id: "pkg_logo_have", type: "yesno", showIf: wantsPackage },
      { id: "pkg_logo_files", type: "file", optional: true, showIf: wantsPackage },
      { id: "pkg_logo_likes", type: "textarea", optional: true, showIf: wantsPackage },
      { id: "pkg_instagram_handle", type: "text", optional: true, showIf: wantsPackage },
      { id: "pkg_domain", type: "text", optional: true, showIf: wantsPackage },
      { id: "pkg_cards_people", type: "people", showIf: wantsPackage },
    ],
  },

  {
    id: "services",
    icon: "Rocket",
    fields: [
      { id: "services_interested", type: "multiselect" },
      { id: "anything_else", type: "textarea", optional: true },
    ],
  },

  { id: "review", icon: "CheckCircle2", kind: "review", fields: [] },
];

/** Fields visible for a step given the current answers (applies showIf). */
export function visibleFields(step: StepConfig, answers: Answers): FieldConfig[] {
  return step.fields.filter((f) => !f.showIf || f.showIf(answers));
}

/** Whether a value counts as "filled" for required-field validation. */
export function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "boolean") return true;
  return true;
}

/** A step is complete when every visible, required field is filled. */
export function isStepComplete(step: StepConfig, answers: Answers): boolean {
  if (step.kind === "category") return isFilled(answers.category);
  if (step.kind === "review") return answers.consent === true;
  return visibleFields(step, answers)
    .filter((f) => !f.optional)
    .every((f) => isFilled(answers[f.id]));
}
