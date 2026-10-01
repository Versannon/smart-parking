import './styles/main.css';
import Lenis from 'lenis';
import { mockSpots } from './data/mockData.js';
import { getCurrentUser, logoutUser, updateUserWallet } from './utils/auth.js';
import { showToast } from './utils/toast.js';
import { initModalAccessibility, openModal, closeModal } from './utils/modal.js';

import { createPreloader } from './components/Preloader.js';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderSpotCard } from './components/SpotCard.js';
import { renderInteractiveMap } from './components/MapView.js';
import { renderBookingModal, openBookingModal, attachBookingModalEvents } from './components/BookingModal.js';
import { renderHostSection } from './components/HostDashboard.js';

import { renderLoginModal, attachLoginModalEvents } from './components/LoginModal.js';
import { renderWalletModal, openWalletModal, attachWalletModalEvents, updateWalletModalContent } from './components/WalletModal.js';
import { renderMyBookingsModal, updateMyBookingsContent } from './components/MyBookingsModal.js';
import { renderOwnerDashboardModal, updateOwnerDashboard, attachOwnerDashboardEvents } from './components/OwnerDashboard.js';
import { renderAdminDashboardModal, updateAdminDashboard, attachAdminDashboardEvents } from './components/AdminDashboard.js';
import { renderInfoModalContainer, openInfoModal, attachInfoModalEvents } from './components/InfoModals.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Initialize Lenis Smooth Scroll (unless user prefers reduced motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Read initial state from URL search params for shareable links
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('cat') || 'all';
  let searchQuery = urlParams.get('q') || '';
  let sortBy = urlParams.get('sort') || 'recommended';
  let viewMode = urlParams.get('view') === 'map' ? 'map' : 'grid';
  let selectedMapSpotId = null;

  function syncUrlParams() {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'all') params.set('cat', activeCategory);
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy && sortBy !== 'recommended') params.set('sort', sortBy);
    if (viewMode && viewMode !== 'grid') params.set('view', viewMode);
    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', newUrl);
  }

  function renderApp() {
    app.innerHTML = `
      <div id="header-root">${renderHeader()}</div>
      <main class="main-wrapper" id="main-content">
        <div id="hero-root">${renderHero()}</div>
        
        <section class="search-grid-section" id="search-grid-section" aria-label="Parking Spot Search Results">
          <div class="results-toolbar">
            <div class="results-summary-group">
              <p class="results-summary-text" id="search-results-summary" aria-live="polite">
                Showing verified parking spots
              </p>
              <button type="button" class="clear-filters-btn hidden" id="clear-filters-btn">
                Reset Filters
              </button>
            </div>

            <div class="results-controls-group">
              <div class="sort-control-wrap">
                <label for="sort-spots-select" class="sr-only">Sort spots by</label>
                <select id="sort-spots-select" class="select-compact input-focus-ring">
                  <option value="recommended" ${sortBy === 'recommended' ? 'selected' : ''}>Sort: Recommended</option>
                  <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="rating-desc" ${sortBy === 'rating-desc' ? 'selected' : ''}>Highest Rated</option>
                </select>
              </div>

              <div class="view-toggle-pill" role="group" aria-label="Toggle between grid and map view">
                <button type="button" class="view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}" data-view="grid" aria-pressed="${viewMode === 'grid'}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">grid_view</span>
                  <span>Grid</span>
                </button>
                <button type="button" class="view-toggle-btn ${viewMode === 'map' ? 'active' : ''}" data-view="map" aria-pressed="${viewMode === 'map'}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">map</span>
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>

          <div id="spots-results-mount">
            <!-- Dynamically renders Grid or Interactive Map -->
          </div>
        </section>

        <div id="host-section-root">${renderHostSection()}</div>
      </main>
      
      <footer class="site-footer">
        <div class="footer-brand-col">
          <div class="footer-logo">
            <span class="material-symbols-outlined icon-filled" aria-hidden="true">local_parking</span>
            <span>Parkora</span>
          </div>
          <p class="footer-tagline">Urban Utility smart parking near metro corridors &amp; workplaces.</p>
        </div>
        <div class="footer-links">
          <a href="#privacy" class="footer-link" data-info="privacy">Privacy Policy</a>
          <a href="#terms" class="footer-link" data-info="terms">Terms of Service</a>
          <a href="#cookies" class="footer-link" data-info="cookies">Cookie Policy</a>
          <a href="#legal" class="footer-link" data-info="legal">Legal Notice</a>
        </div>
        <div class="footer-copyright">© 2026 Parkora. All rights reserved.</div>
      </footer>

      <!-- Modals Layer -->
      ${renderLoginModal()}
      ${renderWalletModal()}
      ${renderBookingModal()}
      ${renderMyBookingsModal()}
      ${renderOwnerDashboardModal()}
      ${renderAdminDashboardModal()}
      ${renderInfoModalContainer()}
    `;

    initModalAccessibility();
    attachAllEventListeners();
    updateUIState();
  }

  renderApp();

  // Initialize GSAP Radar Preloader
  createPreloader();

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

    // 2. Hero Category Counts & Active State
    const heroRoot = document.getElementById('hero-root');
    if (heroRoot) {
      heroRoot.innerHTML = renderHero();

      const pills = heroRoot.querySelectorAll('.tab-pill');
      pills.forEach(p => {
        const isMatch = p.dataset.category === activeCategory;
        p.classList.toggle('active', isMatch);
        p.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      const searchInput = heroRoot.querySelector('#hero-search-input');
      if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
      }

      attachSearchAndFilterListeners();
    }

    // 3. Host Section (updates dynamically when owner logs in/out or earnings change)
    const hostRoot = document.getElementById('host-section-root');
    if (hostRoot) {
      hostRoot.innerHTML = renderHostSection();
      attachHostSectionListeners();
    }

    // 4. Spots Grid / Map
    renderSpotsGrid();

    // 5. Update Modals if Open
    const walletModal = app.querySelector('#wallet-modal');
    if (walletModal && walletModal.classList.contains('active')) {
      updateWalletModalContent(walletModal);
    }

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

  function getFilteredAndSortedSpots() {
    const filtered = mockSpots.filter(spot => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'covered'
          ? Boolean(spot.covered)
          : activeCategory === 'ev'
          ? spot.category === 'ev' || Boolean(spot.evCharging)
          : activeCategory === 'car'
          ? spot.vehicleType === 'car' || spot.vehicleType === 'all'
          : activeCategory === 'bike'
          ? spot.vehicleType === 'bike' || spot.vehicleType === 'all'
          : spot.category === activeCategory);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        spot.title.toLowerCase().includes(q) ||
        spot.address.toLowerCase().includes(q) ||
        (spot.city && spot.city.toLowerCase().includes(q)) ||
        (spot.distanceMetro && spot.distanceMetro.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.rateHourly - b.rateHourly;
      if (sortBy === 'price-desc') return b.rateHourly - a.rateHourly;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });
  }

  function renderSpotsGrid() {
    const mountEl = app.querySelector('#spots-results-mount');
    const summaryEl = app.querySelector('#search-results-summary');
    const clearBtn = app.querySelector('#clear-filters-btn');
    if (!mountEl) return;

    const filtered = getFilteredAndSortedSpots();
    syncUrlParams();

    if (summaryEl) {
      summaryEl.textContent = `Showing ${filtered.length} verified spot${filtered.length !== 1 ? 's' : ''}${searchQuery ? ` for "${searchQuery}"` : ''}`;
    }

    if (clearBtn) {
      const hasFilters = activeCategory !== 'all' || Boolean(searchQuery) || sortBy !== 'recommended';
      clearBtn.classList.toggle('hidden', !hasFilters);
    }

    if (viewMode === 'map') {
      if (!selectedMapSpotId || !filtered.some(s => s.id === selectedMapSpotId)) {
        selectedMapSpotId = filtered[0]?.id || null;
      }
      mountEl.innerHTML = renderInteractiveMap(filtered, selectedMapSpotId);
      attachMapListeners();
      attachBookingCardListeners();
      return;
    }

    if (filtered.length === 0) {
      mountEl.innerHTML = `
        <div class="empty-state-box">
          <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">search_off</span>
          <h3 class="empty-state-title">No spots found</h3>
          <p class="empty-state-desc">Try adjusting your search query or resetting category filters.</p>
          <button type="button" class="btn-secondary btn-sm" id="empty-reset-btn">Show All Spots</button>
        </div>
      `;
      const emptyReset = mountEl.querySelector('#empty-reset-btn');
      if (emptyReset) {
        emptyReset.onclick = resetAllFilters;
      }
    } else {
      mountEl.innerHTML = `
        <div class="spots-grid-container" id="spots-grid">
          ${filtered.map(renderSpotCard).join('')}
        </div>
      `;
    }

    attachBookingCardListeners();
  }

  function resetAllFilters() {
    activeCategory = 'all';
    searchQuery = '';
    sortBy = 'recommended';
    const sortSelect = app.querySelector('#sort-spots-select');
    if (sortSelect) sortSelect.value = 'recommended';
    updateUIState();
  }

  function attachAllEventListeners() {
    attachHeaderListeners();
    attachSearchAndFilterListeners();
    attachToolbarListeners();
    attachHostSectionListeners();
    attachBookingCardListeners();
    attachModalControllers();
    attachFooterListeners();
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
    const walletTopupBtn = app.querySelector('#nav-wallet-topup-btn');
    const infoModal = app.querySelector('#info-modal');

    // Mobile Menu Drawer Controls
    const mobileToggleBtn = app.querySelector('#mobile-menu-toggle-btn');
    const mobileDrawer = app.querySelector('#mobile-nav-drawer');
    const mobileIcon = app.querySelector('#mobile-menu-icon');

    const closeMobileDrawer = () => {
      if (!mobileDrawer || !mobileToggleBtn) return;
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      if (mobileIcon) mobileIcon.textContent = 'menu';
    };

    if (mobileToggleBtn && mobileDrawer) {
      mobileToggleBtn.onclick = () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        mobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (mobileIcon) mobileIcon.textContent = isOpen ? 'close' : 'menu';
      };
    }

    const walletModal = app.querySelector('#wallet-modal');

    if (walletTopupBtn && walletModal) {
      walletTopupBtn.onclick = () => {
        openWalletModal(walletModal);
      };
    }

    if (loginBtn && loginModal) {
      loginBtn.onclick = () => openModal(loginModal);
    }

    if (myBookingsBtn && myBookingsModal) {
      myBookingsBtn.onclick = () => {
        updateMyBookingsContent(myBookingsModal);
        openModal(myBookingsModal);
      };
    }

    if (ownerDashboardBtn && ownerDashboardModal) {
      ownerDashboardBtn.onclick = () => {
        updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
        openModal(ownerDashboardModal);
      };
    }

    if (adminDashboardBtn && adminDashboardModal) {
      adminDashboardBtn.onclick = () => {
        updateAdminDashboard(adminDashboardModal, renderSpotsGrid);
        openModal(adminDashboardModal);
      };
    }

    const triggerHostAction = () => {
      const user = getCurrentUser();
      if (user && user.role === 'owner') {
        updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
        openModal(ownerDashboardModal);
      } else {
        openModal(loginModal);
      }
    };

    if (hostBtn) {
      hostBtn.onclick = triggerHostAction;
    }

    if (logoutBtn) {
      logoutBtn.onclick = () => {
        logoutUser();
        showToast('Signed out of your Parkora session.', 'info');
      };
    }

    // Mobile drawer action buttons
    const mobWallet = app.querySelector('#mobile-wallet-btn');
    const mobLogin = app.querySelector('#mobile-login-btn');
    const mobHost = app.querySelector('#mobile-host-btn');
    const mobBookings = app.querySelector('#mobile-my-bookings-btn');
    const mobOwner = app.querySelector('#mobile-owner-dashboard-btn');
    const mobAdmin = app.querySelector('#mobile-admin-dashboard-btn');
    const mobLogout = app.querySelector('#mobile-logout-btn');

    if (mobWallet && walletModal) mobWallet.onclick = () => { closeMobileDrawer(); openWalletModal(walletModal); };
    if (mobLogin) mobLogin.onclick = () => { closeMobileDrawer(); openModal(loginModal); };
    if (mobHost) mobHost.onclick = () => { closeMobileDrawer(); triggerHostAction(); };
    if (mobBookings) mobBookings.onclick = () => { closeMobileDrawer(); updateMyBookingsContent(myBookingsModal); openModal(myBookingsModal); };
    if (mobOwner) mobOwner.onclick = () => { closeMobileDrawer(); updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid); openModal(ownerDashboardModal); };
    if (mobAdmin) mobAdmin.onclick = () => { closeMobileDrawer(); updateAdminDashboard(adminDashboardModal, renderSpotsGrid); openModal(adminDashboardModal); };
    if (mobLogout) mobLogout.onclick = () => { closeMobileDrawer(); logoutUser(); showToast('Signed out of your Parkora session.', 'info'); };

    const handleCityFilterFromModal = (city) => {
      searchQuery = city;
      updateUIState();
      app.querySelector('#search-grid-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Desktop Header Links
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
        openInfoModal('locations', infoModal, handleCityFilterFromModal);
      };
    }
    if (pricingLink) {
      pricingLink.onclick = (e) => {
        e.preventDefault();
        openInfoModal('pricing', infoModal);
      };
    }

    // Mobile Nav Links
    app.querySelectorAll('[data-mobile-nav]').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        closeMobileDrawer();
        const target = link.dataset.mobileNav;
        if (target === 'find') {
          app.querySelector('#search-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'locations') {
          openInfoModal('locations', infoModal, handleCityFilterFromModal);
        } else {
          openInfoModal(target, infoModal);
        }
      };
    });
  }

  function attachSearchAndFilterListeners() {
    const filterBtns = app.querySelectorAll('.tab-pill');
    const searchInput = app.querySelector('#hero-search-input');
    const searchBtn = app.querySelector('#search-btn');
    const quickChips = app.querySelectorAll('.quick-search-chip');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeCategory = btn.dataset.category;
        renderSpotsGrid();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderSpotsGrid();
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchQuery = searchInput.value.trim();
          renderSpotsGrid();
          app.querySelector('#search-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (searchInput) searchQuery = searchInput.value.trim();
        renderSpotsGrid();
        app.querySelector('#search-grid-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.query || '';
        searchQuery = searchQuery === q ? '' : q;
        if (searchInput) searchInput.value = searchQuery;
        renderSpotsGrid();
      });
    });
  }

  function attachToolbarListeners() {
    const sortSelect = app.querySelector('#sort-spots-select');
    const clearBtn = app.querySelector('#clear-filters-btn');
    const viewBtns = app.querySelectorAll('.view-toggle-btn');

    if (sortSelect) {
      sortSelect.onchange = (e) => {
        sortBy = e.target.value;
        renderSpotsGrid();
      };
    }

    if (clearBtn) {
      clearBtn.onclick = resetAllFilters;
    }

    viewBtns.forEach(btn => {
      btn.onclick = () => {
        viewMode = btn.dataset.view === 'map' ? 'map' : 'grid';
        viewBtns.forEach(b => {
          const active = b.dataset.view === viewMode;
          b.classList.toggle('active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        renderSpotsGrid();
      };
    });
  }

  function attachMapListeners() {
    const pins = app.querySelectorAll('.urban-map-pin');
    pins.forEach(pin => {
      pin.onclick = () => {
        selectedMapSpotId = pin.dataset.spotId;
        renderSpotsGrid();
      };
    });
  }

  function attachHostSectionListeners() {
    const listSpaceBtn = app.querySelector('#list-space-btn');
    const learnHostBtn = app.querySelector('#learn-host-btn');
    const loginModal = app.querySelector('#login-modal');
    const ownerDashboardModal = app.querySelector('#owner-dashboard-modal');
    const infoModal = app.querySelector('#info-modal');
    const hoursSlider = app.querySelector('#host-hours-slider');
    const hoursVal = app.querySelector('#host-hours-val');
    const incomeDisplay = app.querySelector('#host-calc-income-display');

    if (listSpaceBtn) {
      listSpaceBtn.onclick = () => {
        const user = getCurrentUser();
        if (user && user.role === 'owner') {
          updateOwnerDashboard(ownerDashboardModal, renderSpotsGrid);
          openModal(ownerDashboardModal);
        } else {
          openModal(loginModal);
        }
      };
    }

    if (learnHostBtn) {
      learnHostBtn.onclick = () => {
        openInfoModal('solutions', infoModal);
      };
    }

    if (hoursSlider && hoursVal && incomeDisplay) {
      hoursSlider.oninput = (e) => {
        const hrs = Number(e.target.value);
        const rate = 45;
        const monthlyEst = hrs * rate * 26; // 26 working days/month
        hoursVal.textContent = `${hrs} hrs/day @ ₹${rate}/hr`;
        incomeDisplay.innerHTML = `₹${monthlyEst.toLocaleString()}<small>/mo</small>`;
      };
    }
  }

  function attachFooterListeners() {
    const infoModal = app.querySelector('#info-modal');
    app.querySelectorAll('.footer-link').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const infoType = link.dataset.info || 'legal';
        openInfoModal(infoType, infoModal);
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
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const spotId = card.dataset.id;
          const spot = mockSpots.find(s => s.id === spotId);
          if (spot && spot.availableSlots > 0 && spot.active) {
            openBookingModal(spot, modalEl);
          }
        }
      };
    });
  }

  function attachModalControllers() {
    const loginModal = app.querySelector('#login-modal');
    const bookingModal = app.querySelector('#booking-modal');
    const myBookingsModal = app.querySelector('#my-bookings-modal');
    const ownerDashboardModal = app.querySelector('#owner-dashboard-modal');
    const adminDashboardModal = app.querySelector('#admin-dashboard-modal');
    const infoModal = app.querySelector('#info-modal');
    const walletModal = app.querySelector('#wallet-modal');

    if (loginModal) attachLoginModalEvents(loginModal);
    if (walletModal) attachWalletModalEvents(walletModal);
    if (bookingModal) attachBookingModalEvents(bookingModal);

    if (myBookingsModal) {
      const closeBtn = myBookingsModal.querySelector('#my-bookings-close-btn');
      if (closeBtn) closeBtn.onclick = () => closeModal(myBookingsModal);
    }

    if (ownerDashboardModal) attachOwnerDashboardEvents(ownerDashboardModal, renderSpotsGrid);
    if (adminDashboardModal) attachAdminDashboardEvents(adminDashboardModal, renderSpotsGrid);
    if (infoModal) attachInfoModalEvents(infoModal);
  }

  // Restore booking modal if user just signed in to complete reservation
  window.addEventListener('parkora-pending-booking', (e) => {
    const spotId = e.detail?.spotId;
    const spot = mockSpots.find(s => s.id === spotId);
    const bookingModal = app.querySelector('#booking-modal');
    if (spot && bookingModal) {
      openBookingModal(spot, bookingModal);
    }
  });
});
