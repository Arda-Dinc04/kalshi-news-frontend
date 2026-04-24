import { Platform } from "react-native";

const RENDER_ORIGIN = "https://kalshi-streaming-34b2.onrender.com";

/**
 * Browser requests from Vercel hit CORS on Render. Vercel rewrites `/kalshi-api/*`
 * to the backend `/api/*` so fetches stay same-origin on web deploys.
 * Local web dev uses the Render URL directly (backend must allow localhost if needed).
 */
function apiBase() {
  if (
    Platform.OS === "web" &&
    typeof window !== "undefined" &&
    window.location?.hostname
  ) {
    const { hostname, origin } = window.location;
    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]";
    if (!isLocal) {
      return `${origin}/kalshi-api`;
    }
  }
  return `${RENDER_ORIGIN}/api`;
}

// Get all events
export async function getEvents() {
  try {
    const response = await fetch(`${apiBase()}/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      throw new Error('CORS error: Backend needs to allow requests from this origin. Check backend CORS configuration.');
    }
    throw error;
  }
}

// Get events by category
export async function getEventsByCategory(category) {
  const response = await fetch(
    `${apiBase()}/events/category/${encodeURIComponent(category)}`,
  );
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

// Get specific event
export async function getEventById(eventTicker) {
  const res = await fetch(
    `${apiBase()}/events/${encodeURIComponent(eventTicker)}`,
  );
  if (!res.ok) throw new Error('Failed to fetch event');
  const data = await res.json(); // { event: {...} }
  return data.event; // return the event object
}

// Get all news
export async function getNews() {
  const response = await fetch(`${apiBase()}/news`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Get news for specific event
export async function getNewsByEvent(eventId) {
  const response = await fetch(
    `${apiBase()}/news/event/${encodeURIComponent(eventId)}`,
  );
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

