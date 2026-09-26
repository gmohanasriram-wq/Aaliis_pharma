"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

let cachedQuery: MediaQueryList | null = null;

function getQuery() {
  if (!cachedQuery) cachedQuery = window.matchMedia(QUERY);
  return cachedQuery;
}

function subscribe(onStoreChange: () => void) {
  const query = getQuery();
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return getQuery().matches;
}

/**
 * The server has no media queries, so it reports "no preference" — which is
 * exactly the HTML it renders. `useSyncExternalStore` uses this snapshot for
 * the hydration pass and only then re-reads the real client value, so a visitor
 * with reduced motion enabled gets the reduced experience without React
 * reporting a hydration mismatch.
 */
function getServerSnapshot() {
  return false;
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Preferred over Framer Motion's `useReducedMotion` here for two reasons: it
 * keeps the server and client renders reconcilable (see above), and it stays
 * live — Framer's version reads a module-level singleton once, with no setter,
 * so it never updates if the preference changes mid-session.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
