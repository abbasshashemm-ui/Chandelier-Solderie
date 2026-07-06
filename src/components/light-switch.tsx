"use client";

import { useLights } from "./lights-provider";

export function LightSwitch() {
  const { lightsOn, toggleLights } = useLights();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lightsOn}
      aria-label={lightsOn ? "Turn room lights off" : "Turn room lights on"}
      onClick={toggleLights}
      className={`light-switch ${lightsOn ? "light-switch--on" : ""}`}
    >
      <span className="light-switch__plate" aria-hidden />
      <span className="light-switch__rocker" aria-hidden />
    </button>
  );
}
