import { pendingSpots, approvePendingSpot, rejectPendingSpot, getDynamicPlatformStats, resetDemoData } from '../data/mockData.js';
import { MOCK_USERS } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { escapeHTML } from '../utils/html.js';

export function renderAdminDashboardModal() {
  return `
    <div class="modal-overlay-backdrop" id="admin-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="admin-dashboard-title" aria-hidden="true">
      <div class="modal-container-card modal-lg">
        <button type="button" class="modal-close-icon" id="admin-dashboard-close-btn" aria-label="Close admin panel">&times;</button>

        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-danger-lg" aria-hidden="true">admin_panel_settings</span>
            <div>
              <h2 class="modal-heading" id="admin-dashboard-title">Master System Admin Panel</h2>
              <p class="modal-subheading">Platform revenue metrics, pending approvals, and user governance</p>
            </div>
          </div>

          <button type="button" class="btn-secondary btn-sm" id="admin-reset-demo-btn" title="Restore initial demo listings and bookings">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">restart_alt</span>
            <span>Reset Demo Data</span>
          </button>
        </div>

        <!-- Dynamic Platform Stats Grid -->
        <div class="metrics-grid-4">
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Platform Revenue</span>
            <p class="metric-stat-value text-emerald" id="admin-revenue-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Active Bookings</span>
            <p class="metric-stat-value" id="admin-active-bookings-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Live Spots</span>
            <p class="metric-stat-value" id="admin-live-spots-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Platform Users</span>
            <p class="metric-stat-value" id="admin-users-count-val">--</p>
          </div>
        </div>

        <!-- Pending Approval Queue -->
        <div class="admin-section-block">
          <div class="section-header-inline">
            <h3 class="section-subheading">Pending Host Spot Approvals</h3>
            <span id="pending-count-badge" class="pending-pill-badge">--</span>
          </div>

          <div id="pending-spots-list" class="dashboard-scroll-list">
            <!-- Dynamic Pending List -->
          </div>
        </div>

        <!-- Users Governance Table -->
        <div>
          <h3 class="section-subheading">Registered Accounts &amp; Roles</h3>
          <div class="dashboard-list-stack">
            ${MOCK_USERS.map(u => `
              <div class="governance-user-row">
                <div class="governance-user-left">
                  <img src="${u.avatar}" alt="${u.name}" class="user-avatar-sm" width="32" height="32" />
                  <div>
                    <span class="governance-user-name">${u.name}</span>
                    <span class="governance-user-email">${u.email}</span>
                  </div>
                </div>
                <span class="role-badge-pill role-${u.role}">${u.roleBadge}</span>
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
  if (usersVal) usersVal.textContent = stats.totalUsersCount.toLocaleString();

  if (countBadge) countBadge.textContent = `${pendingSpots.length} Pending`;

  if (pendingSpots.length === 0) {
    pendingContainer.innerHTML = `
      <div class="empty-state-box compact">
        <p class="empty-state-desc">✓ All host listings have been reviewed &amp; verified. No pending approvals in queue.</p>
      </div>
    `;
    return;
  }

  pendingContainer.innerHTML = `
    <div class="dashboard-list-stack">
      ${pendingSpots.map(p => `
        <div class="dashboard-list-item">
          <div>
            <div class="dashboard-item-title-row">
              <h4 class="dashboard-item-title">${escapeHTML(p.title)}</h4>
              <span class="dashboard-item-author">by ${escapeHTML(p.ownerName)}</span>
            </div>
            <p class="dashboard-item-sub">${escapeHTML(p.address)} • ₹${p.rateHourly}/hr • ${escapeHTML(p.distanceMetro)}</p>
          </div>

          <div class="dashboard-item-actions">
            <button type="button" class="btn-secondary btn-danger-outline btn-sm reject-pending-btn" data-pendingid="${escapeHTML(p.id)}">
              Reject
            </button>
            <button type="button" class="btn-primary btn-sm approve-pending-btn" data-pendingid="${escapeHTML(p.id)}">
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
      const approved = approvePendingSpot(pid);
      updateAdminDashboard(modalEl, onDataChange);
      if (approved) {
        showToast(`Approved "${approved.title}" and published to live search grid!`, 'success');
      }
    };
  });

  pendingContainer.querySelectorAll('.reject-pending-btn').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.dataset.pendingid;
      const rejected = rejectPendingSpot(pid);
      updateAdminDashboard(modalEl, onDataChange);
      if (rejected) {
        showToast(`Rejected pending listing "${rejected.title}".`, 'warning');
      }
    };
  });
}

export function attachAdminDashboardEvents(modalEl, onDataChange) {
  const closeBtn = modalEl.querySelector('#admin-dashboard-close-btn');
  if (closeBtn) closeBtn.onclick = () => closeModal(modalEl);

  const resetBtn = modalEl.querySelector('#admin-reset-demo-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      resetDemoData();
      updateAdminDashboard(modalEl, onDataChange);
      showToast('Demo spots, pending queue, and bookings restored to defaults.', 'info');
    };
  }
}
