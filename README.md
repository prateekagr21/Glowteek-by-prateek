# GlowTeek

**Plan Better Lighting For Your Home**

A premium lighting recommendation web app for Indian urban homeowners — helping people make confident lighting decisions fastttt, without hiring an interior designer.

🔗 **Live demo:** 
---

## What it is

GlowTeek asks 5 quick questions about your space (room type, size, natural light, desired ambience, false ceiling) and returns a personalised lighting plan: recommended fixtures, color temperature, placement guidance, common mistakes to avoid, and a downloadable execution checklist with real brand and pricing data you can hand to your electrician.

It's not a chatbot or an AI image generator — it's a rules-based recommendation engine.

## Why I built this

This started as a portfolio project to demonstrate product thinking for GenAI PM roles — but it turned into a genuine architecture lesson worth sharing.

**The original build** used a flat 48-entry lookup table with a scoring fallback. Partway through, I realized the math didn't work: 48 entries only covered about **11% of the ~450 possible input combinations**. Most users would silently hit a fallback match — in a product whose entire value proposition is personalisation. That's a trust-killing bug hiding behind what looked like a working demo.

**The fix** was a layered dynamic assembly architecture instead:
- 25 base profiles keyed by `spaceType + ambience` — every combination has a guaranteed, direct match, zero fallbacks
- 3 sequential modifier functions (`falseCeiling` → `spaceSize` → `naturalLight`) that adjust the base recommendation non-destructively


## Tech stack

- React + Tailwind CSS
- Feedback logged via a no-cors POST to Google Forms (rating + reason + full input profile per response)
- Deployed on Vercel

## Product structure

1. **Homepage** — problem framing and entry point
2. **5-step Planner** — space type, size, natural light, ambience, false ceiling
3. **Room DNA Card** — a transition moment confirming the user's inputs
4. **Result Page** — full recommendation: lighting style, color temp, fixtures, placement, mistakes to avoid, designer tip, and a thumbs up/down feedback widget
5. **Execution Checklist** — a shareable, electrician-ready checklist with budget-tiered brand and pricing data (Budget / Mid / Premium, national Indian brands)

## What I'd build next

- Gather structured user testing data to validate the (currently assumption-based) problem statement
- Use the feedback loop to identify underperforming base profiles and explore where AI could meaningfully improve specific recommendations
- Expand the base profile set based on real usage patterns rather than assumed combinations

---

Built by Prateek as a hands-on demonstration of product architecture, MVP scoping, and execution ownership.
