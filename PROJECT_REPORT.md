# Parkora — Smart Parking Platform
## Comprehensive Internship Project Report

---

## 1. Executive Summary & Problem Statement

Urban mobility in major metropolitan areas faces a critical bottleneck: **parking availability near high-density hubs** such as metro stations, IT corridors, and financial districts. Drivers waste an average of 15 to 20 minutes per trip circling blocks to find parking, contributing to urban congestion, increased carbon emissions, and commuter stress.

**Parkora** is a smart, real-time parking platform engineered to bridge the gap between drivers needing guaranteed parking and property/space owners with unutilized driveways or private parking slots. By connecting urban commuters directly to verified nearby parking spots with distance-to-metro metrics and instant booking capabilities, Parkora optimizes urban space utilization while creating a secondary revenue stream for hosts.

---

## 2. Platform Architecture & System Overview

Parkora is built as a lightweight, high-performance Single Page Application (SPA) leveraging modular ES modules, custom design tokens, and utility animations.

```
smart_parking/
├── index.html              # Main HTML entrypoint
├── package.json            # Project dependencies & build scripts
├── vite.config.js          # Vite bundler configuration (relative base for GitHub Pages)
├── .gitignore              # Dependency & build exclusions
├── dist/                   # Compiled production assets
└── src/
    ├── main.js             # Application initialization & DOM event delegation
    ├── components/
    │   ├── Preloader.js    # 4-Second GSAP radar preloader component
    │   ├── Header.js       # Sticky blur navigation header
    │   ├── Hero.js         # Hero section & interactive filter tabs
    │   ├── SpotCard.js     # Dynamic spot card generator with badges
    │   ├── BookingModal.js # Reservation modal & confetti celebration
    │   └── HostDashboard.js# Host monetization CTA banner
    ├── data/
    │   └── mockData.js     # Real-time mock data for metro, EV, & work spots
    └── styles/
        └── main.css        # Core design system, HSL tokens, & responsive layout
```

---

## 3. Key Technical & User Experience Features

### 3.1. Smart Parking Radar Preloader
- **Real-Time Scanning Feedback**: Features a 4-second animated radar sweep with concentric rings, pulsing location markers, and progressive status messaging using GSAP timelines.
- **Micro-Animations**: Smooth percentage counters and status transitions ("Scanning Metro & Work spots...", "Verifying EV Charging...", "Locking optimal Parkora slot...").

### 3.2. Dynamic Category Filtering
- Drivers can instantaneously filter verified parking spots by category:
  - **All Verified Spots**: Complete catalog of available slots.
  - **Near Metro Stations**: Specialized for daily metro commuters (shows distance to nearest metro station).
  - **EV Charging Pods**: Equipped with fast-charging EV infrastructure.
  - **Office & Tech Parks**: Dedicated reserved slots near tech hubs.

### 3.3. Interactive Spot Cards & Real-Time Availability
- Every card displays crucial information at a glance:
  - Location title and address.
  - Metro proximity indicators (e.g., `250m to MG Road Metro`).
  - Hourly rates (e.g., `₹40/hr`).
  - Real-time availability badges (`AVAILABLE`, `EV CHARGING`).
  - One-click **Reserve Spot** CTA button.

### 3.4. Seamless Reservation Modal & Confetti Celebration
- Instant modal overlay with backdrop glassmorphic blur.
- Live price calculation based on selected parking duration.
- Interactive vehicle number input validation.
- Animated confirmation celebrating successful booking with `canvas-confetti`.

### 3.5. Host Space Monetization Banner
- Dedicated banner inviting property and driveway owners to list empty spaces.
- Highlights potential host earnings (up to ₹8,500/month).

---

## 4. Technology Stack & Design System

| Layer | Technology / Tool | Rationale |
| :--- | :--- | :--- |
| **Core Architecture** | HTML5, Modern ES6 JavaScript | Frameworkless modularity for zero overhead and fast initial load. |
| **Styling & System** | Vanilla CSS (CSS Grid, Flexbox, HSL) | Tailored glassmorphism, responsive breakpoints, zero CSS framework bloat. |
| **Animations** | GSAP (GreenSock Animation Platform) | Precise timeline control for the 4-second radar preloader sequence. |
| **Icons & Effects** | Lucide Icons, Canvas-Confetti | Clean, lightweight SVG iconography and interactive booking feedback. |
| **Build & Tooling** | Vite v6 | Lightning-fast HMR and optimized production asset bundling. |
| **Deployment** | GitHub Pages (`gh-pages` branch) | Continuous deployment directly from dedicated build branch. |

---

## 5. Deployment & CI/CD Workflow

1. **Production Build**: Bundled using Vite (`npm run build`) targeting clean relative paths (`base: './'`).
2. **Dual-Branch Architecture**:
   - `main`: Contains all source files (`src/`, `package.json`, `vite.config.js`, `.gitignore`).
   - `gh-pages`: Dedicated orphan branch serving static output (`index.html`, `assets/`) directly at root level.
3. **Live Hosting URL**: `https://versannon.github.io/smart-parking/`

---

## 6. Future Enhancements Roadmap

- **GPS & Navigation Integration**: Direct deep-linking to Google Maps/Apple Maps for turn-by-turn navigation to reserved spots.
- **Real-Time IoT Sensor Sync**: Integration with hardware ultrasonic occupancy sensors for live spot status updates.
- **Host Dashboard Portal**: Full space management interface allowing hosts to set custom pricing, availability schedules, and payout methods.
