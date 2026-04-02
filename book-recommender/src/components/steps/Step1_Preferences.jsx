// src/components/steps/Step1_Preferences.jsx
export default function Step1_Preferences({ planner }) {
  const { preferences } = planner.state;
  const { updatePreferences, goToStep } = planner;

  const handleNext = () => {
    // Basic validation
    if (!preferences.budget || !preferences.startDate || !preferences.endDate
        || !preferences.climate || !preferences.tripType) {
      alert("Please fill all fields!");
      return;
    }
    goToStep(2);
  };

  return (
    <div className="step-card">
      <h2>Tell us about your trip 🧳</h2>

      <label>Budget (₹ per person)</label>
      <input
        type="number"
        value={preferences.budget}
        onChange={(e) => updatePreferences({ budget: Number(e.target.value) })}
        placeholder="e.g. 15000"
      />

      <label>Start Date</label>
      <input
        type="date"
        value={preferences.startDate}
        onChange={(e) => updatePreferences({ startDate: e.target.value })}
      />

      <label>End Date</label>
      <input
        type="date"
        value={preferences.endDate}
        onChange={(e) => updatePreferences({ endDate: e.target.value })}
      />

      <label>Number of Travelers</label>
      <input
        type="number"
        min="1"
        max="20"
        value={preferences.travelers}
        onChange={(e) => updatePreferences({ travelers: Number(e.target.value) })}
      />

      <label>Climate Preference</label>
      <select
        value={preferences.climate}
        onChange={(e) => updatePreferences({ climate: e.target.value })}
      >
        <option value="">Select climate</option>
        <option value="tropical">Tropical / Warm</option>
        <option value="cold">Cold / Mountains</option>
      </select>

      <label>Trip Type</label>
      <select
        value={preferences.tripType}
        onChange={(e) => updatePreferences({ tripType: e.target.value })}
      >
        <option value="">Select trip type</option>
        <option value="beach">Beach & Relax</option>
        <option value="adventure">Adventure</option>
        <option value="honeymoon">Honeymoon</option>
        <option value="nature">Nature</option>
        <option value="leisure">Leisure</option>
      </select>

      <button onClick={handleNext} className="btn-primary">
        Find Destinations →
      </button>
    </div>
  );
}