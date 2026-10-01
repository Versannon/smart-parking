# Parkora — Smart Urban Parking Marketplace Platform
## Comprehensive Technical & Internship Project Report

- **Project Name:** Parkora — Smart Urban Parking Platform (`v1.0.0`)
- **Author:** Soham (`Versannon`)
- **Repository:** `https://github.com/Versannon/smart-parking`
- **Live Deployment:** `https://versannon.github.io/smart-parking/`
- **Design System:** Urban Utility (High-Contrast Minimalism-Plus)
- **Technology Stack:** Modular ES6 JavaScript, HTML5, CSS3 Custom Properties, Vite 6, GSAP 3.15, Lenis Smooth Scroll, Canvas-Confetti
- **Report Date:** September 2026

---

## 1. Executive Summary & Problem Statement

### 1.1 The Urban Last-Mile Parking Bottleneck
Rapid urbanization across Indian metropolitan corridors—such as Bengaluru, Mumbai, and Gurugram/Delhi NCR—has created a severe last-mile mobility bottleneck near high-density transit hubs, metro stations, IT parks, and commercial districts. Commuters spend an average of **15 to 20 minutes per trip** searching for safe parking, resulting in:
1. **First/Last-Mile Transit Friction:** Daily commuters avoid public metro systems because station parking lots fill up before 9:00 AM.
2. **EV Charging Range Anxiety:** Electric vehicle owners lack guaranteed charging bays where they park during work or transit hours.
3. **Underutilized Private Infrastructure:** Thousands of residential driveways, apartment bays, and commercial slots within 50m–500m of metro gates sit vacant during daytime hours.
4. **Traffic Congestion & Emissions:** Cruising for parking accounts for up to 30% of localized urban traffic congestion and avoidable tailpipe emissions.

### 1.2 The Parkora Solution
**Parkora** is a two-sided, role-governed smart urban parking marketplace engineered to connect daily commuters with verified private and commercial parking bays near metro corridors, EV charging hubs, and office parks.

Built around the **"Urban Utility"** design language, Parkora operates as a complete three-persona ecosystem:
- **Commuters (Drivers):** Discover spots via real-time search, category pills, or an interactive vector transit map; inspect walking distance to metro gates and security amenities; top up an in-app wallet; book slots with live duration pricing; receive an instant **Digital QR Gate Pass**; and cancel passes for an instant 100% wallet refund.
- **Parking Hosts (Property Owners):** Estimate passive income using an interactive utilization calculator; monitor live monthly earnings, active listings, and real-time occupancy rates in the **Host Portal**; toggle spot availability (`Active` / `Paused`) in real time; and submit new driveways into the verification queue.
- **System Administrators:** Monitor platform-wide gross revenue, active bookings, live spots, and registered users via the **Master System Admin Panel**; review and approve or reject pending host listings; and reset demo state with one click.

---

## 2. System Architecture & Engineering Design

### 2.1 Modular Zero-Framework SPA Architecture
Parkora is engineered using clean, frameworkless **ES6 Modules** bundled with **Vite 6**. By eschewing heavy virtual-DOM runtime overhead in favor of deterministic DOM rendering and a reactive custom event bus (`parkora-auth-change` and `parkora-data-change`), the application achieves sub-second interactivity, tiny bundle weight, and zero external state-library complexity.

```text
smart_parking/
├── index.html                        # Application shell, meta tags, font preconnects & skip link
├── package.json                      # Dependencies (gsap, lenis, canvas-confetti, lucide) & scripts
├── vite.config.js                    # Vite v6 bundler config (relative base './' for GitHub Pages)
├── DEMO_VIDEO_TRANSCRIPT.md          # Scene-by-scene live walkthrough & recording script
├── PROJECT_REPORT.md                 # Comprehensive markdown technical project report
├── PROJECT_REPORT.pdf                # Publication-grade multi-page PDF project report
├── public/
│   ├── manifest.json                 # Progressive Web App (PWA) standalone manifest
│   └── robots.txt                    # Search crawler directives
├── stitch_smart_parking_design_system/
│   ├── DESIGN.md                     # "Urban Utility" design tokens, typography & elevation spec
│   ├── code.html                     # Static design system reference prototype
│   └── screen.png                    # High-resolution reference UI capture
└── src/
    ├── main.js                       # SPA orchestrator, URL state sync, filter/sort engine & listeners
    ├── components/
    │   ├── Preloader.js              # Session-aware GSAP radar preloader with skip-intro control
    │   ├── Header.js                 # Role-aware sticky navbar, wallet pill & mobile drawer
    │   ├── Hero.js                   # Search bar, popular city chips, live EV pod counter & tabs
    │   ├── SpotCard.js               # Accessible spot card with SVG fallback & live slot badge
    │   ├── MapView.js                # Interactive SVG vector transit map & live Spot Inspector
    │   ├── BookingModal.js           # Duration stepper, wallet check, regex validation & QR pass
    │   ├── MyBookingsModal.js        # Active pass management, clipboard copy & instant refund
    │   ├── HostDashboard.js          # "Monetize Your Driveway" section & interactive income slider
    │   ├── OwnerDashboard.js         # Host Portal modal, KPI metrics, status toggle & spot form
    │   ├── AdminDashboard.js         # Master Admin Panel, approval queue & demo state reset
    │   ├── LoginModal.js             # 1-click role switcher (Customer, Owner, Admin) & login form
    │   └── InfoModals.js             # Solutions, Locations, Pricing & Legal/Privacy dialogs
    ├── data/
    │   └── mockData.js               # Persistent data store, calculation engines & state mutations
    ├── styles/
    │   └── main.css                  # Complete "Urban Utility" CSS design system (~55 KB)
    └── utils/
        ├── auth.js                   # Tamper-resistant localStorage auth & wallet manager
        ├── html.js                   # HTML entity sanitizer (escapeHTML) for XSS prevention
        ├── modal.js                  # Accessible focus trap, Escape handler & MutationObserver
        └── toast.js                  # HTML5 Popover API top-layer non-blocking toast notifications
```

### 2.2 Reactive Event-Driven State Management
State synchronization across independent UI components is orchestrated through browser-native `CustomEvent` dispatching and `localStorage` persistence:
1. **Authentication Events (`parkora-auth-change`):** Triggered whenever a user logs in (`loginAsUser`, `loginWithCredentials`), logs out (`logoutUser`), or modifies their wallet balance (`updateUserWallet`).
2. **Data Mutation Events (`parkora-data-change`):** Triggered whenever a booking is created (`processNewBooking`), cancelled (`cancelUserBooking`), a host submits a spot (`addNewSpot`), a host toggles spot status (`toggleSpotStatus`), or an admin approves/rejects a listing (`approvePendingSpot`, `rejectPendingSpot`, `resetDemoData`).
3. **URL Query Synchronization (`syncUrlParams`):** Every change to category (`cat`), search query (`q`), sort order (`sort`), or display mode (`view`) is mirrored to the browser URL via `window.history.replaceState()`, making every filtered view bookmarkable and shareable.

---

## 3. Three-Sided Marketplace Workflows & Calculation Engines

### 3.1 Role-Based Demo Personas (`src/utils/auth.js`)
To streamline evaluation and testing, Parkora provides a 1-click Quick Demo Login switcher supporting three distinct personas:

| Persona Name | User ID | Role | Initial Wallet | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Alex Commuter** | `user-customer-1` | `customer` | `₹1,250` | Top up wallet (`+₹500`), reserve spots, view/copy QR Gate Passes, cancel passes for instant 100% refund. |
| **Sarah Jenkins** | `user-owner-1` | `owner` | `₹1,500` | Access Host Portal, view live monthly income (`₹14,500+`) & occupancy rate, pause/activate spots, submit new spots. |
| **System Admin** | `user-admin-1` | `admin` | `₹2,000` | Access Master Admin Panel, monitor platform revenue (`₹1,84,500+`), approve/reject pending host spots, reset demo data. |

### 3.2 Dynamic Financial & Occupancy Calculation Formulas (`src/data/mockData.js`)
- **Platform Gross Revenue:**
  $$\text{Total Revenue} = \text{Base Platform Revenue } (₹1,84,500) + \sum_{b \in \text{ActiveBookings}} b.\text{totalPaid}$$
- **Host Monthly Income:**
  $$\text{Host Monthly Income} = \text{Base Host Earnings } (₹14,500) + \sum_{b \in \text{HostActiveBookings}} b.\text{totalPaid}$$
- **Host Real-Time Occupancy Rate:**
  $$\text{Occupancy Rate (\%)} = \text{round}\left(\frac{\sum \text{TotalCapacity} - \sum \text{ActiveAvailableSlots}}{\sum \text{TotalCapacity}} \times 100\right)$$
- **Interactive Host Earnings Calculator (`HostDashboard.js`):**
  $$\text{Projected Monthly Income} = \text{Booked Hours/Day } (2\text{--}14) \times ₹45\text{/hr} \times 26\text{ Working Days}$$

---

## 4. Core Technical & UX Features

### 4.1 Session-Aware GSAP Radar Preloader (`Preloader.js`)
- Uses **GSAP 3.15** timelines to animate concentric radar rings, a rotating emerald sweep beam, percentage counters, and four progressive telemetry stages (*"Scanning nearby Metro & Work parking spots..."* → *"Locking optimal Parkora slot..."*).
- **Adaptive Duration:** Runs for `2.4s` on initial session visit, `0.65s` on subsequent reloads within the same `sessionStorage` session, or `4.0s` when explicitly triggered via `?preloader=1`. Includes an interactive **Skip Intro →** button.

### 4.2 Interactive Architectural Vector Map & Spot Inspector (`MapView.js`)
- Toggle seamlessly between the responsive **3-Column Card Grid** and the **Interactive Map View**.
- Renders a custom scalable SVG urban grid (`viewBox="0 0 800 460"`) featuring arterial roads, green park zones, and a dashed **Emerald Metro Transit Corridor**.
- Plots each filtered spot at its `(mapX, mapY)` coordinate using high-contrast Charcoal price pins (`₹40/hr`) with an Emerald core dot.
- Clicking any pin updates the **Spot Inspector** side panel (`aria-live="polite"`) with live open/total slot counts, star rating, metro walking distance, facility classification, amenity chips, and a direct **Reserve This Spot** CTA.

### 4.3 Smart Booking Engine & Digital QR Gate Pass (`BookingModal.js`, `MyBookingsModal.js`)
- **Live Wallet Validation:** Compares total booking price ($\text{rateHourly} \times \text{selectedHours}$) against the user's current wallet balance. Provides an inline `+ ₹500` instant top-up button if funds are insufficient.
- **Input Validation:** Enforces vehicle registration format (`/^[A-Z0-9 -]{4,16}$/`), integer duration bounds (`1–12 hours`), and active slot availability (`availableSlots >= 1`).
- **Digital Gate Pass Ticket:** Upon confirmation, triggers a `canvas-confetti` celebration, deducts wallet balance, decrements spot capacity across all views, and renders a custom SVG QR Gate Pass with a unique pass code (`PRK-XXXX`).
- **Instant Cancellation & Refund:** From **My Active Passes**, users can copy their pass code to the clipboard or click **Cancel Pass & Refund**, which immediately restores `+1` slot to the parking spot and refunds 100% of the paid amount to the user's wallet.

### 4.4 Host Portal & Master Admin Governance Loop (`OwnerDashboard.js`, `AdminDashboard.js`)
- **Host Listing Submission:** Owners submit new parking spots with title, address (automatically inferring city across Bengaluru, Mumbai, or Gurugram), category, hourly rate (`₹10–₹500`), metro distance, EV charger toggle, and covered bay status.
- **Admin Verification Queue:** Submitted spots enter `pendingSpots` and increment the red notification badge on the **Admin Panel** header button. When the Administrator clicks **Approve Listing**, the spot is assigned map coordinates, default 5.0 rating, and amenity tags, and immediately appears at the top of the public search grid and map view.

---

## 5. "Urban Utility" Design System (`DESIGN.md` & `src/styles/main.css`)

Parkora implements a bespoke design system named **Urban Utility**, prioritizing high-contrast legibility, generous whitespace, and structural precision over dark cyberpunk glows.

### 5.1 Color Token Architecture
| Token Name | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `surface-container-lowest` | `#FFFFFF` | Pure White primary card, modal, and input surfaces |
| `background` / `surface` | `#F7F9FB` | Airy slate-tinted page canvas for subtle card separation |
| `primary-container` | `#10B981` | Primary Emerald for CTAs, active badges, and transit lines |
| `primary` | `#006C49` | Deep Emerald for high-contrast text accents and focus rings |
| `on-surface` | `#191C1E` | Deep Charcoal for primary typography, borders, and map pins |
| `secondary` | `#565E74` | Muted Slate for secondary metadata, addresses, and captions |
| `error` | `#BA1A1A` | Crimson Alert for admin badges, destructive actions, and warnings |

### 5.2 Typography & Layout Rhythm
- **Headings (`Outfit`):** Geometric sans-serif (`600–800` weight, `-0.02em` tracking) for commanding hierarchy.
- **Body & UI Controls (`Plus Jakarta Sans`):** High x-height, generous `1.5–1.6` line height for effortless scanning.
- **Monospace Telemetry (`JetBrains Mono`):** Used for vehicle license plates (`KA 01 AB 7890`) and gate pass codes (`PRK-9482`).
- **Spatial Grid & Elevation:** 12-column desktop grid (`64px` outer margins, `24px` gutters) and 4-column mobile grid (`16px` margins) built on an `8px` base unit, paired with 3-tier diffused ambient shadows.

---

## 6. Security Hardening, Accessibility (WCAG 2.1 AA) & Performance

1. **XSS Mitigation (`src/utils/html.js`):** All user-supplied and dynamic data fields rendered into HTML templates pass through `escapeHTML()`, neutralizing `&`, `<`, `>`, `"`, and `'` characters.
2. **LocalStorage Tamper Protection (`src/utils/auth.js`):** Because `localStorage` is client-editable, `getCurrentUser()` validates stored user IDs against the immutable `MOCK_USERS` whitelist and sanitizes `walletBalance` values, preventing privilege escalation or `NaN` injection.
3. **Accessible Dialog Management (`src/utils/modal.js`):** Uses a `MutationObserver` on `.modal-overlay-backdrop` to enforce `Tab` / `Shift+Tab` focus trapping, `Escape` key dismissal, backdrop click dismissal, `document.body` scroll locking, and automatic focus restoration.
4. **Top-Layer Toast Notifications (`src/utils/toast.js`):** Leverages the modern HTML5 `popover="manual"` API to promote notifications into the browser's top layer above open modals, paired with `aria-live="polite"`.
5. **Resilient Media & Reduced Motion:** Includes inline URI-encoded SVG fallbacks (`HERO_FALLBACK_SVG`, `CARD_FALLBACK_SVG`) via `onerror` handlers so the UI remains visually intact even offline, and respects `prefers-reduced-motion: reduce`.

---

## 7. Initial Dataset Catalog & Deployment

### 7.1 Default Verified Parking Spots (`DEFAULT_SPOTS`)
| ID | Spot Title | City & Address | Category | Rate | Distance | EV / Covered | Capacity | Rating |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `spot-1` | Metro Station Gate 2 Slot A | Whitefield Metro, Bengaluru | `metro` | `₹40/hr` | 50m from Gate 2 | EV + Covered | 4 / 5 | 4.9 ★ (128) |
| `spot-2` | Tech Park Driveway #14 | Koramangala 4th Block, Bengaluru | `work` | `₹35/hr` | 300m from Sony World | Open Bay | 2 / 4 | 4.8 ★ (84) |
| `spot-3` | Terminal 2 Premium EV Pod | Airport Road, Mumbai | `ev` | `₹60/hr` | Airport Link Station | EV + Covered | 6 / 8 | 5.0 ★ (210) |
| `spot-4` | Andheri Metro Covered Bay | Andheri West Metro, Mumbai | `metro` | `₹45/hr` | 80m from Platform 1 | EV + Covered | 3 / 6 | 4.7 ★ (96) |
| `spot-5` | Cyber City Private Slot | DLF Phase 2, Gurugram | `work` | `₹50/hr` | 150m from Rapid Metro | Covered Bay | 1 / 3 | 4.9 ★ (142) |
| `spot-6` | Solar EV Fast Charger Spot | Indiranagar 100ft Rd, Bengaluru | `ev` | `₹55/hr` | 400m from Metro | EV + Solar | 5 / 6 | 4.85 ★ (175) |

### 7.2 Build & Deployment Pipeline
- **Development Server:** `npm run dev` launches Vite with instant Hot Module Replacement (HMR).
- **Production Bundle:** `npm run build` compiles and minifies assets into `dist/` using relative base paths (`base: './'`).
- **GitHub Pages Hosting:** Deployed to `https://versannon.github.io/smart-parking/` via the `gh-pages` branch.

---

## 8. Future Enhancements Roadmap

1. **IoT Ultrasonic & ANPR Hardware Integration:** Connect physical ultrasonic bay occupancy sensors and Automatic Number Plate Recognition (ANPR) boom barriers via MQTT/WebSockets for zero-touch gate entry.
2. **Real-Time Payment Gateway & UPI AutoPay:** Integrate Razorpay / UPI intent flows for instant wallet top-ups and automated monthly host payouts.
3. **Geospatial Backend & Turn-by-Turn Navigation:** Migrate state persistence to a PostgreSQL + PostGIS backend with deep links to Google Maps and Apple Maps for last-mile navigation to the exact driveway entrance.
4. **Dynamic Surge & Commuter Pass Subscriptions:** Introduce recurring monthly Metro Commuter Passes (`₹250/day` and `₹4,999/mo` EV Smart Charging tiers) with automated slot reservation windows.
