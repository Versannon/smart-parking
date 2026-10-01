import { getCurrentUser, updateUserWallet, resetWalletsAndTransactions } from '../utils/auth.js';

const SPOTS_STORAGE_KEY = 'parkora_spots_v3';
const PENDING_STORAGE_KEY = 'parkora_pending_v3';
const BOOKINGS_STORAGE_KEY = 'parkora_bookings_v3';

const DEFAULT_SPOTS = [
  {
    id: "spot-1",
    ownerId: "user-owner-1",
    title: "Metro Station Gate 2 Slot A",
    address: "Whitefield Metro, Bengaluru",
    city: "Bengaluru",
    category: "metro",
    vehicleType: "all", // "all", "car", "bike"
    covered: true,
    rateHourly: 40,
    distanceMetro: "50m from Gate 2",
    evCharging: true,
    availableSlots: 4,
    totalCapacity: 5,
    rating: 4.9,
    reviewsCount: 128,
    mapX: 68,
    mapY: 42,
    amenities: ["Covered Bay", "50kW EV", "24/7 CCTV", "Car & 2-Wheeler"],
    active: true,
    status: "approved"
  },
  {
    id: "spot-2",
    ownerId: "user-owner-1",
    title: "Tech Park Driveway #14",
    address: "Koramangala 4th Block, Bengaluru",
    city: "Bengaluru",
    category: "work",
    vehicleType: "car",
    covered: false,
    rateHourly: 35,
    distanceMetro: "300m from Sony World",
    evCharging: false,
    availableSlots: 2,
    totalCapacity: 4,
    rating: 4.8,
    reviewsCount: 84,
    mapX: 46,
    mapY: 66,
    amenities: ["Gated Access", "Security Guard", "4-Wheeler Bay"],
    active: true,
    status: "approved"
  },
  {
    id: "spot-3",
    ownerId: "user-owner-2",
    title: "Terminal 2 Premium EV Pod",
    address: "Airport Road, Mumbai",
    city: "Mumbai",
    category: "ev",
    vehicleType: "car",
    covered: true,
    rateHourly: 60,
    distanceMetro: "Airport Link Station",
    evCharging: true,
    availableSlots: 6,
    totalCapacity: 8,
    rating: 5.0,
    reviewsCount: 210,
    mapX: 28,
    mapY: 36,
    amenities: ["Covered Bay", "DC Fast Charge", "Valet Assist", "EV 4-Wheeler"],
    active: true,
    status: "approved"
  },
  {
    id: "spot-4",
    ownerId: "user-owner-1",
    title: "Andheri Metro Covered Bay",
    address: "Andheri West Metro, Mumbai",
    city: "Mumbai",
    category: "metro",
    vehicleType: "all",
    covered: true,
    rateHourly: 45,
    distanceMetro: "80m from Platform 1",
    evCharging: true,
    availableSlots: 3,
    totalCapacity: 6,
    rating: 4.7,
    reviewsCount: 96,
    mapX: 22,
    mapY: 58,
    amenities: ["Covered Bay", "EV Ready", "Direct Metro Walk", "Car & Bike"],
    active: true,
    status: "approved"
  },
  {
    id: "spot-5",
    ownerId: "user-owner-3",
    title: "Cyber City Private Slot",
    address: "DLF Phase 2, Gurugram",
    city: "Gurugram",
    category: "work",
    vehicleType: "car",
    covered: true,
    rateHourly: 50,
    distanceMetro: "150m from Rapid Metro",
    evCharging: false,
    availableSlots: 1,
    totalCapacity: 3,
    rating: 4.9,
    reviewsCount: 142,
    mapX: 54,
    mapY: 26,
    amenities: ["Covered Bay", "ANPR Boom Barrier", "4-Wheeler Only"],
    active: true,
    status: "approved"
  },
  {
    id: "spot-6",
    ownerId: "user-owner-2",
    title: "Solar EV Fast Charger Spot",
    address: "Indiranagar 100ft Road, Bengaluru",
    city: "Bengaluru",
    category: "ev",
    vehicleType: "all",
    covered: false,
    rateHourly: 55,
    distanceMetro: "400m from Indiranagar Metro",
    evCharging: true,
    availableSlots: 5,
    totalCapacity: 6,
    rating: 4.85,
    reviewsCount: 175,
    mapX: 58,
    mapY: 50,
    amenities: ["Solar Canopy", "60kW Dual Gun", "Car & 2-Wheeler EV"],
    active: true,
    status: "approved"
  }
];

const DEFAULT_PENDING_SPOTS = [
  {
    id: "pending-spot-101",
    ownerId: "user-owner-1",
    ownerName: "Sarah Jenkins",
    title: "MG Road Executive Covered Slot",
    address: "14 MG Road, Bengaluru",
    city: "Bengaluru",
    category: "metro",
    covered: true,
    rateHourly: 45,
    distanceMetro: "100m from MG Road Metro",
    evCharging: true,
    availableSlots: 3,
    totalCapacity: 4,
    submittedAt: "2026-08-24 14:30"
  },
  {
    id: "pending-spot-102",
    ownerId: "user-owner-4",
    ownerName: "Rajesh Kumar",
    title: "Electronic City Phase 1 Driveway",
    address: "Infantry Road, Bengaluru",
    city: "Bengaluru",
    category: "work",
    covered: false,
    rateHourly: 30,
    distanceMetro: "500m from Bus Junction",
    evCharging: false,
    availableSlots: 2,
    totalCapacity: 3,
    submittedAt: "2026-08-24 16:15"
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: "bk-1001",
    userId: "user-customer-1",
    spotId: "spot-1",
    spotTitle: "Metro Station Gate 2 Slot A",
    spotAddress: "Whitefield Metro, Bengaluru",
    passCode: "PRK-9482",
    hours: 3,
    startTime: "Today, 09:30 AM",
    totalPaid: 120,
    vehicleNumber: "KA 01 AB 7890",
    bookedAt: "2026-08-24 10:15",
    status: "active"
  }
];

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Fallback to default in-memory data
  }
  return structuredClone(fallback);
}

function saveToStorage() {
  try {
    localStorage.setItem(SPOTS_STORAGE_KEY, JSON.stringify(mockSpots));
    localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingSpots));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(userBookings));
  } catch {
    // Ignore quota errors
  }
}

export let mockSpots = loadFromStorage(SPOTS_STORAGE_KEY, DEFAULT_SPOTS);
export let pendingSpots = loadFromStorage(PENDING_STORAGE_KEY, DEFAULT_PENDING_SPOTS);
export let userBookings = loadFromStorage(BOOKINGS_STORAGE_KEY, DEFAULT_BOOKINGS);

const BASE_PLATFORM_REVENUE = 184500;
const BASE_HOST_EARNINGS = 14500;

function notifyDataChanged() {
  saveToStorage();
  window.dispatchEvent(new CustomEvent('parkora-data-change'));
}

export function resetDemoData() {
  mockSpots = structuredClone(DEFAULT_SPOTS);
  pendingSpots = structuredClone(DEFAULT_PENDING_SPOTS);
  userBookings = structuredClone(DEFAULT_BOOKINGS);
  resetWalletsAndTransactions();
  notifyDataChanged();
}

// DYNAMIC CALCULATION ENGINES
export function getDynamicPlatformStats() {
  const dynamicBookingsRevenue = userBookings.filter(b => b.status === 'active').reduce((sum, b) => sum + (b.totalPaid || 0), 0);
  const totalRevenue = BASE_PLATFORM_REVENUE + dynamicBookingsRevenue;
  const activeBookingsCount = userBookings.filter(b => b.status === 'active').length;
  const totalSpotsCount = mockSpots.length;
  const totalUsersCount = 1240 + userBookings.length;

  return {
    totalRevenue,
    activeBookingsCount,
    totalSpotsCount,
    totalUsersCount
  };
}

export function getDynamicHostStats(hostId = "user-owner-1") {
  const mySpots = mockSpots.filter(s => s.ownerId === hostId);
  const myBookings = userBookings.filter(b => {
    if (b.status !== 'active') return false;
    const spot = mockSpots.find(s => s.id === b.spotId || s.title === b.spotTitle);
    return spot && spot.ownerId === hostId;
  });

  const dynamicEarned = myBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);
  const monthlyIncome = BASE_HOST_EARNINGS + dynamicEarned;

  const totalCapacity = mySpots.reduce((sum, s) => sum + (s.totalCapacity || 5), 0);
  const totalAvailable = mySpots.reduce((sum, s) => sum + (s.active ? s.availableSlots : 0), 0);
  
  const occupiedSlots = Math.max(0, totalCapacity - totalAvailable);
  const occupancyRate = totalCapacity > 0 ? Math.round((occupiedSlots / totalCapacity) * 100) : 0;

  return {
    monthlyIncome,
    activeListingsCount: mySpots.filter(s => s.active).length,
    occupancyRate,
    totalSpots: mySpots
  };
}

export function getCategoryCounts() {
  const activeSpots = mockSpots.filter(s => s.active);
  const allCount = activeSpots.length;
  const metroCount = activeSpots.filter(s => s.category === 'metro').length;
  const evCount = activeSpots.filter(s => s.category === 'ev' || s.evCharging).length;
  const workCount = activeSpots.filter(s => s.category === 'work').length;
  const coveredCount = activeSpots.filter(s => Boolean(s.covered)).length;
  const carCount = activeSpots.filter(s => s.vehicleType === 'car' || s.vehicleType === 'all').length;
  const bikeCount = activeSpots.filter(s => s.vehicleType === 'bike' || s.vehicleType === 'all').length;

  const liveEVSlots = activeSpots
    .filter(s => s.evCharging)
    .reduce((sum, s) => sum + s.availableSlots, 0);

  return {
    all: allCount,
    metro: metroCount,
    ev: evCount,
    work: workCount,
    covered: coveredCount,
    car: carCount,
    bike: bikeCount,
    liveEVSlots
  };
}

// STATE MUTATIONS
export function processNewBooking(bookingData) {
  const spot = mockSpots.find(s => s.id === bookingData.spotId);
  const user = getCurrentUser();
  const hours = Number(bookingData.hours);
  const totalPaid = Number(bookingData.totalPaid);
  if (!spot || !spot.active || spot.availableSlots < 1) throw new Error('This spot is no longer available.');
  if (!user || !Number.isInteger(hours) || hours < 1 || hours > 12 || !Number.isFinite(totalPaid) || totalPaid !== spot.rateHourly * hours) throw new Error('Please review your booking details.');
  if ((user.walletBalance || 0) < totalPaid) throw new Error('Your demo wallet balance is too low.');

  spot.availableSlots -= 1;

  const newBooking = {
    id: `bk-${Date.now()}`,
    userId: bookingData.userId || user?.id || "user-customer-1",
    spotId: bookingData.spotId,
    spotTitle: bookingData.spotTitle,
    spotAddress: bookingData.spotAddress,
    passCode: `PRK-${Math.floor(1000 + Math.random() * 9000)}`,
    hours,
    startTime: bookingData.startTime || "Today, Immediate",
    totalPaid,
    vehicleNumber: bookingData.vehicleNumber || "KA 01 AB 7890",
    vehicleType: bookingData.vehicleType || "4-Wheeler (Car)",
    bookedAt: new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: "active"
  };

  userBookings.unshift(newBooking);
  updateUserWallet(-totalPaid, `Slot Reservation — ${spot.title}`, newBooking.passCode, newBooking.userId);
  notifyDataChanged();
  return newBooking;
}

export function cancelUserBooking(bookingId) {
  const booking = userBookings.find(b => b.id === bookingId && b.status === 'active');
  if (booking) {
    // Restore slot count
    const spot = mockSpots.find(s => s.id === booking.spotId || s.title === booking.spotTitle);
    if (spot) {
      spot.availableSlots = Math.min(spot.totalCapacity || 10, spot.availableSlots + 1);
    }

    // Refund customer wallet with ledger tracking
    booking.status = 'cancelled';
    booking.cancelledAt = new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    updateUserWallet(booking.totalPaid, `Cancellation Refund — Pass ${booking.passCode}`, `REFUND-${booking.passCode}`, booking.userId);
    notifyDataChanged();
    return booking;
  }
  return null;
}

export function addNewSpot(spotData) {
  const title = String(spotData.title || '').trim();
  const address = String(spotData.address || '').trim();
  const rateHourly = Number(spotData.rateHourly);
  if (title.length < 3 || address.length < 5 || !Number.isFinite(rateHourly) || rateHourly < 10 || rateHourly > 500) {
    throw new Error('Please provide a valid title, address, and hourly rate (₹10–₹500).');
  }

  const inferredCity = address.toLowerCase().includes('mumbai')
    ? 'Mumbai'
    : address.toLowerCase().includes('gurugram') || address.toLowerCase().includes('delhi')
    ? 'Gurugram'
    : 'Bengaluru';

  const newPendingSpot = {
    id: `pending-spot-${Date.now()}`,
    ownerId: spotData.ownerId || "user-owner-1",
    ownerName: spotData.ownerName || "Sarah Jenkins",
    title,
    address,
    city: inferredCity,
    category: spotData.category || "metro",
    vehicleType: spotData.vehicleType || "all",
    covered: Boolean(spotData.covered ?? true),
    rateHourly,
    distanceMetro: String(spotData.distanceMetro || "200m to Metro").trim(),
    evCharging: Boolean(spotData.evCharging),
    availableSlots: Number(spotData.availableSlots) || 3,
    totalCapacity: (Number(spotData.availableSlots) || 3) + 2,
    submittedAt: new Date().toLocaleString()
  };
  pendingSpots.unshift(newPendingSpot);
  notifyDataChanged();
  return newPendingSpot;
}

export function approvePendingSpot(pendingId) {
  const idx = pendingSpots.findIndex(p => p.id === pendingId);
  if (idx !== -1) {
    const item = pendingSpots.splice(idx, 1)[0];
    const approvedSpot = {
      id: `spot-${Date.now()}`,
      ownerId: item.ownerId || "user-owner-1",
      title: item.title,
      address: item.address,
      city: item.city || "Bengaluru",
      category: item.category || "metro",
      vehicleType: item.vehicleType || "all",
      covered: Boolean(item.covered ?? true),
      rateHourly: Number(item.rateHourly) || 40,
      distanceMetro: item.distanceMetro || "200m to Metro",
      evCharging: Boolean(item.evCharging),
      availableSlots: Number(item.availableSlots) || 3,
      totalCapacity: item.totalCapacity || 5,
      rating: 5.0,
      reviewsCount: 1,
      mapX: Math.floor(25 + Math.random() * 55),
      mapY: Math.floor(25 + Math.random() * 50),
      amenities: [
        ...(item.covered ? ["Covered Bay"] : ["Open Bay"]),
        ...(item.evCharging ? ["EV Charger"] : ["Verified Host"]),
        item.vehicleType === 'bike' ? "2-Wheeler Bay" : item.vehicleType === 'car' ? "4-Wheeler Bay" : "Car & 2-Wheeler"
      ],
      active: true,
      status: "approved"
    };
    mockSpots.unshift(approvedSpot);
    notifyDataChanged();
    return approvedSpot;
  }
  return null;
}

export function rejectPendingSpot(pendingId) {
  const idx = pendingSpots.findIndex(p => p.id === pendingId);
  if (idx !== -1) {
    const rejected = pendingSpots.splice(idx, 1)[0];
    notifyDataChanged();
    return rejected;
  }
  return null;
}

export function toggleSpotStatus(spotId) {
  const spot = mockSpots.find(s => s.id === spotId);
  if (spot) {
    spot.active = !spot.active;
    notifyDataChanged();
    return spot.active;
  }
  return false;
}
