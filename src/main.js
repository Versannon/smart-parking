import './styles/main.css';
import { mockSpots } from './data/mockData.js';
import { createPreloader } from './components/Preloader.js';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderSpotCard } from './components/SpotCard.js';
import { renderBookingModal, openBookingModal } from './components/BookingModal.js';
import { renderHostSection } from './components/HostDashboard.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // 1. Render Base App Layout
  app.innerHTML = `
    ${renderHeader()}
    <main>
      ${renderHero()}
      <section class="container">
        <div class="spots-grid" id="spots-grid">
          ${mockSpots.map(renderSpotCard).join('')}
        </div>
      </section>
      ${renderHostSection()}
    </main>
    ${renderBookingModal()}
  `;

  // 2. Initialize 4-Second Relatable Smart Parking Preloader
  createPreloader(() => {
    console.log('Parkora Radar Preloader completed! Site interactive.');
  });

  // 3. Category Filter Logic
  let activeCategory = 'all';
  const filterBtns = app.querySelectorAll('.tab-btn');
  const spotsGrid = app.querySelector('#spots-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;

      const filtered = activeCategory === 'all' 
        ? mockSpots 
        : mockSpots.filter(s => s.category === activeCategory);

      spotsGrid.innerHTML = filtered.map(renderSpotCard).join('');
      attachBookingListeners();
    });
  });

  // 4. Booking Modal Event Delegation
  const modalEl = app.querySelector('#booking-modal');
  const modalCloseBtn = app.querySelector('#modal-close-btn');

  modalCloseBtn.onclick = () => {
    modalEl.classList.remove('active');
  };

  modalEl.onclick = (e) => {
    if (e.target === modalEl) modalEl.classList.remove('active');
  };

  function attachBookingListeners() {
    app.querySelectorAll('.book-btn').forEach(btn => {
      btn.onclick = () => {
        const spotId = btn.dataset.id;
        const spot = mockSpots.find(s => s.id === spotId);
        if (spot) {
          openBookingModal(spot, modalEl);
        }
      };
    });
  }

  attachBookingListeners();

  // 5. Host Space Listener
  const hostBtn = app.querySelector('#list-space-btn');
  const navHostBtn = app.querySelector('#nav-host-btn');
  
  const showHostPrompt = () => {
    alert('Parkora Host Portal: List your driveway/slot in 2 minutes and earn up to ₹8,500/month!');
  };

  if (hostBtn) hostBtn.onclick = showHostPrompt;
  if (navHostBtn) navHostBtn.onclick = showHostPrompt;
});
