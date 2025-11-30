import "server-only";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { after } from "next/server";

export function testing() {
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

  if (workUnitStore.type === "request") {
    after(() => {
      const pathname = workUnitStore.url.pathname;
      const query = workUnitStore.url.search;

      console.log("data: ", { pathname, query });
    });
  }
}
