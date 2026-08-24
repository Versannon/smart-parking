// Authentication & Mock Profile Utility

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
    permissions: "Full System Access"
  }
];

const STORAGE_KEY = 'parkora_current_user';

export function getCurrentUser() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
}

export function loginAsUser(userId) {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: user }));
    return user;
  }
  return null;
}

export function loginWithCredentials(email, password) {
  const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    return loginAsUser(found.id);
  }
  
  const customUser = {
    id: `user-custom-${Date.now()}`,
    name: email.split('@')[0] || "User",
    email: email,
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    roleBadge: "Customer",
    walletBalance: 500
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customUser));
  window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: customUser }));
  return customUser;
}

export function updateUserWallet(amountChange) {
  const user = getCurrentUser();
  if (user) {
    user.walletBalance = Math.max(0, (user.walletBalance || 0) + amountChange);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    // Also update mock user reference
    const mockRef = MOCK_USERS.find(u => u.id === user.id);
    if (mockRef) mockRef.walletBalance = user.walletBalance;

    window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: user }));
    return user.walletBalance;
  }
  return 0;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('parkora-auth-change', { detail: null }));
}
