// ─────────────────────────────────────────────────────────────────────────────
// GlowTeek Recommendation Engine
// Data/logic layer only — no UI concerns in this file.
//
// Exports:
//   BASE_PROFILES         – 25 keyed base profiles (spaceType|ambience)
//   getRecommendation()   – main function combining base + modifiers
//   buildWhyText()        – assembles the "why this works" explanatory paragraph
// ─────────────────────────────────────────────────────────────────────────────

// ─── BASE PROFILES ────────────────────────────────────────────────────────────
// 25 entries, keyed as "spaceType|ambience".
// baseFixtures carries a ceilingRequired flag used by applyFalseCeilingModifier.
// Space-size and natural-light specifics are intentionally omitted here —
// they are handled downstream by the three modifier functions.

export const BASE_PROFILES = {

  // ── LIVING ROOM ─────────────────────────────────────────────────────────────

  "Living Room|Cozy & Warm": {
    name: "Golden Hour Living",
    moodStatement:
      "That perfect evening light — always on, whenever you want it.",
    lightingStyle:
      "Warm layered ambient with cove, wall accents and a focal pendant. Balanced for both day supplement and full evening use.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "LED cove lights", ceilingRequired: true },
      { name: "Pendant light", ceilingRequired: true },
      { name: "Corner floor lamp", ceilingRequired: false },
      { name: "Wall sconces", ceilingRequired: false },
    ],
    placement:
      "Run cove lights the full perimeter. Hang pendant over the seating zone. Place floor lamp beside the sofa in the darkest corner. Mount wall sconces at 150 cm on the feature or TV wall.",
    mistakes: [
      "Avoid placing the pendant directly over the TV — it creates glare",
      "Avoid single-source lighting even in standard rooms",
      "Never use cool white tube lights — they destroy warmth instantly",
    ],
    proTip:
      "In Indian living rooms, the cove circuit does the heavy lifting. Add a Legrand or Havells dimmer on that circuit and you transform every evening atmosphere for under ₹2,000.",
  },

  "Living Room|Minimal & Soft": {
    name: "Soft Urban Nest",
    moodStatement:
      "Clean, breathable, and quietly elegant — a space that doesn't try too hard.",
    lightingStyle:
      "Minimal diffused ambient with a single cove layer and one focused reading point. Restraint is the design.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Slim LED cove lights", ceilingRequired: true },
      { name: "Single pendant light", ceilingRequired: true },
      { name: "Recessed downlights (2–3 max)", ceilingRequired: true },
    ],
    placement:
      "Cove lights on two sides only — not the full perimeter. Single pendant centred over the seating zone. Downlights near seating areas, not the geometric centre of the room.",
    mistakes: [
      "Avoid over-lighting — less is more here",
      "Avoid multiple pendant clusters — one strong statement is enough",
      "Avoid warm yellow that tips into orange — 3000K, not 2700K",
    ],
    proTip:
      "For minimal setups, use a 3000K source rather than 2700K — it reads clean and considered without feeling clinical. Pair it with a linen or fabric shade to diffuse the light softly.",
  },

  "Living Room|Modern & Bright": {
    name: "Bright Urban Living",
    moodStatement:
      "Energetic, clean and contemporary — a space that feels switched on.",
    lightingStyle:
      "Balanced modern brightness with recessed grid and accent strips. Day and night performance equally strong.",
    colorTemp: "4000K Functional White 💡",
    colorTempValue: 4000,
    baseFixtures: [
      { name: "Recessed downlights", ceilingRequired: true },
      { name: "LED strip along false ceiling edge", ceilingRequired: true },
      { name: "Wall-mounted reading light", ceilingRequired: false },
    ],
    placement:
      "Downlights in a 3×2 grid pattern — not clustered centrally. LED strip along the false ceiling edge facing upward for a clean architectural line.",
    mistakes: [
      "Avoid warm yellow — it kills the modern feel",
      "Avoid a single large surface panel — it creates flat, directionless light",
      "Don't skip the ceiling edge strip — it defines the false ceiling and adds visual depth",
    ],
    proTip:
      "4000K is the sweet spot for modern Indian living rooms — bright enough to feel contemporary, not cold enough to feel like an office. Pair with matte white or concrete-look surfaces for maximum impact.",
  },

  "Living Room|Luxury Hotel Feel": {
    name: "Luxe Evening Retreat",
    moodStatement:
      "The kind of living room where guests go quiet for a moment when they walk in.",
    lightingStyle:
      "Premium layered luxury — cove base, accent spotlights on art and walls, statement pendant as centrepiece.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "LED cove lights (dimmable)", ceilingRequired: true },
      { name: "Accent spotlights", ceilingRequired: true },
      { name: "Statement pendant", ceilingRequired: true },
      { name: "Wall washers", ceilingRequired: false },
    ],
    placement:
      "Cove lights full perimeter at 3000K on a dimmer. Accent spots angled at 30° to highlight artwork or textured walls. Pendant centred over the coffee table zone.",
    mistakes: [
      "Avoid mixing colour temperatures — it ruins the luxury cohesion",
      "Avoid plastic fixtures — invest in metal or glass",
      "Never use non-dimmable lights in a luxury setup",
    ],
    proTip:
      "The single biggest upgrade in a luxury living room is dimmability. A Legrand or Havells dimmer on your cove circuit costs ₹2,000 and transforms every evening. Accent spots at 30° on a textured wall do the rest.",
  },

  "Living Room|Productive & Focused": {
    name: "Focused Living Studio",
    moodStatement:
      "Clarity and purpose — a living room that supports your best thinking.",
    lightingStyle:
      "Layered functional-ambient mix. Bright task zones for work and reading, softer ambient for transition areas.",
    colorTemp: "4000K Functional White 💡",
    colorTempValue: 4000,
    baseFixtures: [
      { name: "Recessed downlights", ceilingRequired: true },
      { name: "Adjustable track lights", ceilingRequired: true },
      { name: "Desk or floor task lamp", ceilingRequired: false },
      { name: "LED cove lights (on dimmer)", ceilingRequired: true },
    ],
    placement:
      "Track lights adjustable toward the desk or reading zone. Downlights in a grid across the room. Cove on a dimmer for ambient fill when the work session ends.",
    mistakes: [
      "Avoid warm-only lighting in a productive space — 2700K causes drowsiness during focused work",
      "Avoid shadows in task areas — they cause eye strain",
      "Never run work and sleep lighting on the same circuit",
    ],
    proTip:
      "If you work from your living room, consider a dual-circuit setup: 4000K task lights on one switch, 2700K cove on another. Best of both worlds at the flip of a switch — no compromise needed.",
  },

  // ── BEDROOM ──────────────────────────────────────────────────────────────────

  "Bedroom|Cozy & Warm": {
    name: "Soft Sleep Sanctuary",
    moodStatement:
      "Your room tells your body: slow down, you're safe, rest now.",
    lightingStyle:
      "Ultra-soft indirect comfort lighting. Zero overhead direct light. Warmth from the edges and beside the bed.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "Warm LED cove lights", ceilingRequired: true },
      { name: "Bedside pendant or wall light", ceilingRequired: false },
      { name: "Small table lamp", ceilingRequired: false },
    ],
    placement:
      "Cove lights only — no ceiling downlights. Bedside lights mounted at 55–60 cm above mattress level. Table lamp on dresser for soft fill.",
    mistakes: [
      "Never install a downlight directly above the bed — you wake up staring into it",
      "Avoid cool white of any kind in a sleep-focused bedroom",
      "Avoid bright central fixtures — they signal 'awake' to the brain",
    ],
    proTip:
      "The bedroom is the one room where less is always more. Two bedside wall lights on a dimmer is all you ever need — and it looks more premium than any chandelier. In compact bedrooms, this is the only setup you should consider.",
  },

  "Bedroom|Minimal & Soft": {
    name: "Quiet Minimal Bedroom",
    moodStatement:
      "Stripped back, calm and deliberate — a bedroom that breathes.",
    lightingStyle:
      "Minimal wall-based setup with two precise warm sources. Restraint over abundance.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Bedside wall lights (plug-in or hardwired)", ceilingRequired: false },
      { name: "Single table lamp", ceilingRequired: false },
      { name: "Wall sconces", ceilingRequired: false },
    ],
    placement:
      "Wall lights on either side of the bed headboard at 55–60 cm above the mattress. Table lamp on the side you read from. Sconces at 150 cm on side walls for gentle fill.",
    mistakes: [
      "Avoid overhead batten or tube light — it kills the calm immediately",
      "Avoid more than 3 light sources in a bedroom — it becomes busy",
      "Avoid fluorescent or cool white of any type",
    ],
    proTip:
      "Two bedside wall lights at the right height transforms even the most basic bedroom into something considered and calm. Without false ceiling, discipline is your design tool — two points of warm light, nothing more.",
  },

  "Bedroom|Luxury Hotel Feel": {
    name: "Boutique Hotel Bedroom",
    moodStatement:
      "Every morning feels like a stay, every evening feels like an escape.",
    lightingStyle:
      "Layered luxury bedroom — cove, bedside pendants and a concealed accent strip behind the headboard.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "Dimmable LED cove lights", ceilingRequired: true },
      { name: "Hanging bedside pendants", ceilingRequired: true },
      { name: "Headboard backlight LED strip", ceilingRequired: false },
      { name: "Wardrobe interior lights", ceilingRequired: false },
    ],
    placement:
      "Cove full perimeter on a dimmer. Pendant bedside lights at 45 cm above mattress. LED strip behind the headboard facing the wall — not the ceiling — for a halo glow.",
    mistakes: [
      "Avoid ceiling downlights above the bed even in luxury setups",
      "Avoid non-dimmable circuits — a hotel feel requires dimming at every layer",
      "Avoid cold white anywhere in this room",
    ],
    proTip:
      "The headboard backlight is the single highest-impact low-cost upgrade in a luxury bedroom. A 2700K LED strip behind a floating headboard creates a glow that makes the room look like it costs 3× more — for under ₹1,500.",
  },

  "Bedroom|Productive & Focused": {
    name: "Work & Rest Balance",
    moodStatement: "Sharp when you need it, soft when you don't.",
    lightingStyle:
      "Dual-mode bedroom — task lighting for work from home, warm ambient for wind-down. Two circuits, two intentions.",
    colorTemp: "4000K Functional White 💡 (task) + 2700K Warm White ✨ (ambient)",
    colorTempValue: 4000,
    baseFixtures: [
      { name: "Recessed downlights over desk area", ceilingRequired: true },
      { name: "Dimmable LED cove lights", ceilingRequired: true },
      { name: "Bedside lamps", ceilingRequired: false },
      { name: "Dedicated desk task lamp", ceilingRequired: false },
    ],
    placement:
      "Downlights concentrated over the desk zone — not spread across the entire room. Cove on a separate dimmer for evening ambient. Bedside lamps purely for the sleep routine.",
    mistakes: [
      "Never use the same circuit for work and sleep lighting",
      "Avoid 4000K near the bed — it suppresses melatonin and disrupts sleep",
      "Don't skip the dedicated desk task light — overhead alone is never enough for sustained focus",
    ],
    proTip:
      "Post-pandemic, the work-bedroom is a reality. The solution isn't compromise — it's separation. Two circuits, two intentions: 4000K at the desk, 2700K at the bed. The room serves both masters perfectly.",
  },

  // ── DINING ───────────────────────────────────────────────────────────────────

  "Dining|Cozy & Warm": {
    name: "Warm Dining Nook",
    moodStatement:
      "Meals feel slower, conversations feel easier, evenings feel longer.",
    lightingStyle:
      "Warm intimate dining with a focused pendant as the hero and soft perimeter fill from cove or wall sources.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "Pendant light over table", ceilingRequired: true },
      { name: "LED cove fill lights", ceilingRequired: true },
      { name: "Wall wash lighting", ceilingRequired: false },
    ],
    placement:
      "Pendant centred over the dining table, hung at 70–75 cm above the table surface. Cove for perimeter fill on a separate dimmer. Wall wash on the feature wall behind the dining area.",
    mistakes: [
      "Avoid pendant hung too high — it loses the intimate pool of light that makes dining special",
      "Avoid overbright overhead lighting — dining should never feel like a canteen",
      "Avoid cool white — it makes food look unappetizing and faces look harsh",
    ],
    proTip:
      "Pendant height over a dining table is almost always wrong in Indian homes. 70–75 cm above the table surface is the rule. Any higher and you lose the intimate, enclosing glow that makes a meal feel like an occasion.",
  },

  "Dining|Minimal & Soft": {
    name: "Intimate Dining Corner",
    moodStatement:
      "Simple, honest and warm — a table lit exactly the way it should be.",
    lightingStyle:
      "Single-source warm pendant as the hero. No ceiling complexity, no distraction — restraint as design.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "Statement pendant light", ceilingRequired: true },
      { name: "Small sideboard lamp", ceilingRequired: false },
    ],
    placement:
      "Pendant directly over the table at 70–75 cm height. Sideboard lamp as ambient fill if space allows — keep it secondary, never competing.",
    mistakes: [
      "Avoid multiple pendants in a minimal setup — one strong statement is always better",
      "Avoid batten lights for dining — ever",
      "Avoid pushing the pendant too close to the ceiling — it reads as an afterthought, not a choice",
    ],
    proTip:
      "A minimal dining setup is actually a design opportunity. One beautiful pendant at the right height is more impactful than an elaborate false ceiling arrangement. Invest in the fixture, not the infrastructure.",
  },

  "Dining|Luxury Hotel Feel": {
    name: "Fine Dining at Home",
    moodStatement:
      "Your table, your rules — but the ambience of somewhere truly special.",
    lightingStyle:
      "Layered luxury dining — statement pendant or chandelier, cove fill on a separate dimmer, and accent on the dining backdrop.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Decorative chandelier or statement pendant", ceilingRequired: true },
      { name: "LED cove lights (dimmable)", ceilingRequired: true },
      { name: "Wall accent lights", ceilingRequired: false },
      { name: "Accent spotlights on bar or sideboard", ceilingRequired: true },
    ],
    placement:
      "Statement pendant or chandelier at 70–75 cm over the table. Cove on a separate dimmer as ambient fill. Wall accents behind the dining backdrop or bar unit.",
    mistakes: [
      "Avoid mixing 2700K and 4000K in the same dining space — it breaks the luxury coherence",
      "Avoid recessed spots directly over the table — they cast unflattering shadows on faces",
      "Never hang a chandelier too high — it becomes decorative but non-functional",
    ],
    proTip:
      "In a luxury dining setup, the cove and the pendant should always be on separate dimmers. Full brightness for family lunch, cove-only at 40% for a dinner party. Same room, two completely different experiences — that's the secret.",
  },

  // ── KITCHEN ───────────────────────────────────────────────────────────────────

  "Kitchen|Modern & Bright": {
    name: "Modern Kitchen Studio",
    moodStatement:
      "Efficient, clean and pleasantly well-lit — a kitchen you actually enjoy being in.",
    lightingStyle:
      "Balanced modern kitchen with recessed task lighting and under-cabinet strips. Counter and prep area are the priority.",
    colorTemp: "4000K Functional White 💡",
    colorTempValue: 4000,
    baseFixtures: [
      { name: "Recessed downlights", ceilingRequired: true },
      { name: "Under-cabinet LED strips", ceilingRequired: false },
      { name: "Task light over hob", ceilingRequired: false },
      { name: "Pendant over island (if applicable)", ceilingRequired: true },
    ],
    placement:
      "Downlights in a line directly over the counter zone — not evenly spread across the room centre. Under-cabinet strips full length. Dedicated task light above the cooking hob. Pendant over island at 70 cm if island exists.",
    mistakes: [
      "Avoid placing all downlights in the centre — it creates counter shadows and the chef blocks their own light",
      "Avoid warm lighting in a kitchen — it makes colour assessment of food difficult",
      "Never skip hob lighting — it's a safety and functionality essential",
    ],
    proTip:
      "Under-cabinet LED strips are the single highest-ROI lighting upgrade in any Indian kitchen. ₹1,500 of Philips or Havells strip transforms food prep safety and the entire feel of the space.",
  },

  "Kitchen|Minimal & Soft": {
    name: "Clean Minimal Kitchen",
    moodStatement:
      "No excess, no drama — just a clean, well-considered kitchen.",
    lightingStyle:
      "Minimal but functional. Recessed task lighting and under-cabinet strips only — nothing decorative, nothing unnecessary.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Recessed downlights (2–3)", ceilingRequired: true },
      { name: "Under-cabinet LED strips", ceilingRequired: false },
    ],
    placement:
      "Two or three downlights directly above the counter line — not spread to the centre. Under-cabinet strips for task fill across the full counter length.",
    mistakes: [
      "Avoid over-lighting a compact kitchen — it feels claustrophobic and clinical",
      "Avoid decorative pendants in a purely functional minimal kitchen",
      "Avoid warm yellow — even at 3000K, keep the shade neutral",
    ],
    proTip:
      "3000K works beautifully in minimal kitchens with good natural light. It reads clean without the harshness of 4000K and still renders food colours accurately enough for everyday Indian cooking.",
  },

  "Kitchen|Luxury Hotel Feel": {
    name: "Luxe Culinary Studio",
    moodStatement:
      "A kitchen that makes cooking feel like a performance worth watching.",
    lightingStyle:
      "Premium layered kitchen — functional task base with a luxury accent layer for open kitchen aesthetics. Function leads, luxury follows.",
    colorTemp: "4000K Functional White 💡",
    colorTempValue: 4000,
    baseFixtures: [
      { name: "Recessed downlights", ceilingRequired: true },
      { name: "Under-cabinet LED strips", ceilingRequired: false },
      { name: "Accent strip on top of upper cabinets (upward-facing)", ceilingRequired: false },
      { name: "Pendant lights over island", ceilingRequired: true },
    ],
    placement:
      "Downlights over all counter zones. Under-cabinet strips full length. Accent strips on top of upper cabinets facing upward — creates a floating cabinet effect. Pendants at 70 cm over island.",
    mistakes: [
      "Avoid overly warm kitchens even in luxury setups — function must always lead",
      "Avoid pendant lights that hang too low over an island work surface",
      "Avoid mixing functional and accent temperatures — keep everything at 4000K for coherence",
    ],
    proTip:
      "The accent strip on top of upper cabinets facing upward is a premium detail borrowed from European kitchen design. It creates a floating cabinet effect and adds a layer of luxury without any structural work — and costs under ₹2,000.",
  },

  // ── PUJA ROOM ─────────────────────────────────────────────────────────────────

  "Puja Room|Cozy & Warm": {
    name: "Sacred Glow Corner",
    moodStatement:
      "Stillness, warmth and soft radiance — a corner that holds the sacred lightly.",
    lightingStyle:
      "Gentle directional warm light focused on the deity area. Nothing harsh, nothing distracting — warmth as reverence.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Small diffused wall light", ceilingRequired: false },
      { name: "LED strip inside mandir unit", ceilingRequired: false },
      { name: "Warm spotlight (low wattage)", ceilingRequired: false },
    ],
    placement:
      "Wall light at 160–170 cm height, angled downward toward the deity. LED strip inside the mandir cabinet for the core glow. No light source that creates glare at eye level during prayer.",
    mistakes: [
      "Avoid harsh direct spotlights — they feel aggressive in a sacred space",
      "Avoid cool white of any kind — it strips the sanctity from the space",
      "Avoid bright overall room lighting in the puja area — it competes with the mandir focus",
    ],
    proTip:
      "The most effective puja room lighting is a warm LED strip inside or behind the mandir unit itself. It creates a natural halo effect around the deity that no external fixture can replicate — and it costs almost nothing to add.",
  },

  "Puja Room|Minimal & Soft": {
    name: "Serene Prayer Space",
    moodStatement:
      "Calm, considered and quietly reverent — a space for reflection.",
    lightingStyle:
      "Minimal warm ambient with a gentle ceiling source and internal mandir lighting. Two points of light, maximum serenity.",
    colorTemp: "3000K Warm Neutral ☀️",
    colorTempValue: 3000,
    baseFixtures: [
      { name: "Single recessed downlight (warm)", ceilingRequired: true },
      { name: "LED strip inside mandir unit", ceilingRequired: false },
    ],
    placement:
      "Single downlight positioned in front of the deity — never directly above. Internal LED strip for the mandir glow as the focal layer.",
    mistakes: [
      "Avoid multiple light sources competing in a small sacred space — less is more here",
      "Avoid positioning light directly above the deity — it flattens and shadows the face of the idol",
      "Avoid cool white or daylight temperatures — they break the meditative quality of the space",
    ],
    proTip:
      "In puja rooms with moderate daylight, the daytime experience is usually already beautiful. Your artificial lighting only needs to replicate that warmth after sundown — two warm sources is all it takes.",
  },

  "Puja Room|Luxury Hotel Feel": {
    name: "Temple Inspired Sanctum",
    moodStatement:
      "Devotion elevated — a space that feels worthy of what it holds.",
    lightingStyle:
      "Layered premium sacred space — cove ambient, internal mandir glow and a focused accent on the deity. Every layer in service of reverence.",
    colorTemp: "2700K Warm White ✨",
    colorTempValue: 2700,
    baseFixtures: [
      { name: "Slim LED cove lights", ceilingRequired: true },
      { name: "LED strip inside mandir unit", ceilingRequired: false },
      { name: "Low-wattage recessed accent spot", ceilingRequired: true },
    ],
    placement:
      "Cove on the perimeter for ambient fill at the lowest practical brightness. Internal strip inside the mandir as the heart of the setup. Single low-wattage accent spot angled at 45° toward the deity — never directly above.",
    mistakes: [
      "Avoid bright overall lighting in a dedicated puja room — it loses sanctity and feels commercial",
      "Avoid multiple competing accent spots — one focused accent, one ambient layer, one internal glow",
      "Avoid any temperature above 3000K — it breaks the warm, sacred atmosphere",
    ],
    proTip:
      "2700K is the closest artificial equivalent to the warm glow of a diya. A 2700K cove on a dimmer with a 2700K internal strip creates an atmosphere that feels genuinely sacred rather than merely decorated — and it honours the space without any overt theatrics.",
  },
};

// ─── MODIFIER FUNCTIONS ───────────────────────────────────────────────────────
// Applied in sequence by getRecommendation().
// Do not alter the logic of these functions — they are specified exactly.

function applyFalseCeilingModifier(result, hasFalseCeiling) {
  if (hasFalseCeiling) return result;
  result.fixtures = result.baseFixtures.map((f) => ({
    ...f,
    flagged: f.ceilingRequired ? true : false,
    note: f.ceilingRequired
      ? "⚠️ Requires false ceiling — skip or discuss with your contractor"
      : null,
  }));
  const flaggedCount = result.fixtures.filter((f) => f.flagged).length;
  if (flaggedCount >= 2) {
    result.placementNote = `Since your space has no false ceiling, focus on wall and floor-based sources. ${result.placementNote}`;
  }
  return result;
}

function applySpaceSizeModifier(result, spaceSize) {
  const adjustments = {
    Compact: {
      fixtureCountNote:
        "Keep fixture count minimal — 2 to 3 sources maximum to avoid overwhelming the space.",
      placementSuffix:
        "In compact spaces, place lights at the perimeter, not the center.",
    },
    Standard: { fixtureCountNote: null, placementSuffix: null },
    Spacious: {
      fixtureCountNote:
        "Scale up fixture count — spacious rooms need multiple light sources to avoid dark corners.",
      placementSuffix:
        "Zone the room into 2-3 lighting areas, each on its own circuit.",
    },
  };
  const adj = adjustments[spaceSize];
  if (adj.fixtureCountNote) result.spaceNote = adj.fixtureCountNote;
  if (adj.placementSuffix)
    result.placementNote = `${result.placementNote} ${adj.placementSuffix}`;
  return result;
}

const TEMP_SHIFT_ROOMS = ["Living Room", "Bedroom"];

function applyNaturalLightModifier(result, naturalLight, spaceType) {
  const lightCopy = {
    "Low Daylight":
      "Your space gets limited natural light, so your artificial lighting carries more weight — especially in the evenings. The fixtures below are calibrated for this.",
    "Moderate Daylight":
      "With moderate natural light, your artificial setup primarily works after 5pm. The recommendation below is optimised for evening atmosphere.",
    "Bright Daylight":
      "Your space is well-lit naturally. The lighting below is designed for evenings only — keep it warm and minimal so it doesn't compete with the sun.",
  };
  result.naturalLightNote = lightCopy[naturalLight];
  if (!TEMP_SHIFT_ROOMS.includes(spaceType)) return result;
  if (naturalLight === "Bright Daylight" && result.colorTempValue === 2700) {
    result.colorTemp = "3000K Warm Neutral ☀️";
    result.colorTempValue = 3000;
    result.colorTempShiftNote =
      "Shifted from 2700K — your bright natural light means 3000K reads warmer in context and avoids an overly orange feel.";
  }
  return result;
}

// ─── MAIN FUNCTION ─────────────────────────────────────────────────────────────

export function getRecommendation(userInputs) {
  const { spaceType, ambience, spaceSize, naturalLight, falseCeiling } =
    userInputs;
  const key = `${spaceType}|${ambience}`;
  const base = BASE_PROFILES[key];
  if (!base) {
    console.error(`Missing base profile for: ${key}`);
    return null;
  }
  let result = {
    ...base,
    fixtures: [...base.baseFixtures],
    placementNote: base.placement,
    spaceNote: null,
    naturalLightNote: null,
    colorTempShiftNote: null,
  };
  result = applyFalseCeilingModifier(
    result,
    falseCeiling === "Existing False Ceiling"
  );
  result = applySpaceSizeModifier(result, spaceSize);
  result = applyNaturalLightModifier(result, naturalLight, spaceType);
  return result;
}

// ─── WHY TEXT ASSEMBLER ────────────────────────────────────────────────────────

export function buildWhyText(userInputs, result) {
  const { spaceType, ambience, spaceSize, falseCeiling } = userInputs;
  const hasCeiling = falseCeiling === "Existing False Ceiling";
  const parts = [
    `For a ${spaceSize.toLowerCase()} ${spaceType.toLowerCase()} where you're going for a ${ambience.toLowerCase()} feel, the priority is ${result.lightingStyle.split(".")[0].toLowerCase()}.`,
    result.naturalLightNote,
    hasCeiling
      ? "Your false ceiling gives you the full toolkit — cove lighting, recessed downlights, and pendant options are all available to you."
      : "Without a false ceiling, the focus shifts to wall and floor-based sources, which can actually produce a more intimate, considered result.",
    result.spaceNote,
    result.colorTempShiftNote,
  ].filter(Boolean);
  return parts.join(" ");
}
