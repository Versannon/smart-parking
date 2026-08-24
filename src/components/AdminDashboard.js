import { pendingSpots, approvePendingSpot, rejectPendingSpot, getDynamicPlatformStats } from '../data/mockData.js';
import { MOCK_USERS } from '../utils/auth.js';

export function renderAdminDashboardModal() {
  return `
    <div class="modal-overlay-backdrop" id="admin-dashboard-modal">
      <div class="modal-container-card" style="max-width: 800px; width: 95%;">
        <button class="modal-close-icon" id="admin-dashboard-close-btn">&times;</button>

        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 16px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: var(--error);">admin_panel_settings</span>
          <div>
            <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Master System Admin Panel</h2>
            <p style="font-size: 13px; color: var(--on-surface-variant);">Platform revenue metrics, pending approvals, and user governance</p>
          </div>
        </div>

        <!-- Dynamic Platform Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 16px; margin-bottom: 28px;">
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant); text-transform: uppercase;">Total Platform Revenue</span>
            <p style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--primary); margin-top: 4px;" id="admin-revenue-val">₹0</p>
          </div>
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant); text-transform: uppercase;">Active Bookings</span>
            <p style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--on-surface); margin-top: 4px;" id="admin-active-bookings-val">0</p>
          </div>
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant); text-transform: uppercase;">Total Live Spots</span>
            <p style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--on-surface); margin-top: 4px;" id="admin-live-spots-val">0</p>
          </div>
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant); text-transform: uppercase;">Total Platform Users</span>
            <p style="font-family: var(--font-h); font-size: 22px; font-weight: 700; color: var(--on-surface); margin-top: 4px;" id="admin-users-count-val">0</p>
          </div>
        </div>

        <!-- Pending Approval Queue -->
        <div style="margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface);">Pending Host Spot Approvals</h3>
            <span id="pending-count-badge" style="font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); background: #fee2e2; color: #991b1b;">0 Pending</span>
          </div>

          <div id="pending-spots-list" style="max-height: 220px; overflow-y: auto;">
            <!-- Dynamic Pending List -->
          </div>
        </div>

        <!-- Users Governance Table -->
        <div>
          <h3 style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px;">Registered Accounts & Roles</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${MOCK_USERS.map(u => `
              <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <img src="${u.avatar}" alt="${u.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
                  <div>
                    <span style="font-weight: 700; font-size: 14px; color: var(--on-surface);">${u.name}</span>
                    <span style="font-size: 12px; color: var(--on-surface-variant); margin-left: 8px;">${u.email}</span>
                  </div>
                </div>
                <span style="font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); background-color: var(--surface-container-highest); color: var(--on-surface);">${u.roleBadge}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function updateAdminDashboard(modalEl, onDataChange) {
  const pendingContainer = modalEl.querySelector('#pending-spots-list');
  const countBadge = modalEl.querySelector('#pending-count-badge');
  
  const revVal = modalEl.querySelector('#admin-revenue-val');
  const activeBookingsVal = modalEl.querySelector('#admin-active-bookings-val');
  const liveSpotsVal = modalEl.querySelector('#admin-live-spots-val');
  const usersVal = modalEl.querySelector('#admin-users-count-val');

  const stats = getDynamicPlatformStats();

  if (revVal) revVal.textContent = `₹${stats.totalRevenue.toLocaleString()}`;
  if (activeBookingsVal) activeBookingsVal.textContent = stats.activeBookingsCount;
  if (liveSpotsVal) liveSpotsVal.textContent = stats.totalSpotsCount;
  if (usersVal) usersVal.textContent = stats.totalUsersCount;

  if (countBadge) countBadge.textContent = `${pendingSpots.length} Pending`;

  if (pendingSpots.length === 0) {
    pendingContainer.innerHTML = `
      <div style="text-align: center; padding: 20px; background-color: var(--surface-container-low); border-radius: var(--radius-default); color: var(--on-surface-variant); font-size: 14px;">
        ✓ All host listings have been reviewed & verified. No pending approvals in queue.
      </div>
    `;
    return;
  }

  pendingContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${pendingSpots.map(p => `
        <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h4 style="font-family: var(--font-h); font-size: 15px; font-weight: 700; color: var(--on-surface);">${p.title}</h4>
              <span style="font-size: 12px; color: var(--on-surface-variant);">by ${p.ownerName}</span>
            </div>
            <p style="font-size: 13px; color: var(--on-surface-variant);">${p.address} • ₹${p.rateHourly}/hr</p>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary reject-pending-btn" data-pendingid="${p.id}" style="padding: 6px 12px; font-size: 12px; color: var(--error); border-color: var(--error);">
              Reject
            </button>
            <button class="btn-primary approve-pending-btn" data-pendingid="${p.id}" style="padding: 6px 12px; font-size: 12px;">
              Approve Listing
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  pendingContainer.querySelectorAll('.approve-pending-btn').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.dataset.pendingid;
      approvePendingSpot(pid);
      updateAdminDashboard(modalEl, onDataChange);
      if (onDataChange) onDataChange();
      alert('Listing approved and published to live search grid!');
    };
  });

  pendingContainer.querySelectorAll('.reject-pending-btn').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.dataset.pendingid;
      rejectPendingSpot(pid);
      updateAdminDashboard(modalEl, onDataChange);
      if (onDataChange) onDataChange();
    };
  });
}

export function attachAdminDashboardEvents(modalEl) {
  const closeBtn = modalEl.querySelector('#admin-dashboard-close-btn');
  closeBtn.onclick = () => modalEl.classList.remove('active');
}
