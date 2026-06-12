import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// ZIP -> nearby counties lookup, backed by a bundled GeoNames dataset.
// Runs server-side on Railway (Node runtime); the dataset is never shipped to the client.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Rec = [string, number, number, string, string, string]; // zip, lat, lng, city, county, state

let DATA: Rec[] | null = null;
let BY_ZIP: Map<string, Rec> | null = null;

function load() {
  if (!DATA) {
    const file = path.join(process.cwd(), "src", "data", "us-areas.json");
    DATA = JSON.parse(fs.readFileSync(file, "utf8")) as Rec[];
    BY_ZIP = new Map(DATA.map((r) => [r[0], r]));
  }
  return { data: DATA, byZip: BY_ZIP! };
}

function milesBetween(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const zip = (sp.get("zip") || "").trim();
  const miles = parseFloat(sp.get("miles") || "");
  const scope = sp.get("scope") || "";

  if (!/^\d{5}$/.test(zip)) {
    return NextResponse.json({ ok: false, error: "invalid zip" });
  }

  const { data, byZip } = load();
  const home = byZip.get(zip);
  if (!home) return NextResponse.json({ ok: false, error: "zip not found" });

  const [, hlat, hlng, hcity, hcounty, hstate] = home;

  // collect unique counties, keyed by "County, ST", keeping the nearest distance
  const counties = new Map<string, { name: string; state: string; dist: number }>();
  const add = (name: string, state: string, dist: number) => {
    const key = `${name}|${state}`;
    const cur = counties.get(key);
    if (!cur || dist < cur.dist) counties.set(key, { name, state, dist });
  };
  add(hcounty, hstate, 0);

  if (scope === "state") {
    for (const r of data) if (r[5] === hstate) add(r[4], r[5], 0);
  } else if (!isNaN(miles) && miles > 0) {
    for (const r of data) {
      const d = milesBetween(hlat, hlng, r[1], r[2]);
      if (d <= miles) add(r[4], r[5], d);
    }
  }

  const list = [...counties.values()]
    .sort((a, b) => a.dist - b.dist || a.name.localeCompare(b.name))
    .map((c) => `${c.name} County, ${c.state}`);

  return NextResponse.json({
    ok: true,
    zip,
    city: hcity,
    county: `${hcounty} County, ${hstate}`,
    state: hstate,
    counties: list,
  });
}
