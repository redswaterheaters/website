
# Plan: Visual Hierarchy, Copy Cleanup, and CTA Updates

## Overview
Three targeted changes to improve the site's visual design and content quality.

---

## 1. Improve Visual Hierarchy

**Problem**: Too many white/light sections in a row create visual monotony.

**Current section backgrounds**:
- Hero: Navy
- Introduction: White
- Services: Light gray
- Why Choose Us: White
- Contact: Light gray
- Footer: Navy

**Solution**: Change the "Why Choose Us" section background from white to the navy accent color (`bg-accent`), with white text for contrast. This creates better rhythm:

- Hero: Navy
- Introduction: White  
- Services: Light gray
- Why Choose Us: **Navy** (changed)
- Contact: Light gray
- Footer: Navy

**File**: `src/components/WhyChooseUs.tsx`
- Change section background from `bg-white` to `bg-accent`
- Remove the light gray top border (not needed on dark background)
- Update all text colors to work on dark background (headings and descriptions become white/light)
- Keep feature cards white for contrast against the dark section

---

## 2. Remove M-Dashes from Copy

**Problem**: Em-dashes (—) can feel overly formal or AI-generated.

**Found in** `src/components/Services.tsx`:
- Line 13: "Gas, electric, or hybrid**—**we help you choose..."
- Line 20: "We service all major brands and models**—**no job too big..."

**Solution**: Replace em-dashes with periods or simpler punctuation:
- "Gas, electric, or hybrid. We help you choose..."
- "We service all major brands and models. No job too big..."

---

## 3. Update Services CTA to "Contact Us"

**Current**: "Learn More" button with arrow icon
**New**: "Contact Us" button that scrolls to the contact section

**File**: `src/components/Services.tsx`
- Change button text from "Learn More" to "Contact Us"
- Add scroll-to-contact functionality (same pattern used in Hero and Navigation)
- Keep the arrow icon for visual consistency

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/WhyChooseUs.tsx` | Dark background, updated text colors |
| `src/components/Services.tsx` | Remove em-dashes, update CTA text and add scroll function |

---

## Technical Details

### WhyChooseUs.tsx Changes
- Section: `bg-white border-t border-gray-200` becomes `bg-accent`
- Header label: Already `text-primary` (red) - stays the same
- Header title: `text-accent` becomes `text-primary-foreground` (white)
- Feature cards: Keep `bg-white` for contrast on dark background
- Card text remains unchanged since cards stay white

### Services.tsx Changes
- Add `scrollToContact` function (copy from Hero component pattern)
- Update button from:
  ```jsx
  <button className="...">Learn More<ArrowRight /></button>
  ```
  to:
  ```jsx
  <button onClick={scrollToContact} className="...">Contact Us<ArrowRight /></button>
  ```
- Fix descriptions:
  - "hybrid—we" to "hybrid. We"
  - "models—no" to "models. No"
