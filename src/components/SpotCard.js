const spotImages = {
  "spot-1": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
  "spot-2": "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
  "spot-3": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
  "spot-4": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80",
  "spot-5": "https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=600&q=80",
  "spot-6": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80"
};

export function renderSpotCard(spot) {
  const imgSrc = spotImages[spot.id] || spotImages["spot-1"];
  const isAvailable = spot.active && spot.availableSlots > 0;

  return `
    <div class="urban-spot-card ${!isAvailable ? 'spot-unavailable' : ''}" data-id="${spot.id}">
      <div class="card-img-wrapper">
        <img class="card-img" src="${imgSrc}" alt="${spot.title}" />
        
        ${isAvailable ? `
          <div class="slot-badge-pill">
            <div class="badge-pulse-dot"></div>
            ${spot.availableSlots} Slots Left
          </div>
        ` : `
          <div class="slot-badge-pill" style="background-color: var(--on-surface-variant); color: #fff;">
            FULL / UNAVAILABLE
          </div>
        `}

        ${spot.evCharging ? `
          <div class="feature-badge-icon">
            <span class="material-symbols-outlined" style="font-size: 18px; font-variation-settings: 'FILL' 1;">ev_station</span>
          </div>
        ` : ''}
      </div>

      <div class="card-content">
        <div class="card-header-row">
          <h3 class="card-title">${spot.title}</h3>
          <div class="rating-badge">
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--tertiary); font-variation-settings: 'FILL' 1;">star</span>
            <span>${spot.rating}</span>
          </div>
        </div>

        <p class="card-address">
          <span class="material-symbols-outlined" style="font-size: 18px;">location_on</span>
          ${spot.address}
        </p>

        <div class="card-footer-row">
          <div class="metro-info">
            <span class="material-symbols-outlined" style="font-size: 18px;">directions_walk</span>
            ${spot.distanceMetro}
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="price-display">
              ₹${spot.rateHourly}<span>/hr</span>
            </div>
            <button 
              class="btn-primary book-btn" 
              data-id="${spot.id}" 
              ${!isAvailable ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
            >
              ${isAvailable ? 'Reserve' : 'Full'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
