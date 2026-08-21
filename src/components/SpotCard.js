export function renderSpotCard(spot) {
  return `
    <div class="spot-card" data-id="${spot.id}">
      <div>
        <div class="spot-header">
          <div>
            <h3 class="spot-title">${spot.title}</h3>
            <p class="spot-address">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${spot.address}
            </p>
          </div>
          <span class="spot-badge badge-available">
            ${spot.availableSlots} Slots Left
          </span>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
          ${spot.evCharging ? `<span class="spot-badge badge-ev">⚡ EV Fast Charging</span>` : ''}
          <span class="spot-badge" style="background: rgba(255, 255, 255, 0.05); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1);">
            ⭐ ${spot.rating} (${spot.reviewsCount})
          </span>
        </div>
      </div>

      <div class="spot-details">
        <div>
          <div class="spot-price">₹${spot.rateHourly}<span>/hr</span></div>
          <div class="metro-dist">${spot.distanceMetro}</div>
        </div>

        <button class="btn btn-primary book-btn" data-id="${spot.id}">
          Reserve Slot
        </button>
      </div>
    </div>
  `;
}
