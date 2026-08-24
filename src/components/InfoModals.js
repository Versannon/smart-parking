export function renderInfoModalContainer() {
  return `
    <div class="modal-overlay-backdrop" id="info-modal">
      <div class="modal-container-card" style="max-width: 600px; width: 95%;">
        <button class="modal-close-icon" id="info-modal-close-btn">&times;</button>
        <div id="info-modal-body">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
}

export function openInfoModal(type, modalEl) {
  const body = modalEl.querySelector('#info-modal-body');
  
  if (type === 'solutions') {
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="material-symbols-outlined" style="font-size: 40px; color: var(--primary-container);">lightbulb</span>
        <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Parkora Solutions</h2>
        <p style="font-size: 14px; color: var(--on-surface-variant);">Smart urban parking infrastructure tailored for modern mobility</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h3 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface); display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--primary-container);">train</span> Daily Metro Commuter Pass
          </h3>
          <p style="font-size: 13px; color: var(--on-surface-variant); margin-top: 4px;">Guaranteed parking spot near your daily metro station. Save 20% compared to hourly rates with auto-checkin.</p>
        </div>

        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h3 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface); display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--primary-container);">ev_station</span> EV Fast Charging Infrastructure
          </h3>
          <p style="font-size: 13px; color: var(--on-surface-variant); margin-top: 4px;">Charge while you commute. 50kW DC fast-charging pods integrated directly at reserved slots.</p>
        </div>

        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h3 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface); display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--primary-container);">business_center</span> Corporate & IT Park Fleet Parking
          </h3>
          <p style="font-size: 13px; color: var(--on-surface-variant); margin-top: 4px;">Custom employer parking allowances and reserved bay allocations for office complexes.</p>
        </div>
      </div>
    `;
  } else if (type === 'locations') {
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="material-symbols-outlined" style="font-size: 40px; color: var(--primary-container);">map</span>
        <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Active Cities & Metro Networks</h2>
        <p style="font-size: 14px; color: var(--on-surface-variant);">Over 1,200+ verified spots across major metropolitan hubs</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div style="background: var(--surface-container-low); padding: 14px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Bengaluru</h4>
          <p style="font-size: 12px; color: var(--on-surface-variant);">Namma Metro Purple & Green Lines</p>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-container); margin-top: 6px; display: block;">480+ Verified Spots</span>
        </div>
        <div style="background: var(--surface-container-low); padding: 14px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Mumbai</h4>
          <p style="font-size: 12px; color: var(--on-surface-variant);">Metro Line 1, 2A & 7</p>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-container); margin-top: 6px; display: block;">360+ Verified Spots</span>
        </div>
        <div style="background: var(--surface-container-low); padding: 14px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Gurugram & Delhi NCR</h4>
          <p style="font-size: 12px; color: var(--on-surface-variant);">DMRC Yellow & Rapid Metro</p>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-container); margin-top: 6px; display: block;">290+ Verified Spots</span>
        </div>
        <div style="background: var(--surface-container-low); padding: 14px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
          <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Hyderabad</h4>
          <p style="font-size: 12px; color: var(--on-surface-variant);">L&T Metro Red & Blue Corridors</p>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-container); margin-top: 6px; display: block;">150+ Verified Spots</span>
        </div>
      </div>
    `;
  } else if (type === 'pricing') {
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="material-symbols-outlined" style="font-size: 40px; color: var(--primary-container);">payments</span>
        <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Transparent Pricing</h2>
        <p style="font-size: 14px; color: var(--on-surface-variant);">No surge pricing or hidden reservation fees</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Standard Hourly Rate</h4>
            <p style="font-size: 13px; color: var(--on-surface-variant);">Pay only for the hours you park. Minute-level precision.</p>
          </div>
          <span style="font-family: var(--font-h); font-size: 20px; font-weight: 700; color: var(--on-surface);">₹35 - ₹60<span style="font-size: 12px; font-weight: 400;">/hr</span></span>
        </div>

        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--primary-container); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: var(--primary-container); color: #fff; text-transform: uppercase;">Most Popular</span>
            <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface); margin-top: 4px;">Daily Metro Commuter Pass</h4>
            <p style="font-size: 13px; color: var(--on-surface-variant);">12 Hours guaranteed parking near metro with unlimited entry/exit.</p>
          </div>
          <span style="font-family: var(--font-h); font-size: 20px; font-weight: 700; color: var(--primary-container);">₹250<span style="font-size: 12px; font-weight: 400;">/day</span></span>
        </div>

        <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">Monthly EV Smart Charging Pass</h4>
            <p style="font-size: 13px; color: var(--on-surface-variant);">Reserved charging slot + electricity included.</p>
          </div>
          <span style="font-family: var(--font-h); font-size: 20px; font-weight: 700; color: var(--on-surface);">₹4,999<span style="font-size: 12px; font-weight: 400;">/mo</span></span>
        </div>
      </div>
    `;
  } else {
    // Legal / Policy
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="material-symbols-outlined" style="font-size: 36px; color: var(--on-surface-variant);">gavel</span>
        <h2 style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--on-surface);">Terms & Policies</h2>
      </div>

      <div style="font-size: 13px; color: var(--on-surface-variant); line-height: 1.6; max-height: 300px; overflow-y: auto; background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default);">
        <p><strong>1. Reservation & Verification:</strong> All parking spaces listed on Parkora are verified by physical inspection or host verification. Users must park strictly within the designated slot number provided in their digital pass.</p>
        <br/>
        <p><strong>2. Host Monetization:</strong> Parking hosts receive monthly payouts on the 1st of every month via direct bank transfer or UPI. Hosts guarantee slot accessibility during booked hours.</p>
        <br/>
        <p><strong>3. Cancellation & Refunds:</strong> Cancellations made up to 30 minutes before booking start time are 100% refundable.</p>
      </div>
    `;
  }

  modalEl.classList.add('active');
}

export function attachInfoModalEvents(modalEl) {
  const closeBtn = modalEl.querySelector('#info-modal-close-btn');
  closeBtn.onclick = () => modalEl.classList.remove('active');
  modalEl.onclick = (e) => {
    if (e.target === modalEl) modalEl.classList.remove('active');
  };
}
