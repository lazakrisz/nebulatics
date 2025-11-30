import "client-only";
import { isDevelopment, merge } from "@nebulatics/shared";
import { Events, KnownPayload, TrackData, TrackFlags } from "../types";
import { getAllFlagValues } from "./flags";

let initialized = false;

function getSessionId() {
  const sessionId = sessionStorage.getItem("sessionId");
  if (sessionId) {
    return sessionId;
  }

  const newSessionId = crypto.randomUUID();
  sessionStorage.setItem("sessionId", newSessionId);
  return newSessionId;
}

function initialize() {
  const { location, navigator, screen, history, top } = window;
  const { doNotTrack, userAgent, platform, language } = navigator;

  if (initialized) {
    return;
  }

  initialized = true;
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

  function getPayload(
    eventName: Events,
    data?: TrackData,
    flags?: TrackFlags,
  ): KnownPayload {
    return {
      e: eventName,
      data,
      flags,
    };
  }

  async function sendRequest(
    eventName: Events,
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

    const payload = getPayload(eventName, data, mergedFlags);

    await fetch(`${basePath}/e`, {
      method: "POST",
      keepalive: true,
      body: JSON.stringify(payload),
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
    const payload = getPayload("identify", { userId });

    await fetch(`${basePath}/e`, {
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
    track(eventName: Events) {
      return sendRequest(eventName);
    },
    identify(userId: string) {
      return sendIdentifyRequest(userId);
    },
  };
}
