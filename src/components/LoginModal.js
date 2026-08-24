import { MOCK_USERS, loginAsUser, loginWithCredentials } from '../utils/auth.js';

export function renderLoginModal() {
  return `
    <div class="modal-overlay-backdrop" id="login-modal">
      <div class="modal-container-card" style="max-width: 440px;">
        <button class="modal-close-icon" id="login-modal-close-btn">&times;</button>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 56px; height: 56px; background-color: rgba(16, 185, 129, 0.15); border-radius: 50%; color: var(--primary-container); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
            <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'FILL' 1;">account_circle</span>
          </div>
          <h2 style="font-family: var(--font-h); font-size: 24px; font-weight: 700; color: var(--on-surface);">Welcome to Parkora</h2>
          <p style="font-size: 14px; color: var(--on-surface-variant); margin-top: 4px;">Sign in or use 1-click Demo Accounts</p>
        </div>

        <!-- Demo Mock Login Profiles -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--on-surface-variant); margin-bottom: 10px;">⚡ Quick Demo Login (Select Role):</label>
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${MOCK_USERS.map(user => `
              <button 
                class="mock-user-login-btn" 
                data-userid="${user.id}"
                style="display: flex; align-items: center; gap: 12px; padding: 12px; background-color: var(--surface-container-low); border: 1px solid var(--surface-variant); border-radius: var(--radius-default); cursor: pointer; text-align: left; transition: all 0.2s ease;"
              >
                <img src="${user.avatar}" alt="${user.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-weight: 700; font-size: 14px; color: var(--on-surface);">${user.name}</span>
                    <span style="font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-full); background-color: ${getRoleBadgeBg(user.role)}; color: ${getRoleBadgeColor(user.role)};">${user.roleBadge}</span>
                  </div>
                  <span style="font-size: 12px; color: var(--on-surface-variant);">${user.email}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div style="position: relative; text-align: center; margin-bottom: 24px;">
          <hr style="border: none; border-top: 1px solid var(--surface-variant);" />
          <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--surface-container-lowest); padding: 0 12px; font-size: 12px; color: var(--on-surface-variant);">OR LOGIN MANUALLY</span>
        </div>

        <!-- Manual Form -->
        <form id="login-manual-form" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Email Address</label>
            <input 
              type="email" 
              id="login-email-input" 
              class="search-input input-focus-ring" 
              placeholder="alex@parkora.com"
              required 
              style="background-color: var(--surface-container-low);"
            />
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 4px;">Password</label>
            <input 
              type="password" 
              id="login-password-input" 
              class="search-input input-focus-ring" 
              placeholder="••••••••" 
              required
              style="background-color: var(--surface-container-low);"
            />
          </div>

          <button type="submit" class="btn-primary" style="padding: 12px; width: 100%;">
            Sign In
          </button>
        </form>
      </div>
    </div>
  `;
}

function getRoleBadgeBg(role) {
  if (role === 'admin') return '#fee2e2';
  if (role === 'owner') return '#e0f2fe';
  return 'rgba(16, 185, 129, 0.15)';
}

function getRoleBadgeColor(role) {
  if (role === 'admin') return '#991b1b';
  if (role === 'owner') return '#075985';
  return 'var(--primary-container)';
}

export function attachLoginModalEvents(modalEl, onLoginSuccess) {
  const closeBtn = modalEl.querySelector('#login-modal-close-btn');
  closeBtn.onclick = () => modalEl.classList.remove('active');

  modalEl.onclick = (e) => {
    if (e.target === modalEl) modalEl.classList.remove('active');
  };

  // Mock User Quick Login Click
  modalEl.querySelectorAll('.mock-user-login-btn').forEach(btn => {
    btn.onclick = () => {
      const userId = btn.dataset.userid;
      const loggedIn = loginAsUser(userId);
      modalEl.classList.remove('active');
      if (onLoginSuccess) onLoginSuccess(loggedIn);
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
      modalEl.classList.remove('active');
      if (onLoginSuccess) onLoginSuccess(user);
    };
  }
}
