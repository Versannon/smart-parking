import { userBookings, cancelUserBooking } from '../data/mockData.js';
import { getCurrentUser } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { escapeHTML } from '../utils/html.js';

let activeTab = 'active'; // 'active' or 'history'

export function renderMyBookingsModal() {
  return `
    <div class="modal-overlay-backdrop" id="my-bookings-modal" role="dialog" aria-modal="true" aria-labelledby="my-bookings-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="my-bookings-close-btn" aria-label="Close active passes dialog">&times;</button>
        
        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">confirmation_number</span>
            <div>
              <h2 class="modal-heading" id="my-bookings-modal-title">My Passes &amp; Booking History</h2>
              <p class="modal-subheading">Track live gate access passes and review past reservations</p>
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
  if (!contentEl) return;
  const user = getCurrentUser();

  if (!user) {
    contentEl.innerHTML = `
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">account_circle</span>
        <p class="empty-state-title">Please Sign In</p>
        <p class="empty-state-desc">Sign in to your Parkora account to view your active passes and booking history.</p>
      </div>
    `;
    return;
  }

  const allUserBookings = userBookings.filter(b => b.userId === user.id);
  const activeBookings = allUserBookings.filter(b => b.status === 'active');
  const pastBookings = allUserBookings.filter(b => b.status !== 'active');

  contentEl.innerHTML = `
    <!-- Modal Navigation Tabs -->
    <div class="bookings-tab-bar" role="tablist" aria-label="Booking view tabs">
      <button 
        type="button" 
        role="tab" 
        class="bookings-tab-btn ${activeTab === 'active' ? 'active' : ''}" 
        id="tab-active-passes"
        aria-selected="${activeTab === 'active'}"
      >
        <span>Active Passes</span>
        <span class="tab-count-badge">${activeBookings.length}</span>
      </button>

      <button 
        type="button" 
        role="tab" 
        class="bookings-tab-btn ${activeTab === 'history' ? 'active' : ''}" 
        id="tab-history-passes"
        aria-selected="${activeTab === 'history'}"
      >
        <span>Booking History &amp; Refunds</span>
        <span class="tab-count-badge">${pastBookings.length}</span>
      </button>
    </div>

    <!-- Live Wallet Status Bar inside My Bookings -->
    <div class="wallet-status-bar compact">
      <div class="wallet-status-label">
        <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
        <span>Your Wallet Balance:</span>
      </div>
      <div class="wallet-status-right">
        <strong class="wallet-balance-amount">₹${(user.walletBalance || 0).toLocaleString()}</strong>
      </div>
    </div>

    <div id="bookings-tab-content" class="bookings-tab-mount">
      ${activeTab === 'active' ? renderActiveBookings(activeBookings) : renderHistoryBookings(pastBookings)}
    </div>
  `;

  // Tab switching
  const tabActiveBtn = contentEl.querySelector('#tab-active-passes');
  const tabHistoryBtn = contentEl.querySelector('#tab-history-passes');

  if (tabActiveBtn) {
    tabActiveBtn.onclick = () => {
      activeTab = 'active';
      updateMyBookingsContent(modalEl);
    };
  }

  if (tabHistoryBtn) {
    tabHistoryBtn.onclick = () => {
      activeTab = 'history';
      updateMyBookingsContent(modalEl);
    };
  }

  // Pass copy listeners
  contentEl.querySelectorAll('.copy-pass-btn').forEach(btn => {
    btn.onclick = () => {
      const code = btn.dataset.passcode;
      if (navigator.clipboard && code) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      showToast(`Gate pass code ${code} copied to clipboard!`, 'info');
    };
  });

  // Cancel pass listeners
  contentEl.querySelectorAll('.cancel-pass-btn').forEach(btn => {
    btn.onclick = () => {
      const bid = btn.dataset.bookingid;
      const cancelled = cancelUserBooking(bid);
      if (cancelled) {
        showToast(`Pass ${cancelled.passCode} cancelled! ₹${cancelled.totalPaid} refunded to your wallet.`, 'info');
        updateMyBookingsContent(modalEl);
      }
    };
  });
}

function renderActiveBookings(bookings) {
  if (bookings.length === 0) {
    return `
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">event_busy</span>
        <p class="empty-state-title">No active passes right now</p>
        <p class="empty-state-desc">Reserve a spot from the grid or map to get your instant gate access pass.</p>
      </div>
    `;
  }

  return `
    <div class="bookings-scroll-list">
      ${bookings.map(b => `
        <div class="booking-pass-card">
          <div class="booking-pass-top">
            <div>
              <span class="pass-active-pill">PASS ACTIVE</span>
              <h3 class="booking-pass-title">${escapeHTML(b.spotTitle)}</h3>
              <p class="booking-pass-address">${escapeHTML(b.spotAddress)}</p>
            </div>
            <div class="booking-pass-code-col">
              <button type="button" class="copy-pass-btn" data-passcode="${escapeHTML(b.passCode)}" title="Click to copy pass code">
                <span>${escapeHTML(b.passCode)}</span>
                <span class="material-symbols-outlined icon-xs" aria-hidden="true">content_copy</span>
              </button>
              <p class="booking-pass-duration">${b.hours} Hours • ${escapeHTML(b.startTime || 'Today')}</p>
            </div>
          </div>

          <div class="booking-pass-ticket-strip">
            <div>
              <span class="meta-label">Vehicle</span>
              <span class="pass-mono-val">${escapeHTML(b.vehicleNumber)}</span>
            </div>
            <div class="text-right">
              <span class="meta-label">Paid Amount</span>
              <span class="pass-price-val">₹${b.totalPaid}</span>
            </div>
          </div>

          <div class="booking-pass-actions">
            <button 
              type="button"
              class="btn-secondary btn-danger-outline cancel-pass-btn" 
              data-bookingid="${escapeHTML(b.id)}"
            >
              Cancel Pass &amp; 100% Refund (₹${b.totalPaid})
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderHistoryBookings(bookings) {
  if (bookings.length === 0) {
    return `
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">history</span>
        <p class="empty-state-title">No past bookings found</p>
        <p class="empty-state-desc">When you cancel or complete a parking pass, its full audit history will show here.</p>
      </div>
    `;
  }

  return `
    <div class="bookings-scroll-list">
      ${bookings.map(b => `
        <div class="booking-pass-card booking-card-history">
          <div class="booking-pass-top">
            <div>
              <span class="pass-status-pill ${b.status === 'cancelled' ? 'status-cancelled' : 'status-completed'}">
                ${b.status === 'cancelled' ? 'CANCELLED &amp; REFUNDED' : 'COMPLETED'}
              </span>
              <h3 class="booking-pass-title">${escapeHTML(b.spotTitle)}</h3>
              <p class="booking-pass-address">${escapeHTML(b.spotAddress)}</p>
            </div>
            <div class="booking-pass-code-col">
              <span class="pass-code-mono pass-code-muted">${escapeHTML(b.passCode)}</span>
              <p class="booking-pass-duration">${b.hours} Hours • ${escapeHTML(b.startTime || 'Standard')}</p>
            </div>
          </div>

          <div class="booking-pass-ticket-strip">
            <div>
              <span class="meta-label">Vehicle &amp; Booked At</span>
              <span class="pass-mono-val">${escapeHTML(b.vehicleNumber)} • ${escapeHTML(b.bookedAt || 'Earlier')}</span>
            </div>
            <div class="text-right">
              <span class="meta-label">Refund Status</span>
              <span class="pass-refund-tag">
                ${b.status === 'cancelled' ? `₹${b.totalPaid} Refunded to Wallet` : `₹${b.totalPaid} Settled`}
              </span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
