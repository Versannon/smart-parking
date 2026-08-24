import { mockSpots, addNewSpot, toggleSpotStatus, getDynamicHostStats } from '../data/mockData.js';
import { getCurrentUser } from '../utils/auth.js';

export function renderOwnerDashboardModal() {
  return `
    <div class="modal-overlay-backdrop" id="owner-dashboard-modal">
      <div class="modal-container-card" style="max-width: 720px; width: 95%;">
        <button class="modal-close-icon" id="owner-dashboard-close-btn">&times;</button>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="material-symbols-outlined" style="font-size: 32px; color: var(--primary-container);">roofing</span>
            <div>
              <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Parking Host Portal</h2>
              <p style="font-size: 13px; color: var(--on-surface-variant);">Manage your listed driveway & parking spaces</p>
            </div>
          </div>

          <button class="btn-primary" id="owner-add-spot-btn">
            <span class="material-symbols-outlined" style="font-size: 18px;">add</span> Add New Spot
          </button>
        </div>

        <!-- Dynamic Host Metrics -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 12px; font-weight: 600; color: var(--on-surface-variant); text-transform: uppercase;">Total Monthly Income</span>
            <p style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--primary); margin-top: 4px;" id="owner-income-val">₹14,500</p>
          </div>
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 12px; font-weight: 600; color: var(--on-surface-variant); text-transform: uppercase;">Active Listings</span>
            <p style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface); margin-top: 4px;" id="owner-spots-count-val">3</p>
          </div>
          <div style="background-color: var(--surface-container-low); padding: 16px; border-radius: var(--radius-default); border: 1px solid var(--surface-variant);">
            <span style="font-size: 12px; font-weight: 600; color: var(--on-surface-variant); text-transform: uppercase;">Occupancy Rate</span>
            <p style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface); margin-top: 4px;" id="owner-occupancy-val">88%</p>
          </div>
        </div>

        <!-- Spot Addition Sub-Form -->
        <div id="add-spot-form-card" style="display: none; background-color: var(--surface-container-low); border: 1px solid var(--primary-container); border-radius: var(--radius-default); padding: 20px; margin-bottom: 24px;">
          <h3 style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface); margin-bottom: 16px;">List New Parking Spot</h3>
          
          <form id="new-spot-form" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Spot Title</label>
              <input type="text" id="new-spot-title" class="search-input input-focus-ring" placeholder="e.g. Indiranagar Driveway Slot" required />
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Full Address</label>
              <input type="text" id="new-spot-address" class="search-input input-focus-ring" placeholder="e.g. 100ft Road, Bengaluru" required />
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Category</label>
              <select id="new-spot-category" class="search-input input-focus-ring" style="background-color: #fff;">
                <option value="metro">Near Metro Station</option>
                <option value="ev">EV Charging Pod</option>
                <option value="work">Office & Tech Park</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Hourly Rate (₹)</label>
              <input type="number" id="new-spot-rate" class="search-input input-focus-ring" placeholder="40" min="10" required />
            </div>

            <div>
              <label style="display: block; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Distance to Metro</label>
              <input type="text" id="new-spot-distance" class="search-input input-focus-ring" placeholder="e.g. 100m to Metro" />
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-top: 24px;">
              <input type="checkbox" id="new-spot-ev" style="width: 18px; height: 18px;" />
              <label for="new-spot-ev" style="font-size: 14px; font-weight: 600; color: var(--on-surface);">Equipped with EV Charger</label>
            </div>

            <div style="grid-column: 1 / -1; display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
              <button type="button" class="btn-secondary" id="cancel-add-spot-btn">Cancel</button>
              <button type="submit" class="btn-primary">Save & Publish Listing</button>
            </div>
          </form>
        </div>

        <!-- Owner Spots Table -->
        <div>
          <h3 style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px;">Your Listed Spots</h3>
          <div id="owner-spots-list" style="max-height: 280px; overflow-y: auto;">
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
  const hostId = currentUser?.id || 'user-owner-1';
  const hostStats = getDynamicHostStats(hostId);

  if (incomeVal) incomeVal.textContent = `₹${hostStats.monthlyIncome.toLocaleString()}`;
  if (countVal) countVal.textContent = hostStats.activeListingsCount;
  if (occupancyVal) occupancyVal.textContent = `${hostStats.occupancyRate}%`;

  const mySpots = hostStats.totalSpots;

  if (mySpots.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--on-surface-variant);">
        No spots listed yet. Click "Add New Spot" to publish your driveway!
      </div>
    `;
  } else {
    listContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${mySpots.map(s => `
          <div style="background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); padding: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h4 style="font-family: var(--font-h); font-size: 16px; font-weight: 700; color: var(--on-surface);">${s.title}</h4>
                ${s.evCharging ? `<span style="font-size: 11px; padding: 2px 6px; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: var(--primary-container); font-weight: 700;">⚡ EV</span>` : ''}
              </div>
              <p style="font-size: 13px; color: var(--on-surface-variant);">${s.address} • Slots: ${s.availableSlots}/${s.totalCapacity || 5}</p>
            </div>

            <div style="display: flex; align-items: center; gap: 16px;">
              <span style="font-family: var(--font-h); font-size: 18px; font-weight: 700; color: var(--on-surface);">₹${s.rateHourly}<span style="font-size: 12px; font-weight: 400; color: var(--on-surface-variant);">/hr</span></span>
              
              <button 
                class="btn-secondary toggle-spot-btn" 
                data-spotid="${s.id}"
                style="padding: 6px 12px; font-size: 12px; background-color: ${s.active ? '#dcfce7' : '#f3f4f6'}; color: ${s.active ? '#15803d' : '#6b7280'}; border-color: transparent;"
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
      toggleSpotStatus(spotId);
      updateOwnerDashboard(modalEl, onDataChange);
      if (onDataChange) onDataChange();
    };
  });
}

export function attachOwnerDashboardEvents(modalEl, onDataChange) {
  const closeBtn = modalEl.querySelector('#owner-dashboard-close-btn');
  closeBtn.onclick = () => modalEl.classList.remove('active');

  const addBtn = modalEl.querySelector('#owner-add-spot-btn');
  const formCard = modalEl.querySelector('#add-spot-form-card');
  const cancelBtn = modalEl.querySelector('#cancel-add-spot-btn');

  if (addBtn && formCard) {
    addBtn.onclick = () => {
      formCard.style.display = 'block';
    };
  }

  if (cancelBtn && formCard) {
    cancelBtn.onclick = () => {
      formCard.style.display = 'none';
    };
  }

  const form = modalEl.querySelector('#new-spot-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const currentUser = getCurrentUser();
      
      const newSpot = addNewSpot({
        ownerId: currentUser?.id || "user-owner-1",
        title: modalEl.querySelector('#new-spot-title').value,
        address: modalEl.querySelector('#new-spot-address').value,
        category: modalEl.querySelector('#new-spot-category').value,
        rateHourly: modalEl.querySelector('#new-spot-rate').value,
        distanceMetro: modalEl.querySelector('#new-spot-distance').value || "150m to Metro",
        evCharging: modalEl.querySelector('#new-spot-ev').checked,
        availableSlots: 4
      });

      form.reset();
      formCard.style.display = 'none';
      updateOwnerDashboard(modalEl, onDataChange);
      if (onDataChange) onDataChange();
      alert(`Success! Listing "${newSpot.title}" has been published.`);
    };
  }
}
