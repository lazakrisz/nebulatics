// Built-in event names
export const enum EventName {
  page_view = "page_view",
  click = "click",
  form_submit = "form_submit",
  view = "view",
  identify = "identify",
}

export type Events = `${EventName}` | (string & {});

// Specific event data types
export interface PageViewData {
  dims: string; // dimensions
  lng: string; // language
  ref: string; // referrer
  p: string; // path
  t: string; // title
  ua: string;
  os: string;
}

export interface ClickData {
  t: string; // target
}

export interface IdentifyData {
  userId: string;
}

export interface TrackData {
  [key: string]: string | number | boolean | null | undefined;
}

export interface TrackFlags {
  [key: string]:
    | string
    | Record<string, string | number | boolean | null | undefined | unknown>
    | number
    | boolean
    | null
    | undefined
    | unknown;
}

// Event data mapping - maps event names to their data types
export interface EventDataMap {
  page_view: PageViewData;
  click: ClickData;
  identify: IdentifyData;
}

// Known event names that have specific data types
export type KnownEventName = keyof EventDataMap;

// Helper type to get data type for an event
export type EventData<E extends string> = E extends keyof EventDataMap
  ? EventDataMap[E]
  : TrackData | undefined;

// Base payload shape
interface BasePayload {
  flags?: TrackFlags;
}

// Discriminated union payload types
export interface PageViewPayload extends BasePayload {
  e: "page_view";
  data: PageViewData;
}

export interface ClickPayload extends BasePayload {
  e: "click";
  data: ClickData;
}

export interface IdentifyPayload extends BasePayload {
  e: "identify";
  data: IdentifyData;
}

export interface GenericPayload extends BasePayload {
  e: string;
  data?: TrackData;
}

// Strict payload union for type narrowing (no generic string fallback)
export type StrictKnownPayload =
  | PageViewPayload
  | ClickPayload
  | IdentifyPayload;

// Full discriminated union including generic events
// Note: For narrowing to work correctly, use type guards or StrictKnownPayload
export type KnownPayload = StrictKnownPayload | GenericPayload;

// Type guard for page_view events
export function isPageViewPayload(
  payload: KnownPayload,
): payload is PageViewPayload {
  return payload.e === "page_view";
}

// Type guard for click events
export function isClickPayload(payload: KnownPayload): payload is ClickPayload {
  return payload.e === "click";
}

// Type guard for identify events
export function isIdentifyPayload(
  payload: KnownPayload,
): payload is IdentifyPayload {
  return payload.e === "identify";
}

// Generic payload builder type - infers correct data type based on event name
export type Payload<E extends string> = E extends "page_view"
  ? PageViewPayload
  : E extends "click"
    ? ClickPayload
    : E extends "identify"
      ? IdentifyPayload
      : GenericPayload;
