import { updateUserWallet } from '../utils/auth.js';

export let mockSpots = [
  {
    id: "spot-1",
    ownerId: "user-owner-1",
    title: "Metro Station Gate 2 Slot A",
    address: "Whitefield Metro, Bengaluru",
    category: "metro",
    rateHourly: 40,
    distanceMetro: "50m from Gate 2",
    evCharging: true,
    availableSlots: 4,
    totalCapacity: 5,
    rating: 4.9,
    reviewsCount: 128,
    active: true,
    status: "approved"
  },
  {
    id: "spot-2",
    ownerId: "user-owner-1",
    title: "Tech Park Driveway #14",
    address: "Koramangala 4th Block, Bengaluru",
    category: "work",
    rateHourly: 35,
    distanceMetro: "300m from Sony World",
    evCharging: false,
    availableSlots: 2,
    totalCapacity: 4,
    rating: 4.8,
    reviewsCount: 84,
    active: true,
    status: "approved"
  },
  {
    id: "spot-3",
    ownerId: "user-owner-2",
    title: "Terminal 2 Premium EV Pod",
    address: "Airport Road, Mumbai",
    category: "ev",
    rateHourly: 60,
    distanceMetro: "Airport Link Station",
    evCharging: true,
    availableSlots: 6,
    totalCapacity: 8,
    rating: 5.0,
    reviewsCount: 210,
    active: true,
    status: "approved"
  },
  {
    id: "spot-4",
    ownerId: "user-owner-1",
    title: "Andheri Metro Covered Bay",
    address: "Andheri West Metro, Mumbai",
    category: "metro",
    rateHourly: 45,
    distanceMetro: "80m from Platform 1",
    evCharging: true,
    availableSlots: 3,
    totalCapacity: 6,
    rating: 4.7,
    reviewsCount: 96,
    active: true,
    status: "approved"
  },
  {
    id: "spot-5",
    ownerId: "user-owner-3",
    title: "Cyber City Private Slot",
    address: "DLF Phase 2, Gurugram",
    category: "work",
    rateHourly: 50,
    distanceMetro: "150m from Rapid Metro",
    evCharging: false,
    availableSlots: 1,
    totalCapacity: 3,
    rating: 4.9,
    reviewsCount: 142,
    active: true,
    status: "approved"
  },
  {
    id: "spot-6",
    ownerId: "user-owner-2",
    title: "Solar EV Fast Charger Spot",
    address: "Indiranagar 100ft Road, Bengaluru",
    category: "ev",
    rateHourly: 55,
    distanceMetro: "400m from Indiranagar Metro",
    evCharging: true,
    availableSlots: 5,
    totalCapacity: 6,
    rating: 4.85,
    reviewsCount: 175,
    active: true,
    status: "approved"
  }
];

export let pendingSpots = [
  {
    id: "pending-spot-101",
    ownerId: "user-owner-1",
    ownerName: "Sarah Jenkins",
    title: "MG Road Executive Covered Slot",
    address: "14 MG Road, Bengaluru",
    category: "metro",
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
    category: "work",
    rateHourly: 30,
    distanceMetro: "500m from Bus Junction",
    evCharging: false,
    availableSlots: 2,
    totalCapacity: 3,
    submittedAt: "2026-08-24 16:15"
  }
];

export let userBookings = [
  {
    id: "bk-1001",
    userId: "user-customer-1",
    spotId: "spot-1",
    spotTitle: "Metro Station Gate 2 Slot A",
    spotAddress: "Whitefield Metro, Bengaluru",
    passCode: "PRK-9482",
    hours: 3,
    totalPaid: 120,
    vehicleNumber: "KA 01 AB 7890",
    bookedAt: "2026-08-24 10:15",
    status: "active"
  }
];

const BASE_PLATFORM_REVENUE = 184500;
const BASE_HOST_EARNINGS = 14500;

function notifyDataChanged() {
  window.dispatchEvent(new CustomEvent('parkora-data-change'));
}

// DYNAMIC CALCULATION ENGINES
export function getDynamicPlatformStats() {
  const dynamicBookingsRevenue = userBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);
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
  const evCount = activeSpots.filter(s => s.category === 'ev').length;
  const workCount = activeSpots.filter(s => s.category === 'work').length;
  const coveredCount = activeSpots.filter(s => s.category === 'metro' || s.category === 'work').length;

  const liveEVSlots = activeSpots
    .filter(s => s.evCharging)
    .reduce((sum, s) => sum + s.availableSlots, 0);

  return {
    all: allCount,
    metro: metroCount,
    ev: evCount,
    work: workCount,
    covered: coveredCount,
    liveEVSlots
  };
}

// STATE MUTATIONS
export function processNewBooking(bookingData) {
  const spot = mockSpots.find(s => s.id === bookingData.spotId);
  if (spot && spot.availableSlots > 0) {
    spot.availableSlots -= 1;
  }

  const newBooking = {
    id: `bk-${Date.now()}`,
    userId: bookingData.userId || "user-customer-1",
    spotId: bookingData.spotId,
    spotTitle: bookingData.spotTitle,
    spotAddress: bookingData.spotAddress,
    passCode: `PRK-${Math.floor(1000 + Math.random() * 9000)}`,
    hours: bookingData.hours,
    totalPaid: bookingData.totalPaid,
    vehicleNumber: bookingData.vehicleNumber || "KA 01 AB 7890",
    bookedAt: new Date().toLocaleString(),
    status: "active"
  };

  userBookings.unshift(newBooking);
  updateUserWallet(-bookingData.totalPaid);
  notifyDataChanged();
  return newBooking;
}

export function cancelUserBooking(bookingId) {
  const idx = userBookings.findIndex(b => b.id === bookingId);
  if (idx !== -1) {
    const booking = userBookings.splice(idx, 1)[0];
    
    // Restore slot count
    const spot = mockSpots.find(s => s.id === booking.spotId || s.title === booking.spotTitle);
    if (spot) {
      spot.availableSlots = Math.min(spot.totalCapacity || 10, spot.availableSlots + 1);
    }

    // Refund customer wallet
    updateUserWallet(booking.totalPaid);
    notifyDataChanged();
    return booking;
  }
  return null;
}

export function addNewSpot(spotData) {
  const newSpot = {
    id: `spot-${Date.now()}`,
    ownerId: spotData.ownerId || "user-owner-1",
    title: spotData.title,
    address: spotData.address,
    category: spotData.category || "metro",
    rateHourly: Number(spotData.rateHourly) || 40,
    distanceMetro: spotData.distanceMetro || "200m to Metro",
    evCharging: Boolean(spotData.evCharging),
    availableSlots: Number(spotData.availableSlots) || 3,
    totalCapacity: (Number(spotData.availableSlots) || 3) + 2,
    rating: 5.0,
    reviewsCount: 1,
    active: true,
    status: "approved"
  };
  mockSpots.unshift(newSpot);
  notifyDataChanged();
  return newSpot;
}

export function approvePendingSpot(pendingId) {
  const idx = pendingSpots.findIndex(p => p.id === pendingId);
  if (idx !== -1) {
    const item = pendingSpots.splice(idx, 1)[0];
    const approvedSpot = {
      ...item,
      id: `spot-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
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
