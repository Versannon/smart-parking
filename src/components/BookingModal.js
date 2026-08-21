import confetti from 'canvas-confetti';

export function renderBookingModal() {
  return `
    <div class="modal-overlay" id="booking-modal">
      <div class="modal-card">
        <button class="modal-close" id="modal-close-btn">&times;</button>
        <div id="modal-content">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
}

export function openBookingModal(spot, modalEl) {
  const contentEl = modalEl.querySelector('#modal-content');
  let selectedHours = 2;

  function updatePrice() {
    const total = spot.rateHourly * selectedHours;
    const totalEl = modalEl.querySelector('#modal-total-price');
    if (totalEl) totalEl.textContent = `₹${total}`;
  }

  contentEl.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-flex; padding: 12px; background: rgba(16, 185, 129, 0.15); border-radius: 50%; color: var(--primary); margin-bottom: 12px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.3V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
      </div>
      <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff;">Reserve ${spot.title}</h2>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${spot.address}</p>
    </div>

    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 0.9rem; color: var(--text-muted);">Hourly Rate</span>
        <span style="font-weight: 700; color: #fff;">₹${spot.rateHourly} / hr</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 0.9rem; color: var(--text-muted);">Duration</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-secondary" id="dur-minus" style="padding: 4px 12px;">-</button>
          <span id="dur-val" style="font-weight: 700; font-family: var(--font-mono); font-size: 1.1rem;">2 hrs</span>
          <button class="btn btn-secondary" id="dur-plus" style="padding: 4px 12px;">+</button>
        </div>
      </div>

      <div style="border-top: 1px dashed var(--border-color); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: #fff;">Total Payable</span>
        <span id="modal-total-price" style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">₹${spot.rateHourly * 2}</span>
      </div>
    </div>

    <button class="btn btn-primary" id="confirm-booking-btn" style="width: 100%; justify-content: center; padding: 14px; font-size: 1rem;">
      Confirm Slot & Pay Now
    </button>
  `;

  modalEl.classList.add('active');

  const durVal = modalEl.querySelector('#dur-val');
  modalEl.querySelector('#dur-minus').onclick = () => {
    if (selectedHours > 1) {
      selectedHours--;
      durVal.textContent = `${selectedHours} hrs`;
      updatePrice();
    }
  };

  modalEl.querySelector('#dur-plus').onclick = () => {
    if (selectedHours < 12) {
      selectedHours++;
      durVal.textContent = `${selectedHours} hrs`;
      updatePrice();
    }
  };

  modalEl.querySelector('#confirm-booking-btn').onclick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    contentEl.innerHTML = `
      <div style="text-align: center; padding: 16px 0;">
        <div style="width: 64px; height: 64px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Slot Guaranteed!</h2>
        <p style="color: var(--text-muted); margin: 8px 0 20px; font-size: 0.95rem;">
          Your parking pass for <strong>${spot.title}</strong> has been confirmed for <strong>${selectedHours} hours</strong>.
        </p>

        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--border-highlight); border-radius: 12px; padding: 12px; font-family: var(--font-mono); font-size: 0.9rem; color: var(--primary); margin-bottom: 24px;">
          PASS CODE: PRK-${Math.floor(1000 + Math.random() * 9000)}
        </div>

        <button class="btn btn-secondary" id="done-booking-btn" style="width: 100%; justify-content: center;">
          Done
        </button>
      </div>
    `;

    modalEl.querySelector('#done-booking-btn').onclick = () => {
      modalEl.classList.remove('active');
    };
  };
}
