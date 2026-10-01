import { getCurrentUser } from '../utils/auth.js';
import { getDynamicHostStats, pendingSpots } from '../data/mockData.js';

export function renderHeader() {
  const user = getCurrentUser();
  const hostStats = user && user.role === 'owner' ? getDynamicHostStats(user.id) : null;
  const pendingCount = pendingSpots.length;

  return `
    <header class="header-navbar">
      <div class="header-container">
        <div class="header-left-group">
          <a href="#" class="brand-logo" id="brand-logo-btn" aria-label="Parkora Home">
            <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">local_parking</span>
            Parkora
          </a>

          <nav class="nav-links" aria-label="Primary Navigation">
            <a href="#search-grid-section" class="nav-link active" id="nav-link-find">Find Parking</a>
            <a href="#solutions" class="nav-link" id="nav-link-solutions">Solutions</a>
            <a href="#locations" class="nav-link" id="nav-link-locations">Locations</a>
            <a href="#pricing" class="nav-link" id="nav-link-pricing">Pricing</a>
          </nav>
        </div>

        <div class="header-actions">
          ${user ? `
            <!-- Logged-in Dynamic State -->
            <div class="header-user-bar">
              <button type="button" class="wallet-pill-btn" id="nav-wallet-topup-btn" title="Click to view wallet, history & add funds">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">account_balance_wallet</span>
                <span>₹${(user.walletBalance || 0).toLocaleString()}</span>
                <span class="wallet-plus-badge" aria-hidden="true">+</span>
              </button>

              ${user.role === 'customer' ? `
                <button type="button" class="btn-secondary btn-sm hide-mobile-xs" id="nav-my-bookings-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">confirmation_number</span>
                  <span>My Bookings</span>
                </button>
              ` : ''}

              ${user.role === 'owner' ? `
                <div class="host-earnings-pill hide-mobile-xs">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">payments</span>
                  <span>₹${(hostStats?.monthlyIncome || 14500).toLocaleString()}/mo</span>
                </div>

                <button type="button" class="btn-primary btn-sm hide-mobile-xs" id="nav-owner-dashboard-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
                  <span>Host Portal</span>
                </button>
              ` : ''}

              ${user.role === 'admin' ? `
                <button type="button" class="btn-primary btn-sm btn-danger hide-mobile-xs" id="nav-admin-dashboard-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">admin_panel_settings</span>
                  <span>Admin Panel</span>
                  ${pendingCount > 0 ? `<span class="admin-badge-dot">${pendingCount}</span>` : ''}
                </button>
              ` : ''}

              <!-- User Profile Chip -->
              <div class="user-profile-chip">
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar-sm" width="32" height="32" />
                <div class="user-profile-meta">
                  <span class="user-profile-name">${user.name.split(' ')[0]}</span>
                  <span class="user-profile-role">${user.roleBadge}</span>
                </div>
                <button type="button" id="nav-logout-btn" class="icon-btn-ghost" title="Logout / Switch Account" aria-label="Logout">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">logout</span>
                </button>
              </div>
            </div>
          ` : `
            <!-- Logged-out State -->
            <button type="button" class="btn-ghost hide-mobile-xs" id="nav-login-btn">Login / Sign In</button>
            <button type="button" class="btn-primary btn-sm" id="nav-host-btn">Become a Host</button>
          `}

          <!-- Mobile Hamburger Menu Button -->
          <button
            type="button"
            class="mobile-menu-btn"
            id="mobile-menu-toggle-btn"
            aria-expanded="false"
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
          >
            <span class="material-symbols-outlined" id="mobile-menu-icon" aria-hidden="true">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true">
        <nav class="mobile-nav-links" aria-label="Mobile Navigation">
          <a href="#search-grid-section" class="mobile-nav-link" data-mobile-nav="find">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">search</span>
            Find Parking
          </a>
          <a href="#solutions" class="mobile-nav-link" data-mobile-nav="solutions">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">lightbulb</span>
            Solutions
          </a>
          <a href="#locations" class="mobile-nav-link" data-mobile-nav="locations">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">map</span>
            Active Locations
          </a>
          <a href="#pricing" class="mobile-nav-link" data-mobile-nav="pricing">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">payments</span>
            Transparent Pricing
          </a>
        </nav>

        <div class="mobile-drawer-actions">
          ${user ? `
            <div class="mobile-drawer-wallet-bar">
              <div class="drawer-wallet-info">
                <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
                <div>
                  <span class="drawer-wallet-label">Parkora Wallet</span>
                  <strong class="drawer-wallet-val">₹${(user.walletBalance || 0).toLocaleString()}</strong>
                </div>
              </div>
              <button type="button" class="btn-secondary btn-sm" id="mobile-wallet-btn">Manage</button>
            </div>

            ${user.role === 'customer' ? `
              <button type="button" class="btn-secondary btn-block" id="mobile-my-bookings-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">confirmation_number</span>
                My Active Bookings
              </button>
            ` : ''}
            ${user.role === 'owner' ? `
              <button type="button" class="btn-primary btn-block" id="mobile-owner-dashboard-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
                Open Host Portal
              </button>
            ` : ''}
            ${user.role === 'admin' ? `
              <button type="button" class="btn-primary btn-danger btn-block" id="mobile-admin-dashboard-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">admin_panel_settings</span>
                Open Admin Panel (${pendingCount})
              </button>
            ` : ''}
            <button type="button" class="btn-ghost btn-block" id="mobile-logout-btn">
              Switch Account / Logout
            </button>
          ` : `
            <button type="button" class="btn-secondary btn-block" id="mobile-login-btn">Login / Demo Accounts</button>
            <button type="button" class="btn-primary btn-block" id="mobile-host-btn">Become a Host</button>
          `}
        </div>
      </div>
    </header>
  `;
}
