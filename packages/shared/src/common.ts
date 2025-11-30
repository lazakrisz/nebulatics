declare global {
  interface Window {
    /** Function to send a request to the server. */
    na?: (...params: any[]) => void;
    /**
     * Queue of parameters to be sent to the server. This is used to batch
     * requests to the server.
     */
    naq?: any[][];
  }
}

export function init() {
  if (window.na) return;

  window.na = function (...params: any[]) {
    (window.naq = window.naq || []).push(params);
  };
}
