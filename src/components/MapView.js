// Interactive Urban Utility Map View Component
import { escapeHTML } from '../utils/html.js';

export function renderInteractiveMap(spots, selectedSpotId = null) {
  const activeSelection = spots.find(s => s.id === selectedSpotId) || spots[0] || null;

  return `
    <div class="urban-map-layout" role="region" aria-label="Interactive Parking Map">
      <div class="urban-map-canvas" id="urban-map-canvas">
        <!-- Architectural Vector Grid & Transit Lines -->
        <svg class="urban-map-svg" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="urban-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
            </pattern>
            <pattern id="urban-subgrid" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#urban-grid)"/>
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>
            </pattern>
          </defs>
          <rect width="800" height="460" fill="#f8fafc" />
          <rect width="800" height="460" fill="url(#urban-subgrid)" />

          <!-- Urban Green Parks & Zones -->
          <rect x="70" y="60" width="140" height="90" rx="16" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
          <rect x="520" y="290" width="180" height="110" rx="20" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
          <rect x="310" y="80" width="130" height="75" rx="14" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />

          <!-- Arterial Roads -->
          <path d="M 0 180 Q 260 180 420 230 T 800 210" fill="none" stroke="#ffffff" stroke-width="14" />
          <path d="M 0 180 Q 260 180 420 230 T 800 210" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6" />
          <path d="M 260 0 L 390 460" fill="none" stroke="#ffffff" stroke-width="12" />
          <path d="M 560 0 L 480 460" fill="none" stroke="#ffffff" stroke-width="10" />

          <!-- Metro Transit Line (Emerald Corridor) -->
          <path d="M 40 360 C 190 310, 310 150, 480 170 S 670 190, 770 95" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="10 5" />
          <circle cx="176" cy="268" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
          <circle cx="368" cy="192" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
          <circle cx="545" cy="182" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
        </svg>

        <div class="map-overlay-legend">
          <span class="map-legend-item">
            <span class="map-pin-mini"></span> Active Parking Hub
          </span>
          <span class="map-legend-item">
            <span class="map-transit-line-indicator"></span> Metro Transit Line
          </span>
        </div>

        <!-- Interactive Map Pins (High-contrast Charcoal drops with Emerald center dot per DESIGN.md) -->
        ${spots.map((spot) => {
          const isSelected = activeSelection && activeSelection.id === spot.id;
          const isAvailable = spot.active && spot.availableSlots > 0;
          const x = Number(spot.mapX) || 50;
          const y = Number(spot.mapY) || 50;
          return `
            <button
              type="button"
              class="urban-map-pin ${isSelected ? 'selected' : ''} ${!isAvailable ? 'pin-unavailable' : ''}"
              style="left: ${x}%; top: ${y}%;"
              data-spot-id="${escapeHTML(spot.id)}"
              aria-label="${escapeHTML(spot.title)}, ₹${spot.rateHourly} per hour, ${spot.availableSlots} slots available"
              aria-pressed="${isSelected ? 'true' : 'false'}"
            >
              <span class="pin-price-pill">₹${spot.rateHourly}/hr</span>
              <span class="pin-drop-marker">
                <span class="pin-emerald-core"></span>
              </span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Selected Spot Inspector Panel -->
      <aside class="urban-map-inspector" id="urban-map-inspector" aria-live="polite">
        ${activeSelection ? renderInspectorCard(activeSelection) : `
          <div class="empty-state-box">
            <span class="material-symbols-outlined empty-state-icon">location_off</span>
            <h3 class="empty-state-title">No spots on map</h3>
            <p class="empty-state-desc">Adjust your search or category filter to view pins.</p>
          </div>
        `}
      </aside>
    </div>
  `;
}

function renderInspectorCard(spot) {
  const isAvailable = spot.active && spot.availableSlots > 0;
  const amenities = (spot.amenities || [
    spot.covered ? 'Covered Bay' : 'Open Air',
    spot.evCharging ? 'EV Fast Charger' : '24/7 CCTV'
  ]).map(escapeHTML);

  return `
    <div class="map-inspector-card">
      <div class="map-inspector-badge-row">
        <span class="inspector-status-pill ${isAvailable ? 'status-open' : 'status-full'}">
          <span class="badge-pulse-dot"></span>
          ${isAvailable ? `${spot.availableSlots} of ${spot.totalCapacity || 5} Slots Open` : 'Full / Paused'}
        </span>
        <span class="rating-badge">
          <span class="material-symbols-outlined star-icon">star</span>
          <span>${spot.rating} (${spot.reviewsCount || 42})</span>
        </span>
      </div>

      <h3 class="map-inspector-title">${escapeHTML(spot.title)}</h3>
      <p class="card-address">
        <span class="material-symbols-outlined icon-sm">location_on</span>
        ${escapeHTML(spot.address)}
      </p>

      <div class="map-inspector-meta">
        <div class="inspector-meta-item">
          <span class="material-symbols-outlined icon-emerald">directions_walk</span>
          <div>
            <span class="meta-label">Transit Access</span>
            <strong class="meta-val">${escapeHTML(spot.distanceMetro)}</strong>
          </div>
        </div>
        <div class="inspector-meta-item">
          <span class="material-symbols-outlined icon-emerald">${spot.evCharging ? 'ev_station' : 'verified_user'}</span>
          <div>
            <span class="meta-label">Facility Type</span>
            <strong class="meta-val">${spot.evCharging ? 'EV Charging Pod' : spot.covered ? 'Covered Security Bay' : 'Verified Driveway'}</strong>
          </div>
        </div>
      </div>

      <div class="amenity-chips-row">
        ${amenities.map(a => `<span class="amenity-chip">${a}</span>`).join('')}
      </div>

      <div class="map-inspector-footer">
        <div>
          <span class="meta-label">Hourly Rate</span>
          <div class="price-display">₹${spot.rateHourly}<span>/hr</span></div>
        </div>
        <button
          type="button"
          class="btn-primary book-btn"
          data-id="${escapeHTML(spot.id)}"
          ${!isAvailable ? 'disabled' : ''}
        >
          ${isAvailable ? 'Reserve This Spot' : 'Unavailable'}
        </button>
      </div>
    </div>
  `;
}
