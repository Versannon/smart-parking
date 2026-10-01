import { openModal, closeModal } from '../utils/modal.js';

export function renderInfoModalContainer() {
  return `
    <div class="modal-overlay-backdrop" id="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="info-modal-close-btn" aria-label="Close information dialog">&times;</button>
        <div id="info-modal-body">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
}

export function openInfoModal(type, modalEl, onSelectLocation) {
  const body = modalEl.querySelector('#info-modal-body');

  if (type === 'solutions') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">lightbulb</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Parkora Solutions</h2>
        <p class="modal-subheading">Smart urban parking infrastructure tailored for modern mobility</p>
      </div>

      <div class="info-cards-stack">
        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">train</span>
            <span>Daily Metro Commuter Pass</span>
          </h3>
          <p class="info-feature-desc">Guaranteed parking spot near your daily metro station. Save 20% compared to hourly rates with instant digital QR gate check-in.</p>
        </div>

        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">ev_station</span>
            <span>EV Fast Charging Infrastructure</span>
          </h3>
          <p class="info-feature-desc">Charge while you commute. 50kW DC fast-charging pods integrated directly at reserved slots with transparent per-hour billing.</p>
        </div>

        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">business_center</span>
            <span>Corporate &amp; IT Park Fleet Parking</span>
          </h3>
          <p class="info-feature-desc">Custom employer parking allowances and reserved bay allocations for high-density office complexes and tech parks.</p>
        </div>
      </div>
    `;
  } else if (type === 'locations') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">map</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Active Cities &amp; Metro Networks</h2>
        <p class="modal-subheading">Click any city below to filter live spots in that metropolitan network</p>
      </div>

      <div class="locations-grid-2">
        <button type="button" class="location-city-card" data-city="Bengaluru">
          <h4 class="location-city-name">Bengaluru</h4>
          <p class="location-city-lines">Namma Metro Purple &amp; Green Lines</p>
          <span class="location-city-count">480+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="Mumbai">
          <h4 class="location-city-name">Mumbai</h4>
          <p class="location-city-lines">Metro Line 1, 2A &amp; 7</p>
          <span class="location-city-count">360+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="Gurugram">
          <h4 class="location-city-name">Gurugram &amp; Delhi NCR</h4>
          <p class="location-city-lines">DMRC Yellow &amp; Rapid Metro</p>
          <span class="location-city-count">290+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="">
          <h4 class="location-city-name">All Metro Networks</h4>
          <p class="location-city-lines">View all verified hubs nationwide</p>
          <span class="location-city-count">1,280+ Total Spots &rarr;</span>
        </button>
      </div>
    `;

    body.querySelectorAll('.location-city-card').forEach(btn => {
      btn.onclick = () => {
        const city = btn.dataset.city || '';
        closeModal(modalEl);
        if (onSelectLocation) onSelectLocation(city);
      };
    });
  } else if (type === 'pricing') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">payments</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Transparent Pricing</h2>
        <p class="modal-subheading">No surge pricing or hidden reservation fees</p>
      </div>

      <div class="info-cards-stack">
        <div class="pricing-tier-row">
          <div>
            <h4 class="info-feature-title">Standard Hourly Rate</h4>
            <p class="info-feature-desc">Pay only for the hours you park. Instant refund on cancellation.</p>
          </div>
          <span class="pricing-tier-amount">₹35 - ₹60<small>/hr</small></span>
        </div>

        <div class="pricing-tier-row pricing-tier-featured">
          <div>
            <span class="popular-badge">Most Popular</span>
            <h4 class="info-feature-title">Daily Metro Commuter Pass</h4>
            <p class="info-feature-desc">12 hours guaranteed parking near metro with unlimited entry/exit.</p>
          </div>
          <span class="pricing-tier-amount text-emerald">₹250<small>/day</small></span>
        </div>

        <div class="pricing-tier-row">
          <div>
            <h4 class="info-feature-title">Monthly EV Smart Charging Pass</h4>
            <p class="info-feature-desc">Reserved charging slot + 50kW DC fast charging included.</p>
          </div>
          <span class="pricing-tier-amount">₹4,999<small>/mo</small></span>
        </div>
      </div>
    `;
  } else if (type === 'privacy') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">shield_lock</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Privacy Policy</h2>
        <p class="modal-subheading">How Parkora protects your commuter &amp; vehicle data</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Data Collection:</strong> We collect only your basic account profile, vehicle registration number for ANPR gate entry, and booking timestamps.</p>
        <p><strong>2. Location Privacy:</strong> Parkora never tracks background GPS location. Search queries are processed solely to match you with nearby verified parking hubs.</p>
        <p><strong>3. Third-Party Sharing:</strong> Host partners only see your vehicle license plate and booked time window for security verification. We never sell personal data.</p>
      </div>
    `;
  } else if (type === 'terms') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">gavel</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Terms of Service</h2>
        <p class="modal-subheading">Marketplace rules for drivers and parking hosts</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Reservation Guarantee:</strong> All parking spaces listed on Parkora are verified by physical inspection. Drivers must park strictly within the designated bay shown on their pass.</p>
        <p><strong>2. Host Payouts &amp; SLA:</strong> Parking hosts receive monthly payouts on the 1st of every month via direct bank transfer or UPI and must maintain unobstructed access during active bookings.</p>
        <p><strong>3. Cancellations &amp; Refunds:</strong> Cancellations made before pass expiration receive an instant 100% refund to your Parkora Wallet.</p>
      </div>
    `;
  } else if (type === 'cookies') {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">cookie</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Cookie &amp; Storage Policy</h2>
        <p class="modal-subheading">Local storage usage for seamless experience</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Essential Storage Only:</strong> Parkora uses browser <code>localStorage</code> and <code>sessionStorage</code> strictly to keep you signed in, remember your active passes, and persist wallet balances.</p>
        <p><strong>2. Zero Ad Trackers:</strong> We do not load third-party advertising cookies or cross-site tracking pixels.</p>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">balance</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Legal Notice</h2>
        <p class="modal-subheading">Corporate &amp; regulatory compliance disclosure</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>Operator:</strong> Parkora Urban Mobility Systems Pvt. Ltd., registered in Bengaluru, Karnataka, India.</p>
        <p><strong>Support &amp; Grievance Officer:</strong> Reach our 24/7 commuter desk at <code>support@parkora.com</code> for immediate pass or gate assistance.</p>
      </div>
    `;
  }

  openModal(modalEl);
}

export function attachInfoModalEvents(modalEl) {
  const closeBtn = modalEl.querySelector('#info-modal-close-btn');
  if (closeBtn) closeBtn.onclick = () => closeModal(modalEl);
}
