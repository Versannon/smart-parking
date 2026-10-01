# Parkora — Screen Recording Walkthrough & Project Feedback Script

Use this script while screen-recording your live demonstration of **Parkora**. It pairs natural spoken commentary with exact on-screen clicks so you can read it smoothly from top to bottom.

---

## ⚙️ Quick Pre-Recording Checklist (15 Seconds Before You Hit Record)
1. Open the site with `?preloader=1` at the end of the URL (or open a fresh tab) so the full **Radar Preloader** plays when you start.
2. If you previously tested bookings/approvals, log in as **Admin** → click **Reset Demo Data** → click **Logout** so you start from a clean state.
3. Set browser zoom to **100%** and enter fullscreen (`F11`).

---

## 🎙️ Scene-by-Scene Spoken Script & Screen Actions

### 1. Intro & Radar Preloader (0:00 – 0:20)
* **On Screen:** Reload the page (`Ctrl + R`) so the **Urban Utility Radar Preloader** sweeps across the screen, revealing the Hero section.
* **What to Say:**
  > *"Hi everyone, this is a walkthrough and project review of **Parkora** — a smart urban parking marketplace built to solve last-mile commuter parking near metro stations, office hubs, and EV charging corridors.*
  >
  > *Right from the initial load, we use a GSAP-powered radar preloader—complete with a skip-intro option and session-aware timing—that transitions into our **Urban Utility** light theme. We deliberately designed the interface around high-contrast clarity: crisp white surfaces, deep charcoal typography, and emerald accents that strictly signal live availability and primary actions."*

---

### 2. Hero Search, Category Filters & Live Map View (0:20 – 0:55)
* **On Screen:**
  1. Point to the **Live EV Pods** badge on the Hero image and the **Arrival Date & Time** selectors.
  2. Click a quick-search chip like **Bengaluru** or **Mumbai**, then click **Reset Filters**.
  3. Click through the category pills (**Near Metro**, **EV Charging**, **Covered Bays**, **4-Wheeler**, **2-Wheeler**).
  4. Use the **Sort** dropdown (*Price: Low to High*), then toggle from **Grid** to **Map View** and click 2–3 map pins to show the **Spot Inspector** updating live on the right with vehicle compatibility.
* **What to Say:**
  > *"In the hero section, commuters immediately see live EV pod availability and can filter spots by location, arrival date and time, and vehicle compatibility—including dedicated 4-Wheeler car and 2-Wheeler scooter tabs, near metro stations, and EV charging corridors.*
  >
  > *Notice how every filter, sort option, and view change automatically syncs to the URL query parameters—making any filtered view bookmarkable and shareable.*
  >
  > *We also built an interactive **Map View** alongside the card grid. Clicking any high-contrast charcoal-and-emerald pin on the transit corridor updates the live Spot Inspector panel, showing walking distance to the nearest metro gate, security amenities, vehicle type support, and hourly rates."*

---

### 3. Role-Based Demo Login, Dedicated Wallet & Customer Booking Flow (0:55 – 1:40)
* **On Screen:**
  1. Switch back to **Grid View**. Click **Login / Sign In** in the top navbar.
  2. Click **Alex Commuter (Customer)** in the Quick Demo Login list (point out the non-blocking toast notification in the bottom-right).
  3. Click the **Wallet pill (`₹1,250 +`)** in the navbar to open the new **Parkora Digital Wallet Modal**.
  4. Point out the available balance card, click a preset chip like **+ ₹500** (or switch to UPI / Card), click **Add to Wallet** to trigger confetti, and point to the live **Transaction History** ledger below.
  5. Close the wallet, click **Reserve** on any available spot card.
  6. Inside the **Booking Modal**, select vehicle type (*4-Wheeler* or *2-Wheeler*), pick an **Arrival Time**, adjust the **Parking Duration** stepper (`+` / `-`), and click **Confirm Slot & Pay**.
  7. Show the confetti burst and the **Digital QR Gate Pass**, then click **View My Bookings**, show the **Active Passes** tab with **Copy Pass Code**, click **Cancel Pass & 100% Refund**, and switch to the **Booking History & Refunds** tab to show the audit record and instant wallet refund!
* **What to Say:**
  > *"To make evaluating the platform effortless, we included a one-click role switcher supporting three distinct personas: Customer, Parking Owner, and System Admin.*
  >
  > *Signing in as **Alex Commuter** reveals our interactive **Parkora Wallet**. Clicking the wallet button opens a full wallet management dashboard featuring live balance monitoring, instant UPI and card top-up simulation, and a persistent transaction audit ledger.*
  >
  > *When reserving a spot, drivers choose vehicle compatibility, arrival time window, adjust parking duration with live price calculation, and validate their license plate. Confirming the booking deducts the wallet balance, logs a transaction, updates spot capacity across the app, and generates a **Digital QR Gate Pass**.*
  >
  > *From **My Bookings**, commuters can copy gate access codes or cancel passes for an instant 100% wallet refund. Switching to the **Booking History & Refunds** tab preserves a transparent audit trail of past and refunded bookings."*

---

### 4. Host Monetization Calculator & Owner Portal (1:40 – 2:15)
* **On Screen:**
  1. Scroll down to the **Monetize Your Driveway** section and drag the **Booked hours / day** slider back and forth to show the monthly income estimate updating live.
  2. Click the logout icon in the top-right, click **Login**, and select **Sarah Jenkins (Parking Owner)**.
  3. Click **Host Portal** in the navbar.
  4. Click **+ Add New Spot**, type a quick title (e.g., *"HSR Layout Metro Bay"*), address (*"Sector 2, Bengaluru"*), rate (`45`), and click **Submit Listing for Verification**.
  5. Click the **Active / Paused** toggle on one of Sarah's existing spots.
* **What to Say:**
  > *"Parkora is a two-sided marketplace. Scrolling down to the Host section, property owners can use the interactive **Earnings Calculator** slider to project their monthly passive income based on daily utilization.*
  >
  > *Switching to **Sarah Jenkins**, our Parking Host persona, opens the **Host Portal**. Here, owners track their live monthly earnings, active listing count, and real-time occupancy rate. Hosts can pause or activate existing bays with one click—which immediately updates the public search grid—or submit a new driveway listing into the verification queue."*

---

### 5. Master Admin Governance & Approval Workflow (2:15 – 2:45)
* **On Screen:**
  1. Close the Host Portal, click Logout, click **Login**, and select **System Admin (Administrator)**.
  2. Point out the red **Admin Panel** button with the pending count badge in the header, and click it.
  3. Click **Approve Listing** on the spot you just submitted (or one of the pending spots).
  4. Close the Admin modal and show the newly approved spot now live at the top of the search grid!
* **What to Say:**
  > *"Finally, switching to the **System Admin** role reveals the governance side of the platform. The Admin badge in the navbar shows the exact number of pending host submissions.*
  >
  > *Inside the **Master Admin Panel**, we see platform-wide revenue, active bookings, total live spots, and user role governance. When we click **Approve Listing** on the spot we just submitted, it is immediately published to the live search grid and map view—completing the full end-to-end loop between Host, Admin, and Commuter."*

---

### 6. Closing Technical Summary (2:45 – 3:00)
* **On Screen:**
  1. Press `Escape` to close any open modal.
  2. Click one of the footer links (e.g., **Privacy Policy** or **Locations**) or shrink the browser window briefly to show the **Mobile Hamburger Drawer**, then return to full width.
* **What to Say:**
  > *"Under the hood, the entire application is built with modular vanilla JavaScript and Vite, featuring full keyboard focus trapping and Escape-key dismissal on all dialogs, HTML sanitization against XSS, lazy-loaded imagery with SVG fallbacks, and full mobile drawer responsiveness. Thank you for watching!"*
