# Manx Tidal Streams

Isle of Man tidal streams, from the Isle of Man Government's charts.

Live at **[manxtides.luckins.im](https://manxtides.luckins.im)**

Two things share this repo:

| | |
|---|---|
| **[/](https://manxtides.luckins.im)** | A phone app showing the tidal stream chart for the current state of the tide. Installable, works offline. |
| **[/digitise.html](https://manxtides.luckins.im/digitise.html)** | A desktop tool for turning the chart scans into data, so the streams can be animated rather than just displayed. |

Tide times come from a static `tides.json` refreshed nightly by a GitHub Action, so no API key ever reaches the browser.

---

## Setup

### 1. Enable Pages

**Settings → Pages → Deploy from a branch**, `main` / root.

### 2. Point the domain at it

Add a DNS record on `luckins.im`:

| Type | Name | Value |
|---|---|---|
| CNAME | `manxtides` | `lucky-h4.github.io.` |

The `CNAME` file in this repo already holds `manxtides.luckins.im`, so Pages will pick it up. Once DNS resolves, tick **Enforce HTTPS** in the Pages settings — the service worker will not register over plain HTTP.

### 3. Add the ADMIRALTY key

Register at the [ADMIRALTY developer portal](https://developer.admiralty.co.uk/) and subscribe to **UK Tidal API — Discovery**. Free for a year, 10,000 calls a month; this uses about 30.

**Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|---|---|
| `ADMIRALTY_KEY` | your subscription key |

### 4. Run the workflow once

**Actions → Refresh tide times → Run workflow.** It writes `tides.json` and commits it, then runs itself at 04:20 UTC daily.

### 5. Install on the phone

Open the site in Safari or Chrome and choose **Add to Home Screen**.

---

## The phone app

The header gives the nearest high water at Liverpool and how far the tide is from it now. Below is the matching hour from the charts — pinch or double-tap to zoom. Tap any hour along the bottom to look ahead or back; **Back to now** returns, and it does so on its own after ninety seconds.

The dot beside the header says where the tide time came from:

| Dot | Meaning |
|---|---|
| Green | From the tide file, within its coverage |
| Amber | Extrapolated past the end of the file, or a manual override |
| Magenta | No tide data — tap to enter high water by hand |

Extrapolation steps in units of 12 h 25 m. Fine for a day or two beyond the file; over longer it drifts, because the real interval between high waters shortens near springs and lengthens near neaps by up to half an hour. Amber for more than a couple of days means the Action has stopped running.

## The digitiser

See `how-to-digitise.md`. Briefly: place stations where the charts show marks, then fill in bearing and rate for each of the thirteen hours. Download the result as JSON.

When that data exists, commit it as `streams.json` and the phone app can read it off the same origin and animate the arrows instead of showing a scan. The service worker already treats that filename as data.

---

## Files

| | |
|---|---|
| `index.html` | Phone app |
| `digitise.html` | Digitising tool |
| `panels/` | The thirteen chart scans, cropped from the source PDFs, plus the notes block |
| `sw.js` | Service worker. Shell and panels cache-first, `tides.json` network-first, digitiser left to the network |
| `manifest.webmanifest` | Makes the app installable |
| `tides.json` | Tide events, written by the Action |
| `scripts/fetch-tides.mjs` | Fetches from the ADMIRALTY API. `--find <text>` looks up station IDs |
| `.github/workflows/tides.yml` | The nightly refresh |
| `CNAME` | Custom domain for Pages |

### Notes for later

- Bump `VERSION` in `sw.js` whenever `index.html`, the panels or the icons change. Installed phones will otherwise keep the cached copy.
- Liverpool (Gladstone Dock) is station `0451`. Override with a `STATION_ID` repository variable if you ever want a different reference port.
- The springs/neaps wording compares predicted range against `NEAP_RANGE` and `SPRING_RANGE` near the top of `index.html`. Approximate figures; adjust to taste.

---

## Source and caveats

Charts from the Isle of Man Government (`tidal_streams.pdf`, `tidal_streams_2.pdf`). All hours refer to high water at Liverpool. Tide predictions from the UK Hydrographic Office ADMIRALTY UK Tidal API.

**Not for navigation.** A hobby visualisation built from sketch charts. The chart notes themselves point out that close inshore the Manx streams do not always behave as the offshore atlas suggests. Anything that matters at sea wants the real tidal atlas and a current almanac.
