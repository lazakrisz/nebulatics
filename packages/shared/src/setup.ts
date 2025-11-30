import { init } from "./common";
import { isBrowser } from "./utils";

export function setup() {
  // Only initialize if we're in the browser
  if (!isBrowser()) {
    return;
  }

  // Initialize the instance
  init();

  // Todo: append the script tag to the head?
}
