/** Built-in event names. */
export const enum EventName {
  PAGE_VIEW = "page_view",
  CLICK = "click",
  FORM_SUBMIT = "form_submit",
  VIEW = "view",
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
