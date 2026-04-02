// Base checklist everyone needs
export const baseItems = [
  "Valid ID / Passport",
  "Travel insurance documents",
  "Booking confirmations (hotel, transport)",
  "Emergency contact list",
  "Cash + Cards",
  "Phone charger & power bank",
  "Earphones / headphones",
];

// Rules: if condition matches, add these items
export const checklistRules = [
  {
    condition: (trip) => trip.climate === "cold",
    items: ["Heavy winter jacket", "Thermal innerwear", "Woollen socks (3+ pairs)", "Gloves & muffler", "Lip balm (SPF)", "Hand warmers"],
  },
  {
    condition: (trip) => trip.climate === "tropical",
    items: ["Sunscreen SPF 50+", "Sunglasses", "Light cotton clothes", "Insect repellent", "ORS sachets (hydration)"],
  },
  {
    condition: (trip) => trip.tripType === "adventure",
    items: ["Trekking shoes", "First aid kit", "Rain poncho", "Water bottle (2L)", "Energy bars", "Torch / headlamp"],
  },
  {
    condition: (trip) => trip.tripType === "beach",
    items: ["Swimwear", "Waterproof sandals", "Beach towel", "Waterproof phone pouch", "After-sun lotion"],
  },
  {
    condition: (trip) => trip.tripType === "honeymoon",
    items: ["Matching outfits (optional)", "Romantic dinner reservation printouts", "Couple spa vouchers", "Scented candles (small)"],
  },
  {
    condition: (trip) => trip.travelers > 2,
    items: ["Group booking confirmation", "Shared expense tracker app", "Walkie-talkies or group WhatsApp"],
  },
  {
    condition: (trip) => trip.duration >= 5,
    items: ["Laundry bag", "Travel-size detergent", "Extra memory card / storage", "Portable WiFi / SIM card"],
  },
];