import './styles/main.css';
import { mockSpots } from './data/mockData.js';
import { getCurrentUser, logoutUser } from './utils/auth.js';

import { createPreloader } from './components/Preloader.js';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderSpotCard } from './components/SpotCard.js';
import { renderBookingModal, openBookingModal } from './components/BookingModal.js';
import { renderHostSection } from './components/HostDashboard.js';

import { renderLoginModal, attachLoginModalEvents } from './components/LoginModal.js';
import { renderMyBookingsModal, updateMyBookingsContent } from './components/MyBookingsModal.js';
import { renderOwnerDashboardModal, updateOwnerDashboard, attachOwnerDashboardEvents } from './components/OwnerDashboard.js';
import { renderAdminDashboardModal, updateAdminDashboard, attachAdminDashboardEvents } from './components/AdminDashboard.js';
import { renderInfoModalContainer, openInfoModal, attachInfoModalEvents } from './components/InfoModals.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Filtering & Search State (Declared at top level to avoid TDZ)
  let activeCategory = 'all';
  let searchQuery = '';

  function renderApp() {
    app.innerHTML = `
      <div id="header-root">${renderHeader()}</div>
      <main class="main-wrapper">
        <div id="hero-root">${renderHero()}</div>
        
        <section style="margin-bottom: 64px;" id="search-grid-section">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <p style="font-size: 14px; font-weight: 600; color: var(--on-surface-variant);" id="search-results-summary">
              Showing verified parking spots
            </p>
          </div>

          <div class="spots-grid-container" id="spots-grid">
            ${mockSpots.map(renderSpotCard).join('')}
          </div>
        </section>

        ${renderHostSection()}
      </main>
      
      <footer class="site-footer">
        <div class="footer-logo">Parkora</div>
        <div class="footer-links">
          <a href="#" class="footer-link" data-info="legal">Privacy Policy</a>
          <a href="#" class="footer-link" data-info="legal">Terms of Service</a>
          <a href="#" class="footer-link" data-info="legal">Cookie Policy</a>
          <a href="#" class="footer-link" data-info="legal">Legal Notice</a>
        </div>
        <div style="font-size: 13px; color: var(--on-surface-variant);">© 2026 Parkora. All rights reserved.</div>
      </footer>

      <!-- Modals Layer -->
      ${renderLoginModal()}
      ${renderBookingModal()}
      ${renderMyBookingsModal()}
      ${renderOwnerDashboardModal()}
      ${renderAdminDashboardModal()}
      ${renderInfoModalContainer()}
    `;

    attachAllEventListeners();
    updateUIState();
  }

  renderApp();

  // Initialize 4-Second GSAP Radar Preloader
  createPreloader(() => {
    console.log('Parkora Radar Preloader completed! Site interactive.');
  });

  // Re-render UI on Auth State Change or Data Change
  window.addEventListener('parkora-auth-change', updateUIState);
  window.addEventListener('parkora-data-change', updateUIState);

  function updateUIState() {
    // 1. Header
    const headerRoot = document.getElementById('header-root');
    if (headerRoot) {
      headerRoot.innerHTML = renderHeader();
      attachHeaderListeners();
    }

    // 2. Hero Category Counts
    const heroRoot = document.getElementById('hero-root');
    if (heroRoot) {
      const currentActivePill = heroRoot.querySelector('.tab-pill.active')?.dataset.category || activeCategory;
      heroRoot.innerHTML = renderHero();
      
      // Preserve active pill tab
      const pills = heroRoot.querySelectorAll('.tab-pill');
      pills.forEach(p => {
        if (p.dataset.category === currentActivePill) p.classList.add('active');
        else p.classList.remove('active');
      });

      attachSearchAndFilterListeners();
    }

    // 3. Spots Grid
    renderSpotsGrid();

    // 4. Update Modals if Open
    const myBookingsModal = app.querySelector('#my-bookings-modal');
    if (myBookingsModal && myBookingsModal.classList.contains('active')) {
      updateMyBookingsContent(myBookingsModal);
    }

    const ownerModal = app.querySelector('#owner-dashboard-modal');
    if (ownerModal && ownerModal.classList.contains('active')) {
      updateOwnerDashboard(ownerModal, renderSpotsGrid);
    }

    const adminModal = app.querySelector('#admin-dashboard-modal');
    if (adminModal && adminModal.classList.contains('active')) {
      updateAdminDashboard(adminModal, renderSpotsGrid);
    }
  }

  function renderSpotsGrid() {
    const spotsGrid = app.querySelector('#spots-grid');
    const summaryEl = app.querySelector('#search-results-summary');
    if (!spotsGrid) return;

    const filtered = mockSpots.filter(spot => {
      const matchesCategory = activeCategory === 'all' || 
        (activeCategory === 'covered' ? (spot.category === 'metro' || spot.category === 'work') : spot.category === activeCategory);

      const matchesSearch = !searchQuery || 
        spot.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        spot.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (summaryEl) {
      summaryEl.textContent = `Showing ${filtered.length} verified spot${filtered.length !== 1 ? 's' : ''} ${searchQuery ? `for "${searchQuery}"` : ''}`;
    }

    if (filtered.length === 0) {
      spotsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; background-color: var(--surface-container-low); border-radius: var(--radius-lg); border: 1px solid var(--surface-variant);">
          <span class="material-symbols-outlined" style="font-size: 48px; color: var(--on-surface-variant); margin-bottom: 12px;">search_off</span>
          <h3 style="font-family: var(--font-h); font-size: 20px; font-weight: 600; color: var(--on-surface); margin-bottom: 8px;">No spots found</h3>
          <p style="font-size: 14px; color: var(--on-surface-variant);">Try adjusting your search terms or category filters.</p>
        </div>
      `;
    } else {
      spotsGrid.innerHTML = filtered.map(renderSpotCard).join('');
    }

    attachBookingCardListeners();
  }

  function attachAllEventListeners() {
    attachHeaderListeners();
    attachSearchAndFilterListeners();
    attachBookingCardListeners();
    attachModalControllers();
  }

  function attachHeaderListeners() {
    const loginBtn = app.querySelector('#nav-login-btn');
    const loginModal = app.querySelector('#login-modal');
    const myBookingsBtn = app.querySelector('#nav-my-bookings-btn');
    const myBookingsModal = app.querySelector('#my-bookings-modal');
    const ownerDashboardBtn = app.querySelector('#nav-owner-dashboard-btn');
    const ownerDashboardModal = app.querySelector('#owner-dashboard-modal');
    const adminDashboardBtn = app.querySelector('#nav-admin-dashboard-btn');
    const adminDashboardModal = app.querySelector('#admin-dashboard-modal');
    const logoutBtn = app.querySelector('#nav-logout-btn');
    const hostBtn = app.querySelector('#nav-host-btn');

    const infoModal = app.querySelector('#info-modal');

    if (loginBtn && loginModal) {
      loginBtn.onclick = () => loginModal.classList.add('active');
    }

    if (myBookingsBtn && myBookingsModal) {
      myBookingsBtn.onclick = () => {
        updateMyBookingsContent(myBookingsModal);
        myBookingsModal.classList.add('active');
      };
    }

    if (ownerDashboardBtn && ownerDashboardModal) {
      ownerDashboardBtn.onclick = () => {
        updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
        ownerDashboardModal.classList.add('active');
      };
    }

    if (adminDashboardBtn && adminDashboardModal) {
      adminDashboardBtn.onclick = () => {
        updateAdminDashboard(adminDashboardModal, renderSpotsGrid);
        adminDashboardModal.classList.add('active');
      };
    }

    if (hostBtn) {
      hostBtn.onclick = () => {
        const user = getCurrentUser();
        if (user && user.role === 'owner') {
          updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
          ownerDashboardModal.classList.add('active');
        } else {
          loginModal.classList.add('active');
        }
      };
    }

    if (logoutBtn) {
      logoutBtn.onclick = () => {
        logoutUser();
      };
    }

    // Header Links
    const findLink = app.querySelector('#nav-link-find');
    const solutionsLink = app.querySelector('#nav-link-solutions');
    const locationsLink = app.querySelector('#nav-link-locations');
    const pricingLink = app.querySelector('#nav-link-pricing');

    if (findLink) {
      findLink.onclick = (e) => {
        e.preventDefault();
        app.querySelector('#search-grid-section')?.scrollIntoView({ behavior: 'smooth' });
      };
    }

    if (solutionsLink) {
      solutionsLink.onclick = (e) => {
        e.preventDefault();
        openInfoModal('solutions', infoModal);
      };
    }

    if (locationsLink) {
      locationsLink.onclick = (e) => {
        e.preventDefault();
        openInfoModal('locations', infoModal);
      };
    }

    if (pricingLink) {
      pricingLink.onclick = (e) => {
        e.preventDefault();
        openInfoModal('pricing', infoModal);
      };
    }
  }

  function attachSearchAndFilterListeners() {
    const filterBtns = app.querySelectorAll('.tab-pill');
    const searchInput = app.querySelector('#hero-search-input');
    const searchBtn = app.querySelector('#search-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        renderSpotsGrid();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderSpotsGrid();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (searchInput) searchQuery = searchInput.value.trim();
        renderSpotsGrid();
      });
    }

    // Host Banner buttons
    const listSpaceBtn = app.querySelector('#list-space-btn');
    const learnHostBtn = app.querySelector('#learn-host-btn');
    const loginModal = app.querySelector('#login-modal');
    const ownerDashboardModal = app.querySelector('#owner-dashboard-modal');
    const infoModal = app.querySelector('#info-modal');

    if (listSpaceBtn) {
      listSpaceBtn.onclick = () => {
        const user = getCurrentUser();
        if (user && user.role === 'owner') {
          updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
          ownerDashboardModal.classList.add('active');
        } else {
          loginModal.classList.add('active');
        }
      };
    }

    if (learnHostBtn) {
      learnHostBtn.onclick = () => {
        openInfoModal('solutions', infoModal);
      };
    }

    // Footer Links
    app.querySelectorAll('.footer-link').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        openInfoModal('legal', infoModal);
      };
    });
  }

  function attachBookingCardListeners() {
    const modalEl = app.querySelector('#booking-modal');
    if (!modalEl) return;

    app.querySelectorAll('.book-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        const spotId = btn.dataset.id;
        const spot = mockSpots.find(s => s.id === spotId);
        if (spot && spot.availableSlots > 0 && spot.active) {
          openBookingModal(spot, modalEl);
        }
      };
    });

    app.querySelectorAll('.urban-spot-card').forEach(card => {
      card.onclick = () => {
        const spotId = card.dataset.id;
        const spot = mockSpots.find(s => s.id === spotId);
        if (spot && spot.availableSlots > 0 && spot.active) {
          openBookingModal(spot, modalEl);
        }
      };
    });
  }

  function attachModalControllers() {
    const loginModal = app.querySelector('#login-modal');
    const myBookingsModal = app.querySelector('#my-bookings-modal');
    const ownerDashboardModal = app.querySelector('#owner-dashboard-modal');
    const adminDashboardModal = app.querySelector('#admin-dashboard-modal');
    const infoModal = app.querySelector('#info-modal');

    if (loginModal) attachLoginModalEvents(loginModal);
    
    if (myBookingsModal) {
      const closeBtn = myBookingsModal.querySelector('#my-bookings-close-btn');
      if (closeBtn) closeBtn.onclick = () => myBookingsModal.classList.remove('active');
      myBookingsModal.onclick = (e) => {
        if (e.target === myBookingsModal) myBookingsModal.classList.remove('active');
      };
    }

    if (ownerDashboardModal) attachOwnerDashboardEvents(ownerDashboardModal, renderSpotsGrid);
    if (adminDashboardModal) attachAdminDashboardEvents(adminDashboardModal);
    if (infoModal) attachInfoModalEvents(infoModal);
  }
});
