import confetti from 'canvas-confetti';
import { getCurrentUser, updateUserWallet } from '../utils/auth.js';
import { processNewBooking } from '../data/mockData.js';
import { showToast } from '../utils/toast.js';
import { openModal, closeModal } from '../utils/modal.js';
import { escapeHTML } from '../utils/html.js';
import { openWalletModal } from './WalletModal.js';

export function renderBookingModal() {
  return `
    <div class="modal-overlay-backdrop" id="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" aria-hidden="true">
      <div class="modal-container-card">
        <button type="button" class="modal-close-icon" id="modal-close-btn" aria-label="Close reservation dialog">&times;</button>
        <div id="modal-content">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
}

export function attachBookingModalEvents(modalEl) {
  const closeBtn = modalEl.querySelector('#modal-close-btn');
  if (closeBtn) closeBtn.onclick = () => closeModal(modalEl);
}

export function openBookingModal(spot, modalEl) {
  const contentEl = modalEl.querySelector('#modal-content');
  let user = getCurrentUser();
  let selectedHours = 2;
  let currentWallet = user ? (user.walletBalance || 0) : 0;

  function updatePrice() {
    user = getCurrentUser();
    currentWallet = user ? (user.walletBalance || 0) : 0;

    const total = spot.rateHourly * selectedHours;
    const totalEl = modalEl.querySelector('#modal-total-price');
    const walletDisplay = modalEl.querySelector('#modal-wallet-balance-val');
    if (totalEl) totalEl.textContent = `₹${total}`;
    if (walletDisplay) {
      walletDisplay.textContent = user ? `₹${currentWallet.toLocaleString()}` : 'Not Signed In';
    }

    const confirmBtn = modalEl.querySelector('#confirm-booking-btn');
    const warningEl = modalEl.querySelector('#wallet-warning-msg');

    if (!user) {
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Sign In to Reserve Slot';
      }
      if (warningEl) {
        warningEl.textContent = 'Please sign in or select a 1-click demo account to confirm reservation.';
        warningEl.classList.remove('hidden');
      }
    } else if (total > currentWallet) {
      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Insufficient Wallet Balance';
      }
      if (warningEl) {
        warningEl.textContent = 'Insufficient wallet balance. Click "+ ₹500" above to add demo funds.';
        warningEl.classList.remove('hidden');
      }
    } else {
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = `Confirm Slot & Pay ₹${total}`;
      }
      if (warningEl) warningEl.classList.add('hidden');
    }
  }

  contentEl.innerHTML = `
    <div class="modal-header-centered">
      <div class="modal-icon-circle">
        <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">local_parking</span>
      </div>
      <h2 class="modal-heading" id="booking-modal-title">Reserve ${escapeHTML(spot.title)}</h2>
      <p class="modal-subheading">${escapeHTML(spot.address)} • ${escapeHTML(spot.distanceMetro)}</p>
    </div>

    <!-- Live Wallet Status -->
    <div class="wallet-status-bar">
      <div class="wallet-status-label">
        <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
        <span>Your Wallet Balance:</span>
      </div>
      <div class="wallet-status-right">
        <span class="wallet-balance-amount" id="modal-wallet-balance-val">${user ? `₹${currentWallet.toLocaleString()}` : 'Not Signed In'}</span>
        ${user ? `
          <button type="button" class="wallet-topup-mini-btn" id="modal-wallet-topup-btn" title="Add ₹500 demo funds">+ ₹500</button>
          <button type="button" class="wallet-manage-mini-link" id="modal-wallet-manage-btn">Custom Top-Up &rarr;</button>
        ` : ''}
      </div>
    </div>

    <div class="booking-summary-box">
      <div class="booking-row">
        <span class="booking-row-label">Hourly Rate</span>
        <span class="booking-row-value">₹${spot.rateHourly} / hr</span>
      </div>

      <div class="booking-row">
        <label for="booking-vehicle-type" class="booking-row-label">Vehicle Type</label>
        <select id="booking-vehicle-type" class="select-compact input-focus-ring">
          <option value="4-Wheeler (Car)">🚗 4-Wheeler (Car / SUV)</option>
          <option value="2-Wheeler (Bike/Scooter)">🏍️ 2-Wheeler (Bike / Scooter)</option>
        </select>
      </div>

      <div class="booking-row">
        <label for="booking-start-time" class="booking-row-label">Arrival Time</label>
        <select id="booking-start-time" class="select-compact input-focus-ring">
          <option value="Today, Immediate">Today — Immediate Check-in</option>
          <option value="Today, 10:00 AM">Today — 10:00 AM</option>
          <option value="Today, 02:00 PM">Today — 02:00 PM</option>
          <option value="Today, 06:00 PM">Today — 06:00 PM</option>
          <option value="Tomorrow, 09:00 AM">Tomorrow — 09:00 AM</option>
        </select>
      </div>

      <div class="booking-row">
        <span class="booking-row-label">Parking Duration</span>
        <div class="duration-stepper" role="group" aria-label="Select parking duration in hours">
          <button type="button" class="btn-secondary stepper-btn" id="dur-minus" aria-label="Decrease hours">&minus;</button>
          <span id="dur-val" class="duration-value" aria-live="polite">2 hrs</span>
          <button type="button" class="btn-secondary stepper-btn" id="dur-plus" aria-label="Increase hours">&plus;</button>
        </div>
      </div>

      <div class="booking-total-row">
        <span class="booking-total-label">Total Payable</span>
        <span id="modal-total-price" class="booking-total-amount">₹${spot.rateHourly * 2}</span>
      </div>
    </div>

    <p id="wallet-warning-msg" class="form-warning-text hidden" role="alert"></p>

    <div class="form-field-group">
      <label for="vehicle-num-input" class="form-label">Vehicle Registration Number</label>
      <input 
        type="text" 
        id="vehicle-num-input" 
        class="search-input input-focus-ring" 
        placeholder="e.g. KA 01 AB 1234" 
        value="${escapeHTML(user?.vehicleNumber || 'KA 01 AB 7890')}" 
        required minlength="4" maxlength="16" autocomplete="off"
      />
    </div>

    <button type="button" class="btn-primary btn-lg btn-block" id="confirm-booking-btn">
      Confirm Slot &amp; Pay ₹${spot.rateHourly * 2}
    </button>
  `;

  openModal(modalEl);
  updatePrice();

  const topupBtn = modalEl.querySelector('#modal-wallet-topup-btn');
  if (topupBtn) {
    topupBtn.onclick = () => {
      const newBalance = updateUserWallet(500, 'Direct Top-Up from Booking', `TOPUP-${Date.now().toString().slice(-6)}`);
      showToast(`Added ₹500 to your Parkora wallet! Balance: ₹${newBalance.toLocaleString()}`, 'success');
      updatePrice();
    };
  }

  const walletManageBtn = modalEl.querySelector('#modal-wallet-manage-btn');
  if (walletManageBtn) {
    walletManageBtn.onclick = () => {
      closeModal(modalEl);
      const walletModal = document.querySelector('#wallet-modal');
      if (walletModal) {
        openWalletModal(walletModal);
      }
    };
  }

  const durVal = modalEl.querySelector('#dur-val');
  modalEl.querySelector('#dur-minus').onclick = () => {
    if (selectedHours > 1) {
      selectedHours--;
      durVal.textContent = `${selectedHours} hr${selectedHours > 1 ? 's' : ''}`;
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
    const activeUser = getCurrentUser();
    if (!activeUser) {
      sessionStorage.setItem('parkora_pending_booking_spot', spot.id);
      closeModal(modalEl);
      const loginModal = document.querySelector('#login-modal');
      if (loginModal) openModal(loginModal);
      return;
    }

    const vehicleNum = modalEl.querySelector('#vehicle-num-input').value.trim().toUpperCase();
    if (!/^[A-Z0-9 -]{4,16}$/.test(vehicleNum)) {
      showToast('Enter a valid vehicle registration number.', 'error');
      modalEl.querySelector('#vehicle-num-input').focus();
      return;
    }
    const vehicleType = modalEl.querySelector('#booking-vehicle-type')?.value || '4-Wheeler (Car)';
    const startTime = modalEl.querySelector('#booking-start-time')?.value || 'Today, Immediate';
    const totalPaid = spot.rateHourly * selectedHours;

    try { 
      createdPass = processNewBooking({
        userId: activeUser.id,
        spotId: spot.id,
        spotTitle: spot.title,
        spotAddress: spot.address,
        hours: selectedHours,
        startTime,
        totalPaid,
        vehicleNumber: vehicleNum.toUpperCase(),
        vehicleType
      }); 
    } catch (error) {
      showToast(error.message || 'Could not complete this reservation.', 'error');
      updatePrice();
      return;
    }

    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });

    showToast(`Spot reserved! Pass ${createdPass.passCode} is active.`, 'success');

    contentEl.innerHTML = `
      <div class="booking-success-view">
        <div class="modal-icon-circle success-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">check</span>
        </div>
        <h2 class="modal-heading">Slot Guaranteed!</h2>
        <p class="modal-subheading">
          Your parking pass for <strong>${escapeHTML(spot.title)}</strong> is confirmed for <strong>${selectedHours} hour${selectedHours > 1 ? 's' : ''}</strong> (${escapeHTML(startTime)}).
        </p>

        <div class="digital-pass-ticket">
          <div class="qr-box-svg" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="64" height="64" fill="#191c1e">
              <rect x="4" y="4" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="10" y="10" width="8" height="8"/>
              <rect x="40" y="4" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="46" y="10" width="8" height="8"/>
              <rect x="4" y="40" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="10" y="46" width="8" height="8"/>
              <rect x="30" y="30" width="8" height="8" fill="#10b981"/>
              <rect x="42" y="32" width="6" height="6"/>
              <rect x="52" y="36" width="8" height="8"/>
              <rect x="32" y="46" width="12" height="6"/>
              <rect x="48" y="48" width="12" height="12" rx="2"/>
            </svg>
          </div>
          <div class="digital-pass-details">
            <span class="pass-code-label">GATE ACCESS PASS</span>
            <strong class="pass-code-mono">${createdPass.passCode}</strong>
            <span class="pass-vehicle-tag">Vehicle: ${escapeHTML(createdPass.vehicleNumber)}</span>
          </div>
        </div>

        <div class="modal-actions-row">
          <button type="button" class="btn-secondary btn-block" id="done-booking-btn">
            Done
          </button>
          <button type="button" class="btn-primary btn-block" id="view-all-passes-btn">
            View My Bookings
          </button>
        </div>
      </div>
    `;

    modalEl.querySelector('#done-booking-btn').onclick = () => {
      closeModal(modalEl);
    };

    modalEl.querySelector('#view-all-passes-btn').onclick = () => {
      closeModal(modalEl);
      const myBookingsBtn = document.querySelector('#nav-my-bookings-btn');
      if (myBookingsBtn) myBookingsBtn.click();
    };
  };
}
