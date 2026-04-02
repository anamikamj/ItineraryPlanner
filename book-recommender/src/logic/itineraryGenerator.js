/**
 * Generates a day-wise itinerary based on selections.
 * Pure function — no side effects, easy to test.
 */
export function generateItinerary({ destination, hotel, selectedAttractions, duration, travelers }) {
  const days = [];
  const attractionsPerDay = 2; // max activities per day

  // Chunk attractions into days
  for (let day = 1; day <= duration; day++) {
    const startIdx = (day - 1) * attractionsPerDay;
    const dayAttractions = selectedAttractions.slice(startIdx, startIdx + attractionsPerDay);

    days.push({
      day,
      title: getDayTitle(day, duration),
      morning: day === 1 ? `Arrive at ${destination.name}, check in to ${hotel.name}` : null,
      activities: dayAttractions,
      evening: day === duration ? `Check out, head back home` : "Explore local food & markets",
      meals: generateMealSuggestions(destination, day),
    });
  }

  return days;
}

function getDayTitle(day, total) {
  if (day === 1) return "Arrival & Settle In";
  if (day === total) return "Departure Day";
  return `Exploration Day ${day - 1}`;
}

function generateMealSuggestions(destination, day) {
  // Simple rule: rotate suggestions
  const mealSets = {
    goa: [
      { breakfast: "Poha at local café", lunch: "Fish curry rice", dinner: "Seafood BBQ at shack" },
      { breakfast: "Hotel buffet", lunch: "Prawn balchão", dinner: "Goan sausage at Thalassa" },
    ],
    manali: [
      { breakfast: "Aloo paratha + chai", lunch: "Thupka at Mall Road", dinner: "Trout fish at local dhaba" },
      { breakfast: "Pancakes at Café 1947", lunch: "Momos + soup", dinner: "BBQ corn + bonfire snacks" },
    ],
    kerala: [
      { breakfast: "Appam + stew", lunch: "Sadhya (banana leaf)", dinner: "Karimeen pollichathu" },
      { breakfast: "Puttu + kadala curry", lunch: "Seafood at backwater café", dinner: "Kerala prawn curry" },
    ],
  };

  const sets = mealSets[destination.id] || [
    { breakfast: "Local breakfast", lunch: "Regional cuisine", dinner: "Restaurant dinner" },
  ];

  return sets[(day - 1) % sets.length];
}

/**
 * Estimates total budget breakdown
 */
export function estimateBudget({ hotel, selectedAttractions, duration, travelers }) {
  const hotelCost = hotel.pricePerNight * duration * Math.ceil(travelers / 2);
  const attractionCost = selectedAttractions.reduce((sum, a) => sum + a.cost, 0) * travelers;
  const foodCost = 500 * duration * travelers; // ₹500/person/day estimate
  const miscCost = Math.round((hotelCost + attractionCost + foodCost) * 0.1); // 10% buffer

  return {
    hotel: hotelCost,
    attractions: attractionCost,
    food: foodCost,
    misc: miscCost,
    total: hotelCost + attractionCost + foodCost + miscCost,
  };
}