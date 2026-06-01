# Bharat Book of Records - Product Requirements Document (GRILLED)

## 1. Executive Summary

**What:** A centralized event discovery platform that aggregates and showcases Facebook event posts in a modern, searchable web interface.

**Why Now:** Event organizers and attendees lack a unified way to discover local events. By centralizing Facebook posts, we create a dedicated hub that increases discoverability and engagement.

**Success Metric:** All of the following:

- Page views per session
- User engagement time on platform
- Click-through rate to original Facebook events
- User account registrations (future)

---

## 2. Problem Statement

### Context

Users currently discover events scattered across Facebook. Event organizers struggle to increase visibility beyond their existing followers. There's no centralized directory for browsing and discovering events happening in their region.

### Why This Matters

- **For Event Seekers:** Time-consuming to find events; miss opportunities due to platform fragmentation
- **For Event Organizers:** Limited reach beyond Facebook followers; difficult to measure discoverability

---

## 3. User Personas & Their Needs

### Persona 1: Event Seeker

- **Goal:** Discover interesting local events
- **Pain Point:** Events scattered across Facebook; hard to browse all at once
- **Success:** Easily browse, filter, and click through to event details

### Persona 2: Event Organizer / Client

- **Goal:** Increase visibility and attendance for their events
- **Pain Point:** Limited reach beyond existing followers
- **Success:** Posts appear in centralized directory, driving traffic back to Facebook

---

## 4. Product Scope & Features

### MVP (Phase 1 - Build Ready)

#### Core Pages & Routes

**A. Homepage (`/`)**

- **Hero Section**
  - Headline: "Discover Events Near You"
  - Subheadline: "Browse the latest events from your favorite organizers"
  - CTA Button: "Explore Events"

- **Stats Section** ⭐ _[NEW - ADDED FOR WOW FACTOR]_
  - Display key metrics:
    - Total events available (e.g., "1,247 events this month")
    - Upcoming events count (e.g., "342 happening this week")
    - Total organizers (e.g., "280+ event organizers")
  - **Purpose:** Creates impressive first impression of platform scale & vibrancy

- **Featured Events Carousel** ⭐ _[UPDATED]_
  - Format: **Hero carousel/slider** (visually prominent, larger cards)
  - Content: 6-8 most recent posts that have media attachments (photo, video, or album)
  - Show per card: Large image (4:3 aspect ratio), title, organizer, date badge, media type icon
  - Selection logic: **Most recent posts with any media type**
  - Features: Auto-rotate, manual navigation, smooth transitions

- **Recent Events Grid Section**
  - Format: **Responsive grid** (mobile: 1 col, tablet: 2 col, desktop: 3 col)
  - Content: Recent posts (all posts not featured)
  - Show per card: Image, title, description snippet, date, organizer, media type icon
  - Link: "View on Facebook"

- **Call-to-Action Section**
  - Text: "Want to feature your event?"
  - CTA Button: "Add Your Event" → links to `/contact`

**B. Events Grid Page (`/events`)**

- **Filter & Sort Bar** ⭐ _[NEW - CRITICAL FOR INTUITIVE UX]_
  - **Media Type Filters:** photo, video, album, link (checkboxes)
  - **Date Filters:** "This week", "This month", "Upcoming", "All time"
  - **Sort Options:** Newest first (descending), Oldest first (ascending)
  - **Behavior:** Sticky header, persists while scrolling

- **Event Cards Grid**
  - Layout: 3 columns on desktop (responsive)
  - Card content:
    - Thumbnail image (first attachment, see Image Selection Logic below)
    - Post title (from message, truncated)
    - Organizer/source name
    - Date posted (humanized: "2 hours ago")
    - Media type badge (photo, video, album, link)
    - "View Details" button → links to `/events/[id]`

- **Loading State** ⭐ _[NEW]_
  - Display skeleton card loaders while fetching data
  - Improves perceived performance

- **Empty State** ⭐ _[NEW]_
  - Message when filters return no results: "No events found for this category. Try adjusting your filters."
  - Show suggestion to clear filters or browse all events

- **Error State** ⭐ _[NEW]_
  - Message: "Failed to load events. Please refresh the page."
  - Retry button

**C. Event Detail Page (`/events/[id]`)** ⭐ _[UPGRADED TO REQUIRED MVP]_

- **Hero Image / Gallery**
  - Show first attachment as hero image (large)
  - If multiple attachments: Image gallery viewer

- **Content Section**
  - Full post title
  - Full post description/message
  - Event date & time (if extractable from message)
  - Organizer name

- **Attachments Display**
  - Photos: Image gallery
  - Videos: Embedded player (if extractable)
  - Albums: Thumbnail grid
  - Links: Link preview card

- **Call-to-Action**
  - Primary: "View on Facebook" button (large, prominent)
  - Secondary: "Share" button (Twitter, WhatsApp, copy link)

**D. About Page (`/about`)** ⭐ _[NEW PAGE - ADDED FOR TRUST & CONTEXT]_

- **Mission Statement Section**
  - Why Bharat Book of Records exists
  - Vision for unified event discovery

- **How It Works Section**
  - 3-step explanation for **Event Seekers:** Browse → Filter → Attend
  - 3-step explanation for **Event Organizers:** Post on Facebook → Appear here → Drive attendance

- **Impact/Stats Section**
  - Reuse stats from homepage (total events, organizers, visitors)

- **Call-to-Action**
  - "List Your Event" button → links to `/contact`

**E. Contact Page (`/contact`)** ⭐ _[NEW PAGE - FOR LEAD GENERATION & ORGANIZER OUTREACH]_

- **Heading & Intro**
  - "Add Your Event to Bharat Book of Records"
  - Brief explanation: "Help us showcase your events to thousands of potential attendees"

- **Contact Form Fields** ⭐ _[DEFINED CAPTURE FIELDS]_
  - Name (text input, required)
  - Email (email input, required)
  - Event Category (dropdown or select: Concerts, Sports, Workshops, Meetups, Other)
  - Message/Details (textarea, required)
  - Submit button: "Submit"

- **Confirmation Behavior**
  - Show success message: "Thanks! We'll review your submission soon."
  - Store submissions (CSV or email to admin—details TBD)

### Out of Scope (Phase 2+)

- User authentication / accounts
- Favorites / bookmarks
- Advanced full-text search
- Real-time notifications
- Direct integration with Facebook API (auto-sync)
- Admin dashboard
- Event organizer analytics

---

## 5. Technical Requirements

### Data Structure (Already Defined)

- Posts contain: id, message, created_time, full_picture, attachments, permalink_url, is_published, is_hidden
- Attachments: varied schema (photos, videos, albums, links)
- Source: Static JSON from Facebook exports

### Image Selection Logic ⭐ _[CLARIFIED]_

**Primary thumbnail source (in order of preference):**

1. **First attachment image** (from `attachments[0].media.image.src`)
2. **Fallback:** Branded placeholder (event calendar icon or gradient)

**Rationale:** Attachments provide the most accurate visual representation of the event content.

### Featured Events Logic ⭐ _[DEFINED]_

**Selection criteria:**

- Filter for posts with any media attachment (photo, video, or album)
- Sort by `created_time` (most recent first)
- Take first 6-8 posts

**Refresh:** Daily or on data update (manual trigger for now)

### Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui
- **Data Validation:** Zod
- **Fetching:** better-fetch
- **Language:** TypeScript

### Page Routes (Finalized)

```
/                    → Homepage (hero + stats + featured carousel + recent grid)
/events              → Full events grid/list view with filters
/events/[id]         → Event detail page
/about               → About page (mission + how it works + stats)
/contact             → Contact form for organizers
```

### UI Components Needed

- Navigation bar (header with logo, nav links, "Add Event" CTA)
- Hero banner section
- Stats cards component
- Featured carousel component (auto-rotating slider)
- Event card component (reusable for grid)
- Event grid container (responsive, with filter bar)
- Filter bar component (sticky, media types + date + sort)
- Image gallery component (for detail page)
- Contact form component (with validation)
- CTA sections
- Loading skeleton component
- Empty state component
- Error state component
- Footer

---

## 6. Success Criteria (How We'll Know This Works)

### Quantitative

- ✅ Zero errors loading/rendering Facebook post data
- ✅ All posts visible in grid within 3 seconds (performance)
- ✅ Click-through rate to Facebook (track via analytics)
- ✅ Session engagement time > 1 minute
- ✅ Contact form submissions captured (lead gen metric)

### Qualitative

- ✅ Homepage immediately communicates purpose + scale (stats visible)
- ✅ Events are visually appealing and easy to scan
- ✅ Mobile experience is smooth and responsive
- ✅ Users can easily filter/sort and find events
- ✅ Featured carousel creates "wow" factor
- ✅ About page builds trust with visitors
- ✅ Contact page converts organizers to submissions

---

## 7. Design Direction

**Visual Style:** Modern, clean, card-based layout with carousel highlight

- **Color Palette:** Professional (blues/grays with vibrant accent color for CTAs)
- **Typography:** Clean sans-serif (Tailwind defaults)
- **Spacing:** Generous whitespace, consistent padding
- **Imagery:** Bold event photos as focal points
- **Interactive Elements:** Smooth animations, hover states, clear feedback

**Responsive Design:**

- Mobile-first approach
- Mobile: 1-column grid
- Tablet: 2-column grid
- Desktop: 3-column grid
- Touch-friendly buttons (min 44px tap target)
- Sticky filter bar on `/events`

---

## 8. Navigation Structure ⭐ _[FINALIZED]_

**Header Navigation (All Pages):**

- Logo (clickable, links to `/`)
- "Explore Events" (links to `/events`)
- "About" (links to `/about`)
- "Contact" (links to `/contact`)
- Prominent CTA Button: "Add Your Event" (links to `/contact`, distinct styling)

**Footer:**

- Links: Home, Events, About, Contact
- Copyright & social media links (future)

---

## 9. Open Decisions (Resolved in This Grill)

- [x] Should event detail page be included in MVP? → **YES, now required**
- [x] Add `/about` and `/contact` pages? → **YES, both required**
- [x] Featured events selection logic? → **Most recent posts with media**
- [x] Featured vs. Recent visual hierarchy? → **Featured = carousel, Recent = grid**
- [x] Image source for thumbnails? → **First attachment (most accurate)**
- [x] Filtering on `/events`? → **Media types, date, sort only (no full-text search)**
- [x] Contact form fields? → **Name, Email, Event Category, Message**
- [x] About page content? → **Mission + how it works + stats + CTA**
- [x] Loading/error/empty states? → **Yes, all three with visual feedback**

---

## 10. Definition of Done

**Frontend is ready to ship when:**

1. ✅ Homepage renders with hero, stats, featured carousel, and recent grid
2. ✅ Featured carousel auto-rotates and is manually navigable
3. ✅ Events page displays all posts in responsive grid with filters
4. ✅ Filter bar works (media types, date, sort)
5. ✅ Event detail page shows full content + gallery
6. ✅ All posts load without errors
7. ✅ Images load properly (first attachment priority, fallback to placeholder)
8. ✅ Loading skeleton states display while fetching
9. ✅ Empty states show when filters return no results
10. ✅ Error states display when data fails
11. ✅ Mobile experience is tested and responsive
12. ✅ Links to Facebook posts work
13. ✅ About page communicates mission & trust
14. ✅ Contact form validates and captures submissions
15. ✅ Navigation structure is complete (all pages linked)
16. ✅ Performance metrics (Lighthouse score > 80)
17. ✅ TypeScript with zero strict mode errors
18. ✅ Accessibility basics met (alt text, contrast, keyboard nav)

---

## 11. Appendix: Data Example

From your Zod schema, a post looks like:

```json
{
  "id": "string",
  "message": "Event description",
  "created_time": "2024-01-15T10:00:00+0000",
  "full_picture": "https://...",
  "attachments": {
    "data": [
      {
        "media": { "image": { "src": "url", "width": 500, "height": 400 } },
        "media_type": "photo",
        "type": "photo",
        "url": "https://facebook.com/...",
        "title": "Event Title"
      }
    ]
  },
  "permalink_url": "https://facebook.com/...",
  "is_published": true,
  "is_hidden": false
}
```

### Media Type Filters

- **photo:** Single photo
- **video:** Video content
- **album:** Photo album
- **link:** External link or share

---

## 12. Summary of Changes (from Original to Grilled)

### Pages Added

- ✅ `/about` — Trust, mission, how it works, stats
- ✅ `/contact` — Lead generation form

### Features Added

- ✅ Stats section on homepage
- ✅ Featured carousel (not grid)
- ✅ Filter bar on `/events` (media types, date, sort)
- ✅ Event detail page (upgraded from optional to required)
- ✅ Loading, empty, and error states
- ✅ Sticky navigation with prominent "Add Event" CTA

### Logic Clarified

- ✅ Featured selection: "Most recent with media"
- ✅ Thumbnail image: "First attachment"
- ✅ Form fields: Name, Email, Category, Message
- ✅ Visual hierarchy: Carousel vs. grid

### Result

**This PRD is now implementation-ready.** All ambiguities resolved. Dev team can build without re-clarification loops.

---

**PRD Version:** 2.0 (GRILLED) | **Date:** 2026-06-01 | **Status:** Implementation Ready 🚀
