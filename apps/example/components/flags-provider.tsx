"use client";

import { FlagValues } from "flags/react";
import * as React from "react";
import type * as flags from "../flags";

// Extract the flag names from the flags module
type FlagDefinitions = typeof flags;
type FlagKey = keyof FlagDefinitions;

// Type for the evaluated flag values - inferred from the actual flags
type FlagValues = {
  [K in FlagKey]: Awaited<ReturnType<FlagDefinitions[K]>>;
};

const FlagsContext = React.createContext<FlagValues | undefined>(undefined);

/** Hook to access all flags at once */
export function useFlags(): FlagValues {
  const context = React.useContext(FlagsContext);
  if (context === undefined) {
    throw new Error("useFlags must be used within a FlagsProvider");
  }
  return context;
}

/**
 * Hook to access a specific flag by key with full type safety
 *
 * @example
 *   const isTestingEnabled = useFlag("testing");
 */
export function useFlag<K extends FlagKey>(key: K): FlagValues[K] {
  const flags = useFlags();
  return flags[key];
}

export default function FlagsProvider({
  children,
  flags,
}: {
  children: React.ReactNode;
  flags: FlagValues;
}) {
  return (
    <FlagsContext.Provider value={flags}>
      {children}

      <FlagValues values={flags} />
    </FlagsContext.Provider>
  );
}
