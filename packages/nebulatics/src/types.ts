/** Built-in event names. */
export const enum EventName {
  page_view = "page_view",
  click = "click",
  form_submit = "form_submit",
  view = "view",
}

export type Events = keyof typeof EventName | (string & {});

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
