import confetti from 'canvas-confetti';
import { getCurrentUser } from '../utils/auth.js';
import { processNewBooking } from '../data/mockData.js';

export function renderBookingModal() {
  return `
    <div class="modal-overlay-backdrop" id="booking-modal">
      <div class="modal-container-card">
        <button class="modal-close-icon" id="modal-close-btn">&times;</button>
        <div id="modal-content">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
}

export function openBookingModal(spot, modalEl) {
  const contentEl = modalEl.querySelector('#modal-content');
  const user = getCurrentUser();
  let selectedHours = 2;
  const currentWallet = user ? (user.walletBalance || 0) : 1250;

  function updatePrice() {
    const total = spot.rateHourly * selectedHours;
    const totalEl = modalEl.querySelector('#modal-total-price');
    if (totalEl) totalEl.textContent = `₹${total}`;

    const confirmBtn = modalEl.querySelector('#confirm-booking-btn');
    const warningEl = modalEl.querySelector('#wallet-warning-msg');

    if (total > currentWallet) {
      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.style.opacity = '0.5';
        confirmBtn.style.cursor = 'not-allowed';
      }
      if (warningEl) warningEl.style.display = 'block';
    } else {
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
      }
      if (warningEl) warningEl.style.display = 'none';
    }
  }

  contentEl.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 56px; height: 56px; background: rgba(16, 185, 129, 0.15); border-radius: 50%; color: var(--primary-container); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
        <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'FILL' 1;">local_parking</span>
      </div>
      <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Reserve ${spot.title}</h2>
      <p style="font-size: 14px; color: var(--on-surface-variant); margin-top: 4px;">${spot.address}</p>
    </div>

    <!-- Live Wallet Status -->
    <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 12px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary-container);">account_balance_wallet</span>
        Your Wallet Balance:
      </div>
      <span style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--primary-container);">₹${currentWallet.toLocaleString()}</span>
    </div>

    <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 14px; color: var(--on-surface-variant);">Hourly Rate</span>
        <span style="font-family: var(--font-h); font-weight: 600; font-size: 18px; color: var(--on-surface);">₹${spot.rateHourly} / hr</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span style="font-size: 14px; color: var(--on-surface-variant);">Parking Duration</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn-secondary" id="dur-minus" style="padding: 4px 12px; min-width: 36px;">-</button>
          <span id="dur-val" style="font-weight: 700; font-family: var(--font-mono); font-size: 16px;">2 hrs</span>
          <button class="btn-secondary" id="dur-plus" style="padding: 4px 12px; min-width: 36px;">+</button>
        </div>
      </div>

      <div style="border-top: 1px dashed var(--outline-variant); padding-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: var(--on-surface);">Total Payable</span>
        <span id="modal-total-price" style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--primary-container);">₹${spot.rateHourly * 2}</span>
      </div>
    </div>

    <p id="wallet-warning-msg" style="display: none; font-size: 13px; color: var(--error); text-align: center; margin-bottom: 12px; font-weight: 600;">
      Insufficient wallet balance for this duration.
    </p>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 6px;">Vehicle Registration Number (Optional)</label>
      <input type="text" id="vehicle-num-input" class="search-input input-focus-ring" placeholder="e.g. KA 01 AB 1234" value="${user?.vehicleNumber || ''}" style="background-color: var(--surface-container-low);" />
    </div>

    <button class="btn-primary" id="confirm-booking-btn" style="width: 100%; padding: 14px; font-size: 14px;">
      Confirm Slot & Deduct Wallet
    </button>
  `;

  modalEl.classList.add('active');
  updatePrice();

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
    const vehicleNum = modalEl.querySelector('#vehicle-num-input').value.trim();
    const totalPaid = spot.rateHourly * selectedHours;
    
    // PROCESS NEW BOOKING DYNAMICALLY
    const createdPass = processNewBooking({
      userId: user?.id || "user-customer-1",
      spotId: spot.id,
      spotTitle: spot.title,
      spotAddress: spot.address,
      hours: selectedHours,
      totalPaid: totalPaid,
      vehicleNumber: vehicleNum
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    contentEl.innerHTML = `
      <div style="text-align: center; padding: 16px 0;">
        <div style="width: 64px; height: 64px; background: rgba(16, 185, 129, 0.15); border-radius: 50%; color: var(--primary-container); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          <span class="material-symbols-outlined" style="font-size: 36px; font-weight: bold;">check</span>
        </div>
        <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Slot Guaranteed!</h2>
        <p style="color: var(--on-surface-variant); margin: 8px 0 20px; font-size: 15px;">
          Your parking pass for <strong>${spot.title}</strong> has been confirmed for <strong>${selectedHours} hours</strong>.
          ${vehicleNum ? `<br/><span style="font-size: 13px; color: var(--primary-container);">Vehicle: ${vehicleNum.toUpperCase()}</span>` : ''}
        </p>

        <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 16px; font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 24px;">
          PASS CODE: ${createdPass.passCode}
        </div>

        <button class="btn-secondary" id="done-booking-btn" style="width: 100%;">
          View in My Bookings
        </button>
      </div>
    `;

    modalEl.querySelector('#done-booking-btn').onclick = () => {
      modalEl.classList.remove('active');
    };
  };
}
