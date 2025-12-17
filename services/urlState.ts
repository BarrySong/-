import { SeatMap } from "../types";

// Encode the seat map to a base64 string for the URL
export const encodeStateToUrl = (seats: SeatMap) => {
  try {
    const jsonStr = JSON.stringify(seats);
    const b64 = btoa(encodeURIComponent(jsonStr));
    window.location.hash = b64;
    return window.location.href;
  } catch (e) {
    console.error("Failed to encode state", e);
    return window.location.href;
  }
};

// Decode the seat map from the URL hash
export const decodeStateFromUrl = (): SeatMap | null => {
  try {
    const hash = window.location.hash.slice(1); // remove #
    if (!hash) return null;
    const jsonStr = decodeURIComponent(atob(hash));
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to decode state", e);
    return null;
  }
};