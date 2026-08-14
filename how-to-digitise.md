# Digitising the Manx tidal stream charts

A working guide. No prior knowledge of tides assumed.

---

## What you are actually doing

Your two PDFs contain thirteen small drawings of the Isle of Man, one for each hour from six hours before high water at Liverpool to six hours after. Each drawing has arrows scattered round the Island showing which way the sea is flowing at that moment, and how fast.

Those drawings are pictures. A computer cannot animate a picture. Your job is to turn each arrow into four numbers — where it is, which way it points, how fast at spring tides, how fast at neap tides — so the app can draw them itself and slide smoothly between the hours.

That is the whole task. It is not difficult, but there are roughly 400 numbers, so it wants a system.

---

## Before you start

Open `manx-tidal-streams.html` in a browser on a proper screen. A laptop or desktop — this is fiddly on a phone.

There are three tabs across the top right:

| Tab | What it is for |
|---|---|
| **Stations** | Marking *where* the arrows are. You do this once. |
| **Values** | Filling in direction and speed for each hour. This is the bulk of the work. |
| **Play** | Watching the result. |

Underneath, a strip of thirteen buttons: `HW−6` through `HW+6`. That is the hour you are currently working on. The scanned chart on the left always shows the hour you have selected.

---

## Reading the charts

Six kinds of mark appear on your charts. Here is what each one means.

### Plain arrow

The water is flowing **in the direction the arrow points**. This is worth saying out loud because wind works the opposite way round — a "westerly wind" comes *from* the west. Tidal streams are named and drawn by where they are going *to*. An arrow pointing north-east means the water is heading north-east.

### A number next to an arrow

Speed in **knots** (nautical miles per hour, about 1.15 mph). So `2.0` means the water is moving at two knots.

### Two numbers, like `3.0 - 1.8`

The first is the speed at **spring tides**, the second at **neap tides**.

Springs and neaps are the fortnightly cycle. Around full moon and new moon the Sun and Moon pull together, the tide rises and falls further, so more water has to move through in the same six hours and it moves faster — those are springs. At half moon they partly cancel, less water moves, everything is slower — those are neaps. The bigger number is always springs.

### A single number where neighbours have two

Almost certainly a spring rate. Type it into **Springs** and leave **Neaps** blank; the tool estimates neaps at 60% of it and shows the estimate in amber so you can tell your readings from its guesses.

### The words WEAK, TURNING or SLACK

Sometimes the chart gives a word rather than a number, because the flow is too slow or too confused to put a figure on.

- **SLACK** — essentially no flow.
- **WEAK** — barely moving.
- **TURNING** — changing direction, between one flow and its reverse.

These come in two forms and are entered slightly differently.

**A bare word, no arrow near it.** Drop a station roughly where the word sits, pick it from the **"Or note"** dropdown, and leave bearing and both speed boxes empty. It draws as a small hollow marker. If the word is stretched across a long reach of coast, use two or three stations along it rather than one.

**A word sitting beside an arrow.** The chart is telling you the direction but declining to put a figure on the speed. Set the bearing by dragging as normal *and* pick the word from the dropdown. It draws as a short, faint, dashed arrow — direction shown, speed nominal.

Order does not matter; setting one will not clear the other.

### Wavy lines, like `≈≈≈`

**Overfalls**, or a **race**. Where a fast stream runs over uneven seabed or meets a stream pushing the other way, the surface piles up into standing, breaking water. It is not wind chop — it is there in a flat calm, and it is the genuinely dangerous bit of the chart. Your charts show these mainly off the Point of Ayre, off the Chickens, and off Langness.

### Broken, dashed arrows

An **eddy**. Where the main stream runs past a headland, the water behind it gets dragged round into a slow circulation — often flowing the *opposite* way to the main stream a mile away. Your charts draw these as short arrows made of two or three dashes with a small head, sometimes slightly curved, sitting among the solid ones.

An eddy is not one symbol. It is a **group** of dashed arrows tracing the circulation round, so treat each dashed arrow as its own station and enter it exactly like a stream arrow — bearing and speed. The tool draws them dashed and in slate grey so they stay distinguishable from the main flow.

Where to expect them, from your own charts: along the south-east coast around HW−3, near Chicken Rock and Langness from about HW−5, and either side of the Point of Ayre. The notes on page two say an eddy forms west of the Point during the west-going stream and south-east of it during the east-going stream. Bay ny Carrickey is described as a circulation too — clockwise on the flood, anti-clockwise on the ebb, about 2 knots at springs.

**Telling them apart on a scratchy scan:** solid line, main stream; broken line, eddy. If you genuinely cannot tell, and it carries a speed figure, call it a stream. The distinction only changes how it is drawn, not how it animates.

---

## Step 1 — Survey the charts (15 minutes, no typing)

Do not start entering anything yet. Click through all thirteen hours with the `[` and `]` keys and just look.

You are trying to answer one question: **how many distinct positions have a mark on them, across all thirteen hours combined?**

Most arrows sit in roughly the same spots on every panel. But some hours have extras — an arrow appears off Ramsey for four hours and then isn't drawn. You want the *total set* of positions, not just the ones that appear every time.

Zoom the scan with the scroll wheel. Zoom the map too. Get comfortable moving around before you commit to anything.

---

## Step 2 — Place the stations (30–45 minutes)

A "station" is a fixed spot on the map. You place each one once, and it then holds thirteen values — one per hour.

1. Click the **Stations** tab.
2. Pick a busy hour to work from. `HW−3` is a good one.
3. For every mark on that chart, click the matching spot of open water on the map on the right. A dot appears.
4. Now step through the other twelve hours. Any mark that has no dot near it, click to add one.

**On placing accurately:** the source charts are rough sketches, not surveys. Do not agonise. Use the coastline and the labelled headlands — Point of Ayre, Jurby Head, Maughold Head, Douglas, Langness, Calf of Man — and get the arrow into the right patch of sea relative to those. Zoom in past about twice the fitted view and more place names appear to help you.

**How many to expect:** somewhere around 35 to 50.

Delete a mistake by clicking the dot and pressing **Delete selected**.

---

## Step 3 — Set the type of each station (10 minutes)

Still on the **Stations** tab. Click each dot and set **Type of mark**:

- **Stream arrow** — the default, for plain arrows.
- **Overfalls / race** — for the wavy symbols.
- **Eddy** — for the broken, dashed arrows.

The dots change colour so you can see the mix. Do this before entering any values: changing a station's type wipes its values, because a compass bearing means nothing on an eddy.

---

## Step 4 — Enter the values (the long bit)

Click the **Values** tab. Work through one hour at a time, starting at `HW−6`.

### For a stream arrow

1. Click the station dot on the map.
2. **Drag outward from the dot in the direction the chart's arrow points.** A compass ring appears; release when it matches. You can also type the bearing directly — 0 is north, 90 east, 180 south, 270 west.
3. Type the speed into **Springs**.
4. If the chart gives a second, smaller number, type it into **Neaps**. If not, leave it blank and let the tool estimate.
5. If the chart gives a word instead, pick it from **Or note** and leave the numbers empty.
6. Press **Enter** to jump to the next station with nothing in it.

### For an eddy

Identical to a stream arrow — click, drag to set the direction the dashed arrow points, type the speed. The only difference is how it is drawn.

### For overfalls

Just the one dropdown: whether the wave symbol is drawn this hour, and whether the chart calls it overfalls or a race. No bearing or speed needed.

### If a station has no mark at all this hour

Leave it blank and move on. The animation now interpolates straight across the gap, so the arrow will not blink out.

### The shortcut that saves you an hour

Once `HW−6` is done, go to `HW−5` and press **Copy prev hour**. Every value carries across and you only change what the chart actually changed. Most hours only differ in a handful of places. Do this for every hour after the first.

### Keyboard

| Key | Does |
|---|---|
| `[` `]` | Previous / next hour |
| `Enter` | Save and jump to the next unfilled station |
| `Delete` | Clear this station's value for this hour |

The counter under each hour button (`22/38`) shows your progress; the little bar fills as you go.

---

## Step 5 — Check your work

Click **Play** and press the play button.

Four things to look for:

1. **Does it flow, rather than twitch?** Sudden jumps usually mean a typo — a bearing of 45 where you meant 245.
2. **Does the whole picture reverse?** Roughly six hours apart the streams should be running broadly opposite ways. If a patch of sea never changes direction, check those entries.
3. **Do `HW−6` and `HW+6` look similar?** They are nearly the same moment in the cycle, one tide apart.
4. **Does it match the captions?** The caption under each hour in the editor is the chart's own description. If it says streams are at maximum between the Chickens and Langness and your arrows there are limp, something is wrong.

Then open **Data**. It tells you how many figures are estimates rather than readings, and works out the neaps-to-springs ratio implied by the pairs you genuinely read. If that comes out at, say, 0.58 rather than the assumed 0.60, one button corrects every estimate at once.

---

## Saving — read this bit

Your work lives in the browser tab. **It is not a file until you make it one.**

Open **Data** and click **Download JSON** every twenty minutes or so, and at the end of every session. To pick up where you left off, open Data, paste the contents of your saved file into the box, and click **Load from box**.

Name them with dates. `manx-tidal-streams-2026-08-14.json`.

---

## Rough time budget

| | |
|---|---|
| Survey | 15 min |
| Placing stations | 30–45 min |
| Setting types | 10 min |
| First hour of values | 30–40 min |
| Each hour after that | 10–20 min, using Copy prev hour |
| **Total** | **4 to 6 hours** |

Very much an evenings job rather than a sitting. The station positions are the part worth taking care over — get those right and the rest is typing.

---

## One caution

This is a hobby visualisation built from sketch charts. It is not a navigational product, and the official chart notes point out that close inshore the Manx streams do not always behave like the offshore atlas suggests. Anything that actually matters at sea wants the real tidal atlas and an up-to-date almanac.
