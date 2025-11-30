import "server-only";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { after, connection } from "next/server";

interface TrackData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TrackFlags {
  [key: string]:
    | string
    | Record<string, string | number | boolean | null | undefined | unknown>
    | number
    | boolean
    | null
    | undefined
    | unknown;
}

// TODO: the name should be a union + string for custom type
interface TrackOptions {
  /** The name of the event to track. */
  name: string;
  /** The data to track, this needs to be a JSON serializable object. */
  data?: TrackData;
  /** The flags to track, from the flags package. */
  flags?: TrackFlags;
}

/**
 * Track the request and response of the current request.
 *
 * Forces Next.js to use dynamic rendering for the current request. Read more
 * about it
 * [here](https://nextjs.org/docs/app/guides/caching#dynamic-rendering).
 */
export async function track(options: TrackOptions): Promise<void> {
  await connection();

  const store = workAsyncStorage.getStore();

  if (!store) {
    // log or something
    return;
  }

  const workUnitStore = workUnitAsyncStorage.getStore();

  if (!workUnitStore) {
    // log or something
    return;
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
