import confetti from 'canvas-confetti';
import { getCurrentUser, updateUserWallet, getUserTransactions } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { openModal, closeModal } from '../utils/modal.js';
import { escapeHTML } from '../utils/html.js';

export function renderWalletModal() {
  return `
    <div class="modal-overlay-backdrop" id="wallet-modal" role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="wallet-modal-close-btn" aria-label="Close wallet dialog">&times;</button>
        <div id="wallet-modal-content">
          <!-- Dynamic Content Rendered in updateWalletModalContent -->
        </div>
      </div>
    </div>
  `;
}

export function updateWalletModalContent(modalEl) {
  const contentEl = modalEl.querySelector('#wallet-modal-content');
  if (!contentEl) return;

  const user = getCurrentUser();

  if (!user) {
    contentEl.innerHTML = `
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">account_balance_wallet</span>
        </div>
        <h2 class="modal-heading" id="wallet-modal-title">Parkora Digital Wallet</h2>
        <p class="modal-subheading">Sign in to access your commuter balance and transaction history.</p>
      </div>
      <div class="modal-actions-row">
        <button type="button" class="btn-primary btn-block" id="wallet-login-prompt-btn">Sign In to View Wallet</button>
      </div>
    `;

    const promptBtn = contentEl.querySelector('#wallet-login-prompt-btn');
    if (promptBtn) {
      promptBtn.onclick = () => {
        closeModal(modalEl);
        const loginModal = document.querySelector('#login-modal');
        if (loginModal) openModal(loginModal);
      };
    }
    return;
  }

  const balance = user.walletBalance || 0;
  const transactions = getUserTransactions(user.id);

  contentEl.innerHTML = `
    <div class="modal-header-row">
      <div class="modal-header-title-group">
        <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">account_balance_wallet</span>
        <div>
          <h2 class="modal-heading" id="wallet-modal-title">Parkora Commuter Wallet</h2>
          <p class="modal-subheading">Instant slot reservations &amp; automated 100% cancellation refunds</p>
        </div>
      </div>
      <span class="wallet-verified-badge">
        <span class="material-symbols-outlined icon-xs" aria-hidden="true">verified_user</span>
        <span>Secure Escrow</span>
      </span>
    </div>

    <!-- Balance Hero Card -->
    <div class="wallet-card-hero">
      <div class="wallet-card-hero-content">
        <span class="wallet-card-label">AVAILABLE BALANCE</span>
        <div class="wallet-card-amount">
          <span class="wallet-currency-symbol">₹</span>
          <span class="wallet-balance-num" id="wallet-hero-balance-val">${balance.toLocaleString()}</span>
        </div>
        <div class="wallet-card-meta">
          <span class="wallet-user-tag">${escapeHTML(user.name)} (${user.roleBadge})</span>
          <span class="wallet-active-indicator">● Active for Instant Gate Checkout</span>
        </div>
      </div>
    </div>

    <!-- Top Up Section -->
    <div class="wallet-topup-section">
      <div class="section-header-inline">
        <h3 class="section-subheading">Add Funds (Demo Simulation)</h3>
        <span class="form-hint-inline">Instant virtual top-up</span>
      </div>

      <!-- Quick Preset Chips -->
      <div class="wallet-presets-row" role="group" aria-label="Preset top-up amounts">
        <button type="button" class="wallet-preset-chip" data-amount="200">+ ₹200</button>
        <button type="button" class="wallet-preset-chip active" data-amount="500">+ ₹500</button>
        <button type="button" class="wallet-preset-chip" data-amount="1000">+ ₹1,000</button>
        <button type="button" class="wallet-preset-chip" data-amount="2000">+ ₹2,000</button>
      </div>

      <!-- Custom Input & Method -->
      <div class="wallet-input-row">
        <div class="wallet-amount-input-wrap">
          <span class="wallet-amount-prefix">₹</span>
          <input 
            type="number" 
            id="wallet-custom-amount" 
            class="search-input input-focus-ring wallet-amount-input" 
            value="500" 
            min="50" 
            max="10000" 
            step="50" 
            aria-label="Top up amount in Rupees"
          />
        </div>

        <div class="wallet-payment-method-select">
          <select id="wallet-payment-method" class="select-compact input-focus-ring" aria-label="Select payment method">
            <option value="UPI Instant (GPay / PhonePe)">⚡ UPI (GPay / PhonePe / Paytm)</option>
            <option value="Credit / Debit Card">💳 Credit / Debit Card</option>
            <option value="Net Banking">🏦 Net Banking</option>
          </select>
        </div>
      </div>

      <button type="button" class="btn-primary btn-lg btn-block" id="wallet-confirm-topup-btn">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">add_circle</span>
        <span id="wallet-topup-btn-text">Add ₹500 to Wallet</span>
      </button>
    </div>

    <!-- Transaction Ledger -->
    <div class="wallet-ledger-section">
      <div class="section-header-inline">
        <h3 class="section-subheading">Transaction History</h3>
        <span class="meta-label">${transactions.length} record${transactions.length !== 1 ? 's' : ''}</span>
      </div>

      <div class="wallet-transactions-list" role="list">
        ${transactions.length === 0 ? `
          <div class="empty-state-box compact">
            <p class="empty-state-desc">No transactions yet. Add funds or book a slot to see activity.</p>
          </div>
        ` : transactions.map(t => {
          const isCredit = t.type === 'credit';
          return `
            <div class="wallet-tx-item" role="listitem">
              <div class="wallet-tx-left">
                <div class="wallet-tx-icon ${isCredit ? 'tx-credit' : 'tx-debit'}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">
                    ${isCredit ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                </div>
                <div>
                  <h4 class="wallet-tx-title">${escapeHTML(t.title)}</h4>
                  <div class="wallet-tx-sub">
                    <span>${escapeHTML(t.timestamp)}</span>
                    ${t.ref ? `<span class="wallet-tx-ref">• ${escapeHTML(t.ref)}</span>` : ''}
                  </div>
                </div>
              </div>
              <div class="wallet-tx-right">
                <span class="wallet-tx-amount ${isCredit ? 'text-emerald' : 'text-on-surface'}">
                  ${isCredit ? '+' : '-'} ₹${Number(t.amount).toLocaleString()}
                </span>
                <span class="wallet-tx-status">${isCredit ? 'Credited' : 'Settled'}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach Preset Chips
  const amountInput = contentEl.querySelector('#wallet-custom-amount');
  const btnText = contentEl.querySelector('#wallet-topup-btn-text');
  const presetChips = contentEl.querySelectorAll('.wallet-preset-chip');

  const setAmount = (val) => {
    if (amountInput) amountInput.value = val;
    if (btnText) btnText.textContent = `Add ₹${Number(val).toLocaleString()} to Wallet`;
  };

  presetChips.forEach(chip => {
    chip.onclick = () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      setAmount(chip.dataset.amount);
    };
  });

  if (amountInput) {
    amountInput.oninput = (e) => {
      const val = Number(e.target.value) || 0;
      presetChips.forEach(c => c.classList.toggle('active', c.dataset.amount === String(val)));
      if (btnText) btnText.textContent = `Add ₹${val.toLocaleString()} to Wallet`;
    };
  }

  // Top Up Action
  const topupBtn = contentEl.querySelector('#wallet-confirm-topup-btn');
  if (topupBtn) {
    topupBtn.onclick = () => {
      const amt = Number(amountInput?.value);
      if (!Number.isFinite(amt) || amt < 50 || amt > 10000) {
        showToast('Please enter a valid top-up amount between ₹50 and ₹10,000.', 'error');
        return;
      }

      const method = contentEl.querySelector('#wallet-payment-method')?.value || 'UPI';
      const newBal = updateUserWallet(amt, `Wallet Top-Up via ${method}`, `TOPUP-${Date.now().toString().slice(-6)}`);

      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });

      showToast(`Added ₹${amt.toLocaleString()} to your Parkora Wallet! New balance: ₹${newBal.toLocaleString()}`, 'success');
      updateWalletModalContent(modalEl);
    };
  }
}

export function openWalletModal(modalEl) {
  updateWalletModalContent(modalEl);
  openModal(modalEl);
}

export function attachWalletModalEvents(modalEl) {
  const closeBtn = modalEl.querySelector('#wallet-modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal(modalEl);
  }
}
