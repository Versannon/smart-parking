import { userBookings, cancelUserBooking } from '../data/mockData.js';
import { getCurrentUser } from '../utils/auth.js';

export function renderMyBookingsModal() {
  return `
    <div class="modal-overlay-backdrop" id="my-bookings-modal">
      <div class="modal-container-card" style="max-width: 560px;">
        <button class="modal-close-icon" id="my-bookings-close-btn">&times;</button>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="material-symbols-outlined" style="font-size: 28px; color: var(--primary-container);">confirmation_number</span>
            <div>
              <h2 style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--on-surface);">My Active Passes</h2>
              <p style="font-size: 13px; color: var(--on-surface-variant);">View passes or cancel for instant wallet refund</p>
            </div>
          </div>
        </div>

        <div id="bookings-list-content">
          <!-- Dynamic Bookings -->
        </div>
      </div>
    </div>
  `;
}

export function updateMyBookingsContent(modalEl) {
  const contentEl = modalEl.querySelector('#bookings-list-content');
  const user = getCurrentUser();

  const myUserBookings = userBookings.filter(b => b.userId === (user?.id || 'user-customer-1'));

  if (myUserBookings.length === 0) {
    contentEl.innerHTML = `
      <div style="text-align: center; padding: 40px 16px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--on-surface-variant); margin-bottom: 12px;">event_busy</span>
        <p style="font-size: 16px; font-weight: 600; color: var(--on-surface);">No active bookings yet</p>
        <p style="font-size: 14px; color: var(--on-surface-variant); margin-top: 4px;">Reserve a spot from the homepage to get your pass.</p>
      </div>
    `;
    return;
  }

  contentEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px; max-height: 420px; overflow-y: auto; padding-right: 4px;">
      ${myUserBookings.map(b => `
        <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 8px; border-radius: var(--radius-full); background-color: rgba(16, 185, 129, 0.15); color: var(--primary-container);">
                PASS ACTIVE
              </span>
              <h3 style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface); margin-top: 6px;">${b.spotTitle}</h3>
              <p style="font-size: 13px; color: var(--on-surface-variant);">${b.spotAddress}</p>
            </div>
            <div style="text-align: right;">
              <span style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: var(--primary-container);">${b.passCode}</span>
              <p style="font-size: 12px; color: var(--on-surface-variant); margin-top: 4px;">${b.hours} Hours Pass</p>
            </div>
          </div>

          <div style="background-color: var(--surface-container-lowest); border: 1px dashed var(--outline-variant); border-radius: var(--radius-sm); padding: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <span style="font-size: 12px; color: var(--on-surface-variant); display: block;">Vehicle Number</span>
              <span style="font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: var(--on-surface);">${b.vehicleNumber}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 12px; color: var(--on-surface-variant); display: block;">Paid Amount</span>
              <span style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">₹${b.totalPaid}</span>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button 
              class="btn-secondary cancel-pass-btn" 
              data-bookingid="${b.id}"
              style="padding: 6px 12px; font-size: 12px; color: var(--error); border-color: var(--error);"
            >
              Cancel Pass & Refund ₹${b.totalPaid}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach Cancel Pass & Refund listeners
  contentEl.querySelectorAll('.cancel-pass-btn').forEach(btn => {
    btn.onclick = () => {
      const bid = btn.dataset.bookingid;
      const cancelled = cancelUserBooking(bid);
      if (cancelled) {
        updateMyBookingsContent(modalEl);
        alert(`Pass cancelled! ₹${cancelled.totalPaid} has been refunded to your wallet.`);
      }
    };
  });
}
