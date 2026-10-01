import { escapeHTML } from '../utils/html.js';

const spotImages = {
  "spot-1": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
  "spot-2": "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
  "spot-3": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
  "spot-4": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80",
  "spot-5": "https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=600&q=80",
  "spot-6": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80"
};

const CARD_FALLBACK_SVG = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 384" fill="none">
  <rect width="600" height="384" fill="#f2f4f6"/>
  <rect x="150" y="92" width="300" height="200" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="300" cy="172" r="28" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="300" y="181" text-anchor="middle" fill="#006c49" font-family="sans-serif" font-weight="bold" font-size="26">P</text>
  <text x="300" y="242" text-anchor="middle" fill="#3c4a42" font-family="sans-serif" font-size="15">Verified Parkora Bay</text>
</svg>
`);

export function renderSpotCard(spot) {
  const title = escapeHTML(spot.title);
  const address = escapeHTML(spot.address);
  const distance = escapeHTML(spot.distanceMetro);
  const spotId = escapeHTML(spot.id);
  const amenitiesSafe = (spot.amenities || [spot.covered ? 'Covered Bay' : 'Open Bay', spot.evCharging ? 'EV Fast Charge' : '24/7 CCTV']).slice(0, 3).map(escapeHTML);
  const imgSrc = spotImages[spot.id] || spotImages["spot-1"];
  const isAvailable = spot.active && spot.availableSlots > 0;

  return `
    <article class="urban-spot-card ${!isAvailable ? 'spot-unavailable' : ''}" data-id="${spotId}" tabindex="0" aria-label="${title}, ₹${spot.rateHourly} per hour">
      <div class="card-img-wrapper">
        <img 
          class="card-img" 
          src="${imgSrc}" 
          alt="${title} at ${address}" 
          loading="lazy" 
          width="600" 
          height="384"
          onerror="this.onerror=null;this.src='${CARD_FALLBACK_SVG}';"
        />
        
        ${isAvailable ? `
          <div class="slot-badge-pill">
            <div class="badge-pulse-dot" aria-hidden="true"></div>
            <span>${spot.availableSlots} Slots Left</span>
          </div>
        ` : `
          <div class="slot-badge-pill slot-badge-full">
            <span>FULL / UNAVAILABLE</span>
          </div>
        `}

        <div class="card-feature-badges">
          <div class="feature-badge-icon" title="${spot.vehicleType === 'bike' ? '2-Wheeler Parking (Bikes & Scooters)' : spot.vehicleType === 'car' ? '4-Wheeler Bay (Cars & SUVs)' : 'Compatible with Cars & 2-Wheelers'}" aria-label="Vehicle compatibility">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">${spot.vehicleType === 'bike' ? 'two_wheeler' : spot.vehicleType === 'car' ? 'directions_car' : 'commute'}</span>
          </div>
          ${spot.evCharging ? `
            <div class="feature-badge-icon" title="EV Charging Available" aria-label="EV Charging Available">
              <span class="material-symbols-outlined icon-sm icon-filled" aria-hidden="true">ev_station</span>
            </div>
          ` : ''}
          ${spot.covered ? `
            <div class="feature-badge-icon" title="Covered Bay" aria-label="Covered Bay">
              <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="card-content">
        <div class="card-header-row">
          <h3 class="card-title">${title}</h3>
          <div class="rating-badge" title="Rated ${spot.rating} out of 5 (${spot.reviewsCount || 50} reviews)">
            <span class="material-symbols-outlined star-icon" aria-hidden="true">star</span>
            <span>${spot.rating}</span>
          </div>
        </div>

        <p class="card-address">
          <span class="material-symbols-outlined icon-sm" aria-hidden="true">location_on</span>
          <span>${address}</span>
        </p>

        <div class="card-amenities-row">
          ${amenitiesSafe.map(tag => `<span class="amenity-chip">${tag}</span>`).join('')}
        </div>

        <div class="card-footer-row">
          <div class="metro-info">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">directions_walk</span>
            <span>${distance}</span>
          </div>

          <div class="card-price-action-group">
            <div class="price-display">
              ₹${spot.rateHourly}<span>/hr</span>
            </div>
            <button 
              type="button"
              class="btn-primary book-btn" 
              data-id="${spotId}" 
              ${!isAvailable ? 'disabled' : ''}
            >
              ${isAvailable ? 'Reserve' : 'Full'}
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}
