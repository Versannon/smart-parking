// Authentication, Mock Profile & Persistent Wallet Ledger Utility

export const MOCK_USERS = [
  {
    id: "user-customer-1",
    name: "Alex Commuter",
    email: "alex@parkora.com",
    role: "customer", // 'customer', 'owner', 'admin'
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    roleBadge: "Customer",
    walletBalance: 1250,
    vehicleNumber: "KA 01 AB 7890"
  },
  {
    id: "user-owner-1",
    name: "Sarah Jenkins",
    email: "sarah@parkora.com",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    roleBadge: "Parking Owner",
    walletBalance: 1500,
    monthlyEarnings: 14500,
    activeListingsCount: 3
  },
  {
    id: "user-admin-1",
    name: "System Admin",
    email: "admin@parkora.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    roleBadge: "Administrator",
    walletBalance: 2000,
    permissions: "Full System Access"
  }
];

const STORAGE_KEY = 'parkora_current_user_v3';
const WALLETS_STORAGE_KEY = 'parkora_wallets_v3';
const TRANSACTIONS_STORAGE_KEY = 'parkora_transactions_v3';

const DEFAULT_WALLETS = {
  "user-customer-1": 1250,
  "user-owner-1": 1500,
  "user-admin-1": 2000
};

const DEFAULT_TRANSACTIONS = [
  {
    id: "tx-init-1",
    userId: "user-customer-1",
    type: "credit",
    amount: 1370,
    title: "Initial Commuter Wallet Credit",
    timestamp: "2026-08-24 09:00",
    ref: "WELCOME-BONUS"
  },
  {
    id: "tx-init-2",
    userId: "user-customer-1",
    type: "debit",
    amount: 120,
    title: "Slot Reservation — Metro Station Gate 2 Slot A",
    timestamp: "2026-08-24 10:15",
    ref: "PRK-9482"
  }
];

function loadWallets() {
  try {
    const raw = localStorage.getItem(WALLETS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_WALLETS, ...parsed };
      }
    }
  } catch {
    // fallback
  }
  return { ...DEFAULT_WALLETS };
}

function saveWallets(wallets) {
  try {
    localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
  } catch {
    // ignore
  }
}

function loadTransactions() {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return structuredClone(DEFAULT_TRANSACTIONS);
}

function saveTransactions(transactions) {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // ignore
  }
}

export function getUserWalletBalance(userId) {
  const wallets = loadWallets();
  const val = Number(wallets[userId]);
  return Number.isFinite(val) ? Math.max(0, val) : (DEFAULT_WALLETS[userId] ?? 1000);
}

export function getUserTransactions(userId) {
  const transactions = loadTransactions();
  return transactions.filter(t => t.userId === userId);
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    const known = MOCK_USERS.find(u => u.id === parsed?.id);
    if (!known) return null;
    const walletBalance = getUserWalletBalance(known.id);
    return { ...known, walletBalance };
  } catch {
    return null;
  }
}

function persistCurrentUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // storage may be unavailable
  }
}

export function loginAsUser(userId) {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    const balance = getUserWalletBalance(user.id);
    const activeUser = { ...user, walletBalance: balance };
    persistCurrentUser(activeUser);
    window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: activeUser }));
    return activeUser;
  }
  return null;
}

export function loginWithCredentials(email, password) {
  const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    return loginAsUser(found.id);
  }
  return loginAsUser(MOCK_USERS[0].id);
}

export function updateUserWallet(amountChange, reason = 'Wallet Adjustment', refCode = '', targetUserId = null) {
  const current = getCurrentUser();
  const userId = targetUserId || current?.id || 'user-customer-1';
  const wallets = loadWallets();
  const currentBal = Number(wallets[userId]) || 0;
  const newBal = Math.max(0, currentBal + amountChange);

  wallets[userId] = newBal;
  saveWallets(wallets);

  // Record ledger entry
  if (amountChange !== 0) {
    const transactions = loadTransactions();
    const newTx = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      type: amountChange > 0 ? 'credit' : 'debit',
      amount: Math.abs(amountChange),
      title: reason,
      timestamp: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ref: refCode || (amountChange > 0 ? 'TOPUP-CREDIT' : 'DEBIT-CHARGE')
    };
    transactions.unshift(newTx);
    saveTransactions(transactions);
  }

  // If the updated user is currently logged in, update session state
  if (current && current.id === userId) {
    const updatedUser = { ...current, walletBalance: newBal };
    persistCurrentUser(updatedUser);
    window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: updatedUser }));
    return newBal;
  }

  window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: current }));
  return newBal;
}

export function resetWalletsAndTransactions() {
  saveWallets(DEFAULT_WALLETS);
  saveTransactions(structuredClone(DEFAULT_TRANSACTIONS));
  const current = getCurrentUser();
  if (current) {
    current.walletBalance = DEFAULT_WALLETS[current.id] || 1000;
    persistCurrentUser(current);
    window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: current }));
  }
}

export function logoutUser() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage may be unavailable
  }
  window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: null }));
}
