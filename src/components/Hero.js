import { getCategoryCounts } from '../data/mockData.js';

const HERO_FALLBACK_SVG = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <rect width="800" height="500" fill="#f2f4f6"/>
  <path d="M0 360L800 360" stroke="#cbd5e1" stroke-width="3"/>
  <rect x="90" y="130" width="220" height="230" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="350" y="90" width="240" height="270" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="420" y="210" width="100" height="150" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <circle cx="470" cy="155" r="24" fill="#10b981"/>
  <text x="470" y="163" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="22">P</text>
</svg>
`);

export function renderHero() {
  const counts = getCategoryCounts();

  return `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-eyebrow-pill">
          <span class="badge-pulse-dot"></span>
          <span>Live Urban Transit &amp; EV Parking Network</span>
        </div>

        <h1 class="hero-title">
          Find reliable parking,<br/><span class="highlight">right where you need it.</span>
        </h1>
        <p class="hero-subtitle">
          Secure spots near metro stations, workspaces, and charging hubs. Real-time availability for modern urban mobility.
        </p>

        <!-- Search Box with Location, Date & Time -->
        <div class="search-box-card" role="search">
          <div class="search-input-wrapper">
            <span class="material-symbols-outlined search-icon" aria-hidden="true">search</span>
            <input 
              type="search" 
              id="hero-search-input"
              class="search-input input-focus-ring" 
              placeholder="Search destination, metro, city, or area..." 
              aria-label="Search parking spots by destination, metro, or area"
              autocomplete="off"
            />
          </div>

          <div class="search-datetime-group">
            <div class="search-select-field">
              <span class="material-symbols-outlined icon-xs text-muted" aria-hidden="true">calendar_today</span>
              <select id="hero-date-select" class="select-inline input-focus-ring" aria-label="Select arrival date">
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="weekend">This Weekend</option>
              </select>
            </div>

            <div class="search-select-field">
              <span class="material-symbols-outlined icon-xs text-muted" aria-hidden="true">schedule</span>
              <select id="hero-time-select" class="select-inline input-focus-ring" aria-label="Select arrival time">
                <option value="now">Now (Immediate)</option>
                <option value="09:00">09:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>

          <button type="button" class="btn-primary search-submit-btn" id="search-btn">
            Find Spot
          </button>
        </div>

        <div class="hero-quick-tags">
          <span class="quick-tag-label">Popular:</span>
          <button type="button" class="quick-search-chip" data-query="Whitefield">Whitefield</button>
          <button type="button" class="quick-search-chip" data-query="Mumbai">Mumbai</button>
          <button type="button" class="quick-search-chip" data-query="Indiranagar">Indiranagar</button>
          <button type="button" class="quick-search-chip" data-query="Gurugram">Gurugram</button>
        </div>
      </div>

      <!-- Hero Visual Card with Dynamic EV Counter -->
      <div class="hero-visual">
        <img 
          class="hero-visual-img" 
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80" 
          alt="Modern Parking Near Metro Station"
          fetchpriority="high"
          width="1200"
          height="760"
          onerror="this.onerror=null;this.src='${HERO_FALLBACK_SVG}';"
        />
        <div class="glass-card-badge">
          <div class="badge-icon-bg">
            <span class="material-symbols-outlined icon-filled" aria-hidden="true">electric_car</span>
          </div>
          <div>
            <p class="glass-badge-label">Available Now</p>
            <p class="glass-badge-value">${counts.liveEVSlots} EV Pods Live</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Category Tabs with Dynamic Live Counts -->
    <section class="filters-scroll" role="tablist" aria-label="Filter parking spots by category and vehicle">
      <button type="button" role="tab" aria-selected="true" class="tab-pill active" data-category="all">
        All Spots (${counts.all})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="metro">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">train</span> Near Metro (${counts.metro})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="ev">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">ev_station</span> EV Charging (${counts.ev})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="work">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">business_center</span> Office &amp; Work (${counts.work})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="covered">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span> Covered Bays (${counts.covered})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="car">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">directions_car</span> 4-Wheeler (${counts.car || 5})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="bike">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">two_wheeler</span> 2-Wheeler (${counts.bike || 3})
      </button>
    </section>
  `;
}
