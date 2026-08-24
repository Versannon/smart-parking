import { getCategoryCounts } from '../data/mockData.js';

export function renderHero() {
  const counts = getCategoryCounts();

  return `
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Find reliable parking,<br/><span class="highlight">right where you need it.</span>
        </h1>
        <p class="hero-subtitle">
          Secure spots near metro stations, workspaces, and charging hubs. Real-time availability for modern urban mobility.
        </p>

        <!-- Search Box -->
        <div class="search-box-card">
          <div class="search-input-wrapper">
            <span class="material-symbols-outlined search-icon">search</span>
            <input 
              type="text" 
              id="hero-search-input"
              class="search-input input-focus-ring" 
              placeholder="Search destination, metro, or area..." 
            />
          </div>
          <button class="btn-primary" id="search-btn" style="white-space: nowrap;">
            Find Spot
          </button>
        </div>
      </div>

      <!-- Hero Visual Card with Dynamic EV Counter -->
      <div class="hero-visual">
        <img 
          class="hero-visual-img" 
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80" 
          alt="Modern Parking Near Metro Station"
        />
        <div class="glass-card-badge">
          <div class="badge-icon-bg">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">electric_car</span>
          </div>
          <div>
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.05em; color: var(--on-surface-variant); text-transform: uppercase;">Available Now</p>
            <p style="font-family: var(--font-h); font-size: 20px; font-weight: 600; color: var(--on-surface);">${counts.liveEVSlots} EV Pods Live</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Category Tabs with Dynamic Live Counts -->
    <section class="filters-scroll">
      <button class="tab-pill active" data-category="all">
        All Spots (${counts.all})
      </button>
      <button class="tab-pill" data-category="metro">
        <span class="material-symbols-outlined" style="font-size: 18px;">train</span> Near Metro (${counts.metro})
      </button>
      <button class="tab-pill" data-category="ev">
        <span class="material-symbols-outlined" style="font-size: 18px;">ev_station</span> EV Charging (${counts.ev})
      </button>
      <button class="tab-pill" data-category="work">
        <span class="material-symbols-outlined" style="font-size: 18px;">business_center</span> Office & Work (${counts.work})
      </button>
      <button class="tab-pill" data-category="covered">
        <span class="material-symbols-outlined" style="font-size: 18px;">security</span> Covered Bays (${counts.covered})
      </button>
    </section>
  `;
}
