// src/components/steps/Step3_Explore.jsx
export default function Step3_Explore({ planner }) {
  const { selectedDestination, selectedHotel, selectedAttractions } = planner.state;
  const { update, goToStep } = planner;

  const toggleAttraction = (attraction) => {
    const exists = selectedAttractions.find((a) => a.id === attraction.id);
    if (exists) {
      update("selectedAttractions", selectedAttractions.filter((a) => a.id !== attraction.id));
    } else {
      update("selectedAttractions", [...selectedAttractions, attraction]);
    }
  };

  const handleNext = () => {
    if (!selectedHotel) { alert("Please select a hotel!"); return; }
    if (selectedAttractions.length === 0) { alert("Pick at least one attraction!"); return; }
    goToStep(4);
  };

  return (
    <div className="step-card">
      <h2>Explore {selectedDestination.name} 🏨</h2>

      <h3>Choose Your Stay</h3>
      <div className="hotel-list">
        {selectedDestination.hotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`hotel-card ${selectedHotel?.id === hotel.id ? "selected" : ""}`}
            onClick={() => update("selectedHotel", hotel)}
          >
            <strong>{hotel.name}</strong>
            <span>{"⭐".repeat(hotel.stars)}</span>
            <span>₹{hotel.pricePerNight}/night</span>
            <span className="badge">{hotel.type}</span>
          </div>
        ))}
      </div>

      <h3>Select Attractions</h3>
      <div className="attraction-list">
        {selectedDestination.attractions.map((attraction) => {
          const isSelected = selectedAttractions.find((a) => a.id === attraction.id);
          return (
            <div
              key={attraction.id}
              className={`attraction-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleAttraction(attraction)}
            >
              <strong>{attraction.name}</strong>
              <span>⏱ {attraction.duration}h</span>
              <span>{attraction.cost === 0 ? "Free" : `₹${attraction.cost}`}</span>
            </div>
          );
        })}
      </div>

      <div className="step-actions">
        <button onClick={() => goToStep(2)} className="btn-secondary">← Back</button>
        <button onClick={handleNext} className="btn-primary">Generate Itinerary →</button>
      </div>
    </div>
  );
}