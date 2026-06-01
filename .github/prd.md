# Bharat Book of Records - Product Requirements Document

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

#### Core Pages & Sections

**A. Homepage**

- Hero Section
  - Headline: "Discover Events Near You"
  - Subheadline: "Browse the latest events from your favorite organizers"
  - CTA: "Explore Events"
- Featured Events Section
  - Display 6-8 hero/high-engagement posts in a grid
  - Show: thumbnail, title, organizer name, event date
- Categories/Recent Events Section
  - List recent posts in a responsive grid (mobile: 1 col, tablet: 2 col, desktop: 3 col)
  - Show: image, title, description snippet, date, link to Facebook
- Call-to-Action Section
  - "Be Featured" / "Add Your Event" (future signup/integration)

**B. Events Grid/List Page**

- Full event listing (all posts from data)
- Grid layout by default (3 columns on desktop)
- Card design for each post:
  - Thumbnail image (from full_picture or attachments)
  - Post title (from message, truncated)
  - Organizer/source
  - Date posted (from created_time, humanized: "2 hours ago")
  - Quick view of attachment types (video, photo, link badges)
  - "View on Facebook" link

**C. Event Detail Page** (Optional MVP)

- Full post content
- Full-size image gallery (if multiple attachments)
- Post description
- Attachment details (video players, photo albums, link previews)
- "View on Facebook" button
- Share options

### Out of Scope (Phase 2+)

- User authentication / accounts
- Favorites / bookmarks
- Advanced search & filters
- Real-time notifications
- Direct integration with Facebook API (auto-sync)
- Admin dashboard

---

## 5. Technical Requirements

### Data Structure (Already Defined)

- Posts contain: id, message, created_time, full_picture, attachments, permalink_url, is_published, is_hidden
- Attachments: varied schema (photos, videos, albums, links)
- Source: Static JSON from Facebook exports

### Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui
- **Data Validation:** Zod
- **Fetching:** better-fetch
- **Language:** TypeScript

### Page Routes (Suggested)

```
/                    → Homepage with hero + featured + recent events
/events              → Full events grid/list view
/events/[id]         → Event detail page (optional MVP)
```

### UI Components Needed

- Navigation bar (simple header with logo, nav links)
- Hero banner section
- Event card component (reusable for grid)
- Event grid container (responsive)
- Image gallery (if building detail page)
- CTA sections
- Footer

---

## 6. Success Criteria (How We'll Know This Works)

### Quantitative

- ✅ Zero errors loading/rendering Facebook post data
- ✅ All posts visible in grid within 3 seconds (performance)
- ✅ Click-through rate to Facebook (track via analytics)
- ✅ Session engagement time > 1 minute

### Qualitative

- ✅ Homepage immediately communicates purpose
- ✅ Events are visually appealing and easy to scan
- ✅ Mobile experience is smooth and responsive
- ✅ Users can easily find and share events

---

## 7. Design Direction

**Visual Style:** Modern, clean, card-based layout

- **Color Palette:** Professional (suggest: blues/grays with accent color for CTAs)
- **Typography:** Clean sans-serif (Tailwind defaults)
- **Spacing:** Generous whitespace, consistent padding
- **Imagery:** Bold event photos as focal points

**Responsive Design:**

- Mobile-first approach
- Mobile: 1-column grid
- Tablet: 2-column grid
- Desktop: 3-column grid
- Touch-friendly buttons (min 44px tap target)

---

## 8. Open Decisions & Next Steps

- [ ] Should event detail page be included in MVP? (Currently optional)
- [ ] What's the data refresh strategy? (Static JSON for now, or auto-sync later?)
- [ ] Which image from attachments should be the primary thumbnail?
- [ ] Should we add basic search by post message content?
- [ ] Metadata: Add Google Analytics for tracking click-throughs?

---

## 9. Definition of Done

**Frontend is ready to ship when:**

1. ✅ Homepage renders with hero, featured events, and event grid
2. ✅ Events page displays all posts in responsive grid
3. ✅ All posts load without errors
4. ✅ Images load properly from attachment data
5. ✅ Mobile experience is tested and responsive
6. ✅ Links to Facebook posts work
7. ✅ Performance metrics (Lighthouse score > 80)
8. ✅ TypeScript with zero strict mode errors
9. ✅ Accessibility basics met (alt text, contrast, keyboard nav)

---

## 10. Appendix: Data Example

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

---

**PRD Version:** 1.0 | **Date:** 2026-06-01 | **Status:** Ready for Build
