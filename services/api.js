const API_URL = 'https://kalshi-streaming-34b2.onrender.com';

// Get all events
export async function getEvents() {
  try {
    const response = await fetch(`${API_URL}/api/events`);
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
  const response = await fetch(`${API_URL}/api/events/category/${category}`);
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

// Get specific event
export async function getEventById(eventTicker) {
  const res = await fetch(`${API_URL}/api/events/${eventTicker}`);
  if (!res.ok) throw new Error('Failed to fetch event');
  const data = await res.json(); // { event: {...} }
  return data.event; // return the event object
}

// Get all news
export async function getNews() {
  const response = await fetch(`${API_URL}/api/news`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Get news for specific event
export async function getNewsByEvent(eventId) {
  const response = await fetch(`${API_URL}/api/news/event/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

