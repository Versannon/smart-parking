import { addNewSpot, toggleSpotStatus, getDynamicHostStats } from '../data/mockData.js';
import { getCurrentUser } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { escapeHTML } from '../utils/html.js';

export function renderOwnerDashboardModal() {
  return `
    <div class="modal-overlay-backdrop" id="owner-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="owner-dashboard-title" aria-hidden="true">
      <div class="modal-container-card modal-lg">
        <button type="button" class="modal-close-icon" id="owner-dashboard-close-btn" aria-label="Close host portal">&times;</button>

        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">roofing</span>
            <div>
              <h2 class="modal-heading" id="owner-dashboard-title">Parking Host Portal</h2>
              <p class="modal-subheading">Manage your listed driveway &amp; parking spaces</p>
            </div>
          </div>

          <button type="button" class="btn-primary btn-sm" id="owner-add-spot-btn">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">add</span>
            <span>Add New Spot</span>
          </button>
        </div>

        <!-- Dynamic Host Metrics -->
        <div class="metrics-grid-3">
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Monthly Income</span>
            <p class="metric-stat-value text-emerald" id="owner-income-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Active Listings</span>
            <p class="metric-stat-value" id="owner-spots-count-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Occupancy Rate</span>
            <p class="metric-stat-value" id="owner-occupancy-val">--</p>
          </div>
        </div>

        <!-- Spot Addition Sub-Form -->
        <div id="add-spot-form-card" class="add-spot-form-container hidden">
          <h3 class="section-subheading">List New Parking Spot</h3>
          
          <form id="new-spot-form" class="new-spot-grid-form">
            <div>
              <label for="new-spot-title" class="form-label">Spot Title</label>
              <input type="text" id="new-spot-title" class="search-input input-focus-ring" placeholder="e.g. Indiranagar Driveway Slot" minlength="3" maxlength="80" required />
            </div>

            <div>
              <label for="new-spot-address" class="form-label">Full Address</label>
              <input type="text" id="new-spot-address" class="search-input input-focus-ring" placeholder="e.g. 100ft Road, Bengaluru" minlength="5" maxlength="120" required />
            </div>

            <div>
              <label for="new-spot-category" class="form-label">Category</label>
              <select id="new-spot-category" class="search-input input-focus-ring">
                <option value="metro">Near Metro Station</option>
                <option value="ev">EV Charging Pod</option>
                <option value="work">Office &amp; Tech Park</option>
              </select>
            </div>

            <div>
              <label for="new-spot-rate" class="form-label">Hourly Rate (₹)</label>
              <input type="number" id="new-spot-rate" class="search-input input-focus-ring" placeholder="40" min="10" max="500" required />
            </div>

            <div>
              <label for="new-spot-vehicletype" class="form-label">Vehicle Compatibility</label>
              <select id="new-spot-vehicletype" class="search-input input-focus-ring">
                <option value="all">🚗+🏍️ Both 4-Wheeler &amp; 2-Wheeler</option>
                <option value="car">🚗 4-Wheeler Only (Cars / SUVs)</option>
                <option value="bike">🏍️ 2-Wheeler Only (Bikes / Scooters)</option>
              </select>
            </div>

            <div>
              <label for="new-spot-distance" class="form-label">Distance to Metro / Hub</label>
              <input type="text" id="new-spot-distance" class="search-input input-focus-ring" placeholder="e.g. 100m to Metro" maxlength="60" />
            </div>

            <div class="checkbox-group-row">
              <label class="checkbox-label">
                <input type="checkbox" id="new-spot-ev" />
                <span>EV Charger</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="new-spot-covered" checked />
                <span>Covered Bay</span>
              </label>
            </div>

            <div class="form-full-actions">
              <button type="button" class="btn-secondary" id="cancel-add-spot-btn">Cancel</button>
              <button type="submit" class="btn-primary">Submit Listing for Verification</button>
            </div>
          </form>
        </div>

        <!-- Owner Spots Table -->
        <div>
          <h3 class="section-subheading">Your Listed Spots</h3>
          <div id="owner-spots-list" class="dashboard-scroll-list">
            <!-- Dynamic List -->
          </div>
        </div>
      </div>
    </div>
  `;
}

export function updateOwnerDashboard(modalEl, onDataChange) {
  const listContainer = modalEl.querySelector('#owner-spots-list');
  const incomeVal = modalEl.querySelector('#owner-income-val');
  const countVal = modalEl.querySelector('#owner-spots-count-val');
  const occupancyVal = modalEl.querySelector('#owner-occupancy-val');
  
  const currentUser = getCurrentUser();
  const hostId = (currentUser && currentUser.role === 'owner') ? currentUser.id : 'user-owner-1';
  const hostStats = getDynamicHostStats(hostId);

  if (incomeVal) incomeVal.textContent = `₹${hostStats.monthlyIncome.toLocaleString()}`;
  if (countVal) countVal.textContent = hostStats.activeListingsCount;
  if (occupancyVal) occupancyVal.textContent = `${hostStats.occupancyRate}%`;

  const mySpots = hostStats.totalSpots;

  if (mySpots.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state-box">
        <p class="empty-state-desc">No spots active yet. Click "Add New Spot" to submit your driveway!</p>
      </div>
    `;
  } else {
    listContainer.innerHTML = `
      <div class="dashboard-list-stack">
        ${mySpots.map(s => `
          <div class="dashboard-list-item">
            <div>
              <div class="dashboard-item-title-row">
                <h4 class="dashboard-item-title">${escapeHTML(s.title)}</h4>
                ${s.evCharging ? `<span class="mini-tag-emerald">⚡ EV</span>` : ''}
                ${s.covered ? `<span class="mini-tag-neutral">Covered</span>` : ''}
              </div>
              <p class="dashboard-item-sub">${escapeHTML(s.address)} • Slots: ${s.availableSlots}/${s.totalCapacity || 5}</p>
            </div>

            <div class="dashboard-item-actions">
              <span class="dashboard-rate-label">₹${s.rateHourly}<small>/hr</small></span>
              
              <button 
                type="button"
                class="status-toggle-pill ${s.active ? 'status-active' : 'status-paused'} toggle-spot-btn" 
                data-spotid="${escapeHTML(s.id)}"
              >
                ${s.active ? '● Active' : '○ Paused'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Toggle Spot Active/Paused
  listContainer.querySelectorAll('.toggle-spot-btn').forEach(btn => {
    btn.onclick = () => {
      const spotId = btn.dataset.spotid;
      const nowActive = toggleSpotStatus(spotId);
      updateOwnerDashboard(modalEl, onDataChange);
      showToast(`Listing is now ${nowActive ? 'Active & bookable' : 'Paused'}.`, 'info');
    };
  });
}

export function attachOwnerDashboardEvents(modalEl, onDataChange) {
  const closeBtn = modalEl.querySelector('#owner-dashboard-close-btn');
  if (closeBtn) closeBtn.onclick = () => closeModal(modalEl);

  const addBtn = modalEl.querySelector('#owner-add-spot-btn');
  const formCard = modalEl.querySelector('#add-spot-form-card');
  const cancelBtn = modalEl.querySelector('#cancel-add-spot-btn');

  if (addBtn && formCard) {
    addBtn.onclick = () => {
      formCard.classList.remove('hidden');
      modalEl.querySelector('#new-spot-title')?.focus();
    };
  }

  if (cancelBtn && formCard) {
    cancelBtn.onclick = () => {
      formCard.classList.add('hidden');
    };
  }

  const form = modalEl.querySelector('#new-spot-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      
      try {
        const newPending = addNewSpot({
          ownerId: (currentUser && currentUser.role === 'owner') ? currentUser.id : "user-owner-1",
          ownerName: currentUser?.name || "Sarah Jenkins",
          title: modalEl.querySelector('#new-spot-title').value.trim(),
          address: modalEl.querySelector('#new-spot-address').value.trim(),
          category: modalEl.querySelector('#new-spot-category').value,
          vehicleType: modalEl.querySelector('#new-spot-vehicletype')?.value || 'all',
          rateHourly: modalEl.querySelector('#new-spot-rate').value,
          distanceMetro: modalEl.querySelector('#new-spot-distance').value.trim() || "150m to Metro",
          evCharging: modalEl.querySelector('#new-spot-ev').checked,
          covered: modalEl.querySelector('#new-spot-covered').checked,
          availableSlots: 4
        });

        form.reset();
        formCard.classList.add('hidden');
        updateOwnerDashboard(modalEl, onDataChange);
        showToast(`Listing "${newPending.title}" submitted for Admin verification!`, 'success');
      } catch (err) {
        showToast(err.message || 'Please check your listing details.', 'error');
      }
    };
  }
}
