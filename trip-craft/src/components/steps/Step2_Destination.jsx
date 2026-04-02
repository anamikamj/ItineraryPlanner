// src/components/steps/Step2_Destination.jsx
import { destinations } from "../../data/destinations";

export default function Step2_Destination({ planner }) {
  const { preferences } = planner.state;
  const { update, goToStep } = planner;

  // 🧠 Rule-based filtering
  const suggested = destinations.filter((dest) => {
    const budgetMatch =
      preferences.budget >= dest.minBudget && preferences.budget <= dest.maxBudget;
    const climateMatch = dest.climate === preferences.climate;
    const typeMatch = dest.tripTypes.includes(preferences.tripType);
    return budgetMatch && climateMatch && typeMatch;
  });

  const handleSelect = (destination) => {
    update("selectedDestination", destination);
    update("selectedHotel", null);
    update("selectedAttractions", []);
    goToStep(3);
  };

  return (
    <div className="step-card">
      <h2>Suggested Destinations 🌍</h2>
      {suggested.length === 0 ? (
        <p>No destinations found for your preferences. Try adjusting your budget or trip type.</p>
      ) : (
        <div className="destination-grid">
          {suggested.map((dest) => (
            <div key={dest.id} className="destination-card" onClick={() => handleSelect(dest)}>
              <img src={dest.image} alt={dest.name} />
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <span>Budget: ₹{dest.minBudget} – ₹{dest.maxBudget}</span>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => goToStep(1)} className="btn-secondary">← Back</button>
    </div>
  );
}