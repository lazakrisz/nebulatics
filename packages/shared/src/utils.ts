/**
 * Check if the code is running in the browser.
 *
 * @returns True if the code is running in the browser, false otherwise.
 */
export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Check if the code is running on the server.
 *
 * @returns True if the code is running on the server, false otherwise.
 */
export function isServer() {
  return typeof window === "undefined";
}
