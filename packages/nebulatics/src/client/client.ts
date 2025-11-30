import "client-only";
import { isDevelopment, merge } from "@nebulatics/shared";
import { EventName, TrackData, TrackFlags } from "../types";
import { getAllFlagValues } from "./flags";

function getSessionId() {
  const sessionId = sessionStorage.getItem("sessionId");
  if (sessionId) {
    return sessionId;
  }

  const newSessionId = crypto.randomUUID();
  sessionStorage.setItem("sessionId", newSessionId);
  return newSessionId;
}

export function createClient() {
  const sessionId = getSessionId();

  async function sendRequest(
    eventName: EventName,
    data?: TrackData,
    flags?: TrackFlags,
  ) {
    let flagValues = null;
    try {
      flagValues = getAllFlagValues();
    } catch (error) {
      if (isDevelopment()) {
        console.error(
          `[Nebulatics] Failed to get flag values. ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    const mergedFlags = flagValues != null ? merge(flagValues, flags) : flags;

    await fetch("/api/track", {
      method: "POST",
      keepalive: true,
      // todo: think about this body, it should be a more structured object
      body: JSON.stringify({
        event: eventName,
        data,
        ...(mergedFlags != null ? { flags: mergedFlags } : {}),
      }),
      headers: {
        "content-type": "application/json",
        // todo: think about this session id
        "x-session-id": sessionId,
      },
      credentials: "include",
    });
  }

  return {
    track(eventName: EventName) {
      return sendRequest(eventName);
    },
    identify(userId: string) {},
  };
}
