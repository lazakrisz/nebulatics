"use client";

import { useEffect, useRef } from "react";

export function Analytics() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;
  }, []);
}
