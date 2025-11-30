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

interface ClientOptions {
  /**
   * The base path for the API.
   *
   * @default "/a"
   */
  basePath?: string;
}

export function createClient(options: ClientOptions = {}) {
  const { basePath = "/a" } = options;

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

    await fetch(`${basePath}/track`, {
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
    }).catch((error) => {
      if (isDevelopment()) {
        console.error(
          `[Nebulatics] Failed to send track event. ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
  }

  async function sendIdentifyRequest(userId: string) {
    await fetch(`${basePath}/identify`, {
      method: "POST",
      keepalive: true,
      body: JSON.stringify({
        userId,
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).catch((error) => {
      if (isDevelopment()) {
        console.error(
          `[Nebulatics] Failed to send identify request. ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
  }

  return {
    track(eventName: EventName) {
      return sendRequest(eventName);
    },
    identify(userId: string) {
      return sendIdentifyRequest(userId);
    },
  };
}
