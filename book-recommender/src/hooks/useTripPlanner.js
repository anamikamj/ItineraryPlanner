import { useState, useEffect } from "react";

const STORAGE_KEY = "tripPlannerState";

const initialState = {
  currentStep: 1,
  preferences: {
    budget: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    climate: "",   // "tropical" | "cold"
    tripType: "",  // "beach" | "adventure" | "honeymoon" | "leisure" | "nature"
  },
  selectedDestination: null,
  selectedHotel: null,
  selectedAttractions: [],
  generatedItinerary: null,
  estimatedBudget: null,
  checklist: [],
};

export function useTripPlanner() {
  const [state, setState] = useState(() => {
    // Load from localStorage on first render
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  // Save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Helper to update a slice of state
  const update = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const goToStep = (step) => update("currentStep", step);

  const updatePreferences = (prefs) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  };

  const resetTrip = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  // Calculate trip duration in days
  const getTripDuration = () => {
    const { startDate, endDate } = state.preferences;
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate) - new Date(startDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return {
    state,
    update,
    goToStep,
    updatePreferences,
    resetTrip,
    getTripDuration,
  };
}