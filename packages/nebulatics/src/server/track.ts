import "server-only";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { after, connection } from "next/server";

export function testing() {
  // we most likely will need to await connection() here

  const store = workAsyncStorage.getStore();

  if (!store) {
    // log or something
    return {};
  }

  const workUnitStore = workUnitAsyncStorage.getStore();

  if (!workUnitStore) {
    // log or something
    return {};
  }
  console.log("type: ", workUnitStore.type);
  console.log("store: ", JSON.stringify(store));

  if (workUnitStore.type === "request") {
    after(() => {
      const wasRevalidated = store.pathWasRevalidated;
      // If the path was revalidated, we don't need to track it again.
      if (wasRevalidated) {
        return;
      }

      const pathname = workUnitStore.url.pathname;
      const query = workUnitStore.url.search;

      console.log("data: ", { pathname, query });
    });
  }
}
