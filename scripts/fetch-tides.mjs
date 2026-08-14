#!/usr/bin/env node
/**
 * Fetch high and low water events for a station from the ADMIRALTY UK Tidal API
 * and write a small tides.json for the phone app to read.
 *
 * The Discovery tier is free and returns today plus the next six days, which is
 * why this is meant to run on a schedule rather than once.
 *
 * Usage:
 *   ADMIRALTY_KEY=xxxx node scripts/fetch-tides.mjs
 *   ADMIRALTY_KEY=xxxx node scripts/fetch-tides.mjs --find liverpool
 *
 * Environment:
 *   ADMIRALTY_KEY   required, your Ocp-Apim-Subscription-Key
 *   STATION_ID      station to fetch, defaults to 0451 (Liverpool, Gladstone Dock)
 *   STATION_NAME    label shown in the app
 *   OUT             output path, defaults to tides.json
 *   API_BASE        override the API host if UKHO move it
 */

const KEY = process.env.ADMIRALTY_KEY;
const BASE = process.env.API_BASE || "https://admiraltyapi.azure-api.net/uktidalapi/api/V1";
const OUT = process.env.OUT || "tides.json";

if (!KEY) {
  console.error("ADMIRALTY_KEY is not set. Get a free Discovery key from the ADMIRALTY developer portal.");
  process.exit(1);
}

const headers = { "Ocp-Apim-Subscription-Key": KEY };

async function api(path) {
  const res = await fetch(BASE + path, { headers });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${path}\n${(await res.text()).slice(0, 400)}`);
  }
  return res.json();
}

/* --find <text> : list matching stations so you can confirm the right ID */
const findIdx = process.argv.indexOf("--find");
if (findIdx !== -1) {
  const needle = (process.argv[findIdx + 1] || "").toLowerCase();
  const data = await api("/Stations");
  const rows = (data.features || [])
    .map(f => ({
      id: f.properties?.Id,
      name: f.properties?.Name,
      country: f.properties?.Country,
      lat: f.geometry?.coordinates?.[1],
      lon: f.geometry?.coordinates?.[0]
    }))
    .filter(r => !needle || (r.name || "").toLowerCase().includes(needle));

  if (!rows.length) {
    console.log(`No stations matching "${needle}".`);
  } else {
    console.log(`${rows.length} station(s) matching "${needle}":\n`);
    for (const r of rows) {
      console.log(`  ${String(r.id).padEnd(8)} ${r.name}${r.country ? "  (" + r.country + ")" : ""}`);
    }
    console.log("\nSet STATION_ID to the one you want.");
  }
  process.exit(0);
}

const STATION_ID = process.env.STATION_ID || "0451";
const STATION_NAME = process.env.STATION_NAME || "Liverpool (Gladstone Dock)";

const raw = await api(`/Stations/${STATION_ID}/TidalEvents?duration=7`);
if (!Array.isArray(raw) || !raw.length) {
  throw new Error(`No events returned for station ${STATION_ID}. Check the ID with --find.`);
}

/* The API returns UTC timestamps, sometimes without a trailing Z. Normalise so
   the browser cannot mistake them for local time. */
const toUTC = s => {
  const t = String(s).trim();
  return /[Zz]|[+-]\d{2}:?\d{2}$/.test(t) ? new Date(t).toISOString() : new Date(t + "Z").toISOString();
};

const events = raw
  .filter(e => e.EventType === "HighWater" || e.EventType === "LowWater")
  .map(e => ({
    t: toUTC(e.DateTime),
    type: e.EventType === "HighWater" ? "H" : "L",
    h: e.Height == null ? null : Math.round(e.Height * 100) / 100,
    ...(e.IsApproximateTime ? { approx: true } : {})
  }))
  .sort((a, b) => a.t.localeCompare(b.t));

const highs = events.filter(e => e.type === "H").length;
if (!highs) throw new Error("Response contained no high water events.");

const out = {
  station: { id: STATION_ID, name: STATION_NAME },
  reference: "All chart hours are relative to high water at this station.",
  source: "ADMIRALTY UK Tidal API (Discovery), UK Hydrographic Office",
  generated: new Date().toISOString(),
  events
};

const { writeFileSync } = await import("node:fs");
writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n");

console.log(
  `Wrote ${OUT}: ${events.length} events (${highs} high water) for ${STATION_NAME}\n` +
  `  first ${events[0].t}\n  last  ${events[events.length - 1].t}`
);
