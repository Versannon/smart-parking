import { getCurrentUser } from '../utils/auth.js';
import { getDynamicHostStats } from '../data/mockData.js';

export function renderHeader() {
  const user = getCurrentUser();
  const hostStats = user && user.role === 'owner' ? getDynamicHostStats(user.id) : null;

  return `
    <header class="header-navbar">
      <div class="header-container">
        <div style="display: flex; align-items: center; gap: 40px;">
          <a href="#" class="brand-logo" id="brand-logo-btn">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; font-size: 32px;">local_parking</span>
            Parkora
          </a>

          <nav class="nav-links">
            <a href="#" class="nav-link active" id="nav-link-find">Find Parking</a>
            <a href="#" class="nav-link" id="nav-link-solutions">Solutions</a>
            <a href="#" class="nav-link" id="nav-link-locations">Locations</a>
            <a href="#" class="nav-link" id="nav-link-pricing">Pricing</a>
          </nav>
        </div>

        <div class="header-actions">
          ${user ? `
            <!-- Logged-in Dynamic State -->
            <div style="display: flex; align-items: center; gap: 12px;">
              ${user.role === 'customer' ? `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--primary-container); border-radius: var(--radius-full); padding: 4px 12px; font-size: 12px; font-weight: 700; color: var(--primary-container); display: flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">account_balance_wallet</span>
                  ₹${(user.walletBalance || 0).toLocaleString()}
                </div>

                <button class="btn-secondary" id="nav-my-bookings-btn" style="padding: 8px 14px; font-size: 12px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">confirmation_number</span> My Bookings
                </button>
              ` : ''}

              ${user.role === 'owner' ? `
                <div style="background: #e0f2fe; border: 1px solid #0284c7; border-radius: var(--radius-full); padding: 4px 12px; font-size: 12px; font-weight: 700; color: #0369a1; display: flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">payments</span>
                  ₹${(hostStats?.monthlyIncome || 14500).toLocaleString()}/mo
                </div>

                <button class="btn-primary" id="nav-owner-dashboard-btn" style="padding: 8px 14px; font-size: 12px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">roofing</span> Host Portal
                </button>
              ` : ''}

              ${user.role === 'admin' ? `
                <button class="btn-primary" id="nav-admin-dashboard-btn" style="padding: 8px 14px; font-size: 12px; background-color: var(--error); color: #fff;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">admin_panel_settings</span> Admin Panel
                </button>
              ` : ''}

              <!-- User Profile Menu -->
              <div style="display: flex; align-items: center; gap: 8px; background-color: var(--surface-container-low); padding: 4px 10px 4px 4px; border-radius: var(--radius-full); border: 1px solid var(--surface-variant);">
                <img src="${user.avatar}" alt="${user.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 12px; font-weight: 700; color: var(--on-surface); line-height: 1.1;">${user.name.split(' ')[0]}</span>
                  <span style="font-size: 10px; font-weight: 600; color: var(--primary-container);">${user.roleBadge}</span>
                </div>
                <button id="nav-logout-btn" title="Logout / Switch Account" style="background: transparent; border: none; cursor: pointer; color: var(--on-surface-variant); padding: 2px; margin-left: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 18px;">logout</span>
                </button>
              </div>
            </div>
          ` : `
            <!-- Logged-out State -->
            <button class="btn-ghost" id="nav-login-btn">Login / Sign In</button>
            <button class="btn-primary" id="nav-host-btn">Become a Host</button>
          `}
        </div>
      </div>
    </header>
  `;
}
