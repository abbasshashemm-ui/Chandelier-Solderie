"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "cs-lights-on";

type LightsContextValue = {
  lightsOn: boolean;
  toggleLights: () => void;
};

const LightsContext = createContext<LightsContextValue | null>(null);

export function LightsProvider({ children }: { children: ReactNode }) {
  const [lightsOn, setLightsOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setLightsOn(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    document.documentElement.classList.toggle("lights-on", lightsOn);
    localStorage.setItem(STORAGE_KEY, String(lightsOn));
  }, [lightsOn, ready]);

  const toggleLights = useCallback(() => {
    setLightsOn((current) => !current);
  }, []);

  return (
    <LightsContext.Provider value={{ lightsOn, toggleLights }}>
      {children}
    </LightsContext.Provider>
  );
}

const defaultLightsValue: LightsContextValue = {
  lightsOn: false,
  toggleLights: () => {},
};

export function useLights() {
  const context = useContext(LightsContext);
  return context ?? defaultLightsValue;
}
