// src/components/steps/Step4_Itinerary.jsx
import { useEffect, useState } from "react";
import { generateItinerary, estimateBudget } from "../../logic/itineraryGenerator";
import { generateChecklist } from "../../logic/checklistGenerator";

export default function Step4_Itinerary({ planner }) {
  const { selectedDestination, selectedHotel, selectedAttractions, preferences } = planner.state;
  const { getTripDuration, goToStep, resetTrip } = planner;

  const duration = getTripDuration();
  const [checkedItems, setCheckedItems] = useState({});

  const itinerary = generateItinerary({
    destination: selectedDestination,
    hotel: selectedHotel,
    selectedAttractions,
    duration,
    travelers: preferences.travelers,
  });

  const budget = estimateBudget({
    hotel: selectedHotel,
    selectedAttractions,
    duration,
    travelers: preferences.travelers,
  });

  const checklist = generateChecklist({
    climate: selectedDestination.climate,
    tripType: preferences.tripType,
    travelers: preferences.travelers,
    duration,
  });

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="step-card">
      <h2>Your Itinerary for {selectedDestination.name} 🗓️</h2>
      <p>{duration} days · {preferences.travelers} traveler(s) · {selectedHotel.name}</p>

      {/* Day-wise plan */}
      <section className="itinerary-section">
        {itinerary.map((day) => (
          <div key={day.day} className="day-card">
            <h3>Day {day.day} — {day.title}</h3>
            {day.morning && <p>🌅 <strong>Morning:</strong> {day.morning}</p>}
            <p>🎯 <strong>Activities:</strong></p>
            <ul>
              {day.activities.map((act) => (
                <li key={act.id}>{act.name} ({act.duration}h)</li>
              ))}
            </ul>
            <p>🍽️ <strong>Meals:</strong> {day.meals.breakfast} | {day.meals.lunch} | {day.meals.dinner}</p>
            <p>🌙 <strong>Evening:</strong> {day.evening}</p>
          </div>
        ))}
      </section>

      {/* Budget breakdown */}
      <section className="budget-section">
        <h3>💰 Estimated Budget</h3>
        <table>
          <tbody>
            <tr><td>Hotel</td><td>₹{budget.hotel}</td></tr>
            <tr><td>Attractions</td><td>₹{budget.attractions}</td></tr>
            <tr><td>Food</td><td>₹{budget.food}</td></tr>
            <tr><td>Miscellaneous</td><td>₹{budget.misc}</td></tr>
            <tr className="total"><td><strong>Total</strong></td><td><strong>₹{budget.total}</strong></td></tr>
          </tbody>
        </table>
      </section>

      {/* Smart Checklist */}
      <section className="checklist-section">
        <h3>✅ Packing Checklist</h3>
        {checklist.map((item) => (
          <label key={item} className="checklist-item">
            <input
              type="checkbox"
              checked={!!checkedItems[item]}
              onChange={() => toggleCheck(item)}
            />
            <span style={{ textDecoration: checkedItems[item] ? "line-through" : "none" }}>
              {item}
            </span>
          </label>
        ))}
      </section>

      <div className="step-actions">
        <button onClick={() => goToStep(3)} className="btn-secondary">← Edit Selections</button>
        <button onClick={resetTrip} className="btn-danger">🔄 Plan New Trip</button>
      </div>
    </div>
  );
}