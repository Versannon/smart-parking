export function renderHero() {
  return `
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">
          Guaranteed Parking Spots<br/>Near <span>Metro & Workplace</span>
        </h1>
        <p class="hero-subtitle">
          Reserve private driveways, EV charging slots, and covered metro parking in seconds. No endless circling around blocks.
        </p>

        <div class="filter-tabs">
          <button class="tab-btn active" data-category="all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
            All Verified Spots
          </button>
          <button class="tab-btn" data-category="metro">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/></svg>
            Near Metro Stations
          </button>
          <button class="tab-btn" data-category="ev">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            EV Charging Pods
          </button>
          <button class="tab-btn" data-category="work">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Office & Tech Parks
          </button>
        </div>
      </div>
    </section>
  `;
}
