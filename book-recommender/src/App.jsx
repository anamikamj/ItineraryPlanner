import { useTripPlanner } from "./hooks/useTripPlanner";
import Step1_Preferences from "./components/steps/Step1_Preferences";
import Step2_Destination from "./components/steps/Step2_Destination";
import Step3_Explore from "./components/steps/Step3_Explore";
import Step4_Itinerary from "./components/steps/Step4_Itinerary";
import ProgressBar from "./components/shared/ProgressBar";
import "./App.css";

export default function App() {
  const planner = useTripPlanner();
  const { currentStep } = planner.state;

  const steps = [
    { label: "Preferences", component: <Step1_Preferences planner={planner} /> },
    { label: "Destination", component: <Step2_Destination planner={planner} /> },
    { label: "Explore",     component: <Step3_Explore planner={planner} /> },
    { label: "Itinerary",   component: <Step4_Itinerary planner={planner} /> },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ TripCraft</h1>
        <p>Your personal travel planner</p>
      </header>

      <ProgressBar currentStep={currentStep} steps={steps.map((s) => s.label)} />

      <main className="step-container">
        {steps[currentStep - 1].component}
      </main>
    </div>
  );
}