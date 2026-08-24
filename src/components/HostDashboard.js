export function renderHostSection() {
  return `
    <section class="host-banner-container">
      <div class="host-banner-flex">
        <div style="max-width: 600px;">
          <h2 class="host-banner-title">Monetize Your Driveway</h2>
          <p class="host-banner-desc">
            Have an empty parking spot near a transit hub? List it on Parkora and start earning passive income today with zero hassle.
          </p>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <button class="btn-primary" id="list-space-btn">List Your Space</button>
            <button class="btn-secondary" id="learn-host-btn">Learn More</button>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: center;">
          <div style="background-color: var(--surface-container-lowest); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-level-1); border: 1px solid var(--surface-variant); text-align: center; min-width: 220px;">
            <span class="material-symbols-outlined" style="font-size: 40px; color: var(--primary-container); margin-bottom: 8px; font-variation-settings: 'FILL' 1;">payments</span>
            <p style="font-family: var(--font-h); font-size: 28px; font-weight: 700; color: var(--on-surface);">₹8,500<span style="font-size: 14px; font-weight: 400; color: var(--on-surface-variant);">/mo</span></p>
            <p style="font-size: 13px; font-weight: 600; color: var(--on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Avg Host Earnings</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
