// src/components/shared/ProgressBar.jsx
export default function ProgressBar({ currentStep, steps }) {
  return (
    <div className="progress-bar">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={label} className={`progress-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
            <div className="step-circle">{isDone ? "✓" : stepNum}</div>
            <span>{label}</span>
            {idx < steps.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}