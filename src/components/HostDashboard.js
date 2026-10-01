import { getDynamicHostStats } from '../data/mockData.js';
import { getCurrentUser } from '../utils/auth.js';

export function renderHostSection() {
  const user = getCurrentUser();
  const targetHostId = (user && user.role === 'owner') ? user.id : 'user-owner-1';
  const hostStats = getDynamicHostStats(targetHostId);
  const formattedIncome = hostStats ? hostStats.monthlyIncome.toLocaleString() : '14,500';
  const isLoggedInOwner = Boolean(user && user.role === 'owner');

  return `
    <section class="host-banner-container" id="host-monetization-section">
      <div class="host-banner-flex">
        <div class="host-banner-copy">
          <span class="section-overline-label">HOST PARTNER PROGRAM</span>
          <h2 class="host-banner-title">Monetize Your Driveway</h2>
          <p class="host-banner-desc">
            Have an empty parking spot near a transit hub or office park? List it on Parkora and start earning passive income with automated digital gate passes.
          </p>
          <div class="host-banner-actions">
            <button type="button" class="btn-primary btn-lg" id="list-space-btn">
              ${isLoggedInOwner ? 'Manage Your Listings' : 'List Your Space'}
            </button>
            <button type="button" class="btn-secondary btn-lg" id="learn-host-btn">Learn More</button>
          </div>
        </div>

        <div class="host-calculator-card">
          <div class="host-calc-header">
            <span class="material-symbols-outlined icon-emerald-lg icon-filled" aria-hidden="true">payments</span>
            <div>
              <p class="host-calc-income" id="host-calc-income-display">₹${formattedIncome}<small>/mo</small></p>
              <p class="host-calc-subtitle">${isLoggedInOwner ? `Your Live Host Earnings (${hostStats.activeListingsCount} active)` : 'Estimated Host Earnings'}</p>
            </div>
          </div>

          <div class="host-calc-slider-wrap">
            <div class="host-calc-slider-labels">
              <label for="host-hours-slider">Booked hours / day</label>
              <strong id="host-hours-val">6 hrs/day @ ₹45/hr</strong>
            </div>
            <input
              type="range"
              id="host-hours-slider"
              class="urban-range-slider"
              min="2"
              max="14"
              step="1"
              value="6"
              aria-label="Estimate monthly host earnings by booked hours per day"
            />
          </div>
        </div>
      </div>
    </section>
  `;
}
