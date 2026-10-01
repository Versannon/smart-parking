import { MOCK_USERS, loginAsUser, loginWithCredentials } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';

export function renderLoginModal() {
  return `
    <div class="modal-overlay-backdrop" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-sm">
        <button type="button" class="modal-close-icon" id="login-modal-close-btn" aria-label="Close sign in dialog">&times;</button>
        
        <div class="modal-header-centered">
          <div class="modal-icon-circle">
            <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">account_circle</span>
          </div>
          <h2 class="modal-heading" id="login-modal-title">Welcome to Parkora</h2>
          <p class="modal-subheading">Sign in or choose a 1-click Demo Role</p>
        </div>

        <!-- Demo Mock Login Profiles -->
        <div class="demo-roles-section">
          <span class="section-overline-label">⚡ Quick Demo Login (Select Role)</span>
          
          <div class="demo-roles-list">
            ${MOCK_USERS.map(user => `
              <button 
                type="button"
                class="mock-user-login-btn" 
                data-userid="${user.id}"
              >
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar-md" width="40" height="40" />
                <div class="mock-user-info">
                  <div class="mock-user-top-row">
                    <span class="mock-user-name">${user.name}</span>
                    <span class="role-badge-pill role-${user.role}">${user.roleBadge}</span>
                  </div>
                  <span class="mock-user-email">${user.email}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="modal-divider">
          <span>OR SIGN IN MANUALLY (DEMO)</span>
        </div>

        <!-- Manual Form -->
        <form id="login-manual-form" class="modal-form-stack">
          <div>
            <label for="login-email-input" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="login-email-input" 
              class="search-input input-focus-ring" 
              placeholder="alex@parkora.com"
              autocomplete="email"
              required 
            />
          </div>

          <div>
            <label for="login-password-input" class="form-label">Password <span class="form-hint-inline">(any password works in demo)</span></label>
            <input 
              type="password" 
              id="login-password-input" 
              class="search-input input-focus-ring" 
              placeholder="••••••••" 
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit" class="btn-primary btn-lg btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  `;
}

export function attachLoginModalEvents(modalEl, onLoginSuccess) {
  const closeBtn = modalEl.querySelector('#login-modal-close-btn');
  if (closeBtn) closeBtn.onclick = () => closeModal(modalEl);

  function handleSuccessfulLogin(user) {
    closeModal(modalEl);
    if (user) {
      showToast(`Signed in as ${user.name} (${user.roleBadge})`, 'success');
      const pendingSpotId = sessionStorage.getItem('parkora_pending_booking_spot');
      if (pendingSpotId) {
        sessionStorage.removeItem('parkora_pending_booking_spot');
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('parkora-pending-booking', { detail: { spotId: pendingSpotId } }));
        }, 120);
      }
    }
    if (onLoginSuccess) onLoginSuccess(user);
  }

  // Mock User Quick Login Click
  modalEl.querySelectorAll('.mock-user-login-btn').forEach(btn => {
    btn.onclick = () => {
      const userId = btn.dataset.userid;
      const loggedIn = loginAsUser(userId);
      handleSuccessfulLogin(loggedIn);
    };
  });

  // Manual Form Submit
  const form = modalEl.querySelector('#login-manual-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const email = modalEl.querySelector('#login-email-input').value;
      const password = modalEl.querySelector('#login-password-input').value;
      const user = loginWithCredentials(email, password);
      handleSuccessfulLogin(user);
    };
  }
}
