// Comprehensive geo coordinates for Karnataka, Maharashtra, Rajasthan, and major Indian cities
export const CITY_COORDINATES: Record<string, { lat: number; lng: number; state: string }> = {
  // Rajasthan Hubs
  "jaipur": { lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  "jodhpur": { lat: 26.2389, lng: 73.0243, state: "Rajasthan" },
  "udaipur": { lat: 24.5854, lng: 73.7125, state: "Rajasthan" },
  "kota": { lat: 25.2138, lng: 75.8648, state: "Rajasthan" },
  "ajmer": { lat: 26.4499, lng: 74.6399, state: "Rajasthan" },
  "bikaner": { lat: 28.0229, lng: 73.3119, state: "Rajasthan" },
  "alwar": { lat: 27.5530, lng: 76.6346, state: "Rajasthan" },
  "bhilwara": { lat: 25.3407, lng: 74.6313, state: "Rajasthan" },

  // Karnataka Hubs
  "belagavi": { lat: 15.8497, lng: 74.4977, state: "Karnataka" },
  "belgaum": { lat: 15.8497, lng: 74.4977, state: "Karnataka" },
  "hubballi": { lat: 15.3647, lng: 75.1240, state: "Karnataka" },
  "hubli": { lat: 15.3647, lng: 75.1240, state: "Karnataka" },
  "dharwad": { lat: 15.4589, lng: 75.0078, state: "Karnataka" },
  "bengaluru": { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  "bangalore": { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  "mysuru": { lat: 12.2958, lng: 76.6394, state: "Karnataka" },
  "mysore": { lat: 12.2958, lng: 76.6394, state: "Karnataka" },
  "mangaluru": { lat: 12.9141, lng: 74.8560, state: "Karnataka" },
  "mangalore": { lat: 12.9141, lng: 74.8560, state: "Karnataka" },
  "kalaburagi": { lat: 17.3297, lng: 76.8343, state: "Karnataka" },
  "gulbarga": { lat: 17.3297, lng: 76.8343, state: "Karnataka" },
  "vijayapura": { lat: 16.8302, lng: 75.7100, state: "Karnataka" },
  "bijapur": { lat: 16.8302, lng: 75.7100, state: "Karnataka" },
  "bagalkot": { lat: 16.1691, lng: 75.6615, state: "Karnataka" },
  "ballari": { lat: 15.1394, lng: 76.9214, state: "Karnataka" },
  "bellary": { lat: 15.1394, lng: 76.9214, state: "Karnataka" },
  "nippani": { lat: 16.3986, lng: 74.3804, state: "Karnataka" },
  "chikodi": { lat: 16.4258, lng: 74.5977, state: "Karnataka" },
  "gokak": { lat: 16.1696, lng: 74.8236, state: "Karnataka" },
  "khanapur": { lat: 15.6366, lng: 74.5126, state: "Karnataka" },

  // Maharashtra Hubs
  "pune": { lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
  "kolhapur": { lat: 16.7050, lng: 74.2433, state: "Maharashtra" },
  "satara": { lat: 17.6805, lng: 74.0183, state: "Maharashtra" },
  "sangli": { lat: 16.8524, lng: 74.5815, state: "Maharashtra" },
  "miraj": { lat: 16.8285, lng: 74.6469, state: "Maharashtra" },
  "mumbai": { lat: 19.0760, lng: 72.8777, state: "Maharashtra" },
  "navi mumbai": { lat: 19.0330, lng: 73.0297, state: "Maharashtra" },
  "thane": { lat: 19.2183, lng: 72.9781, state: "Maharashtra" },
  "solapur": { lat: 17.6599, lng: 75.9064, state: "Maharashtra" },
  "nashik": { lat: 19.9975, lng: 73.7898, state: "Maharashtra" },
  "aurangabad": { lat: 19.8762, lng: 75.3433, state: "Maharashtra" },
  "chhatrapati sambhajinagar": { lat: 19.8762, lng: 75.3433, state: "Maharashtra" },
  "ahmednagar": { lat: 19.0952, lng: 74.7496, state: "Maharashtra" },
  "ratnagiri": { lat: 16.9902, lng: 73.3120, state: "Maharashtra" },
  "sindhudurg": { lat: 16.1158, lng: 73.7153, state: "Maharashtra" },
  "sawantwadi": { lat: 15.9056, lng: 73.8189, state: "Maharashtra" },
  "karad": { lat: 17.2889, lng: 74.1844, state: "Maharashtra" },
  "nagpur": { lat: 21.1458, lng: 79.0882, state: "Maharashtra" },
  "amravati": { lat: 20.9374, lng: 77.7796, state: "Maharashtra" },
  "nanded": { lat: 19.1383, lng: 77.3210, state: "Maharashtra" },
  "jalgaon": { lat: 21.0077, lng: 75.5626, state: "Maharashtra" },
  "latur": { lat: 18.4088, lng: 76.5604, state: "Maharashtra" },
  "dharashiv": { lat: 18.1725, lng: 76.0441, state: "Maharashtra" },
  "osmanabad": { lat: 18.1725, lng: 76.0441, state: "Maharashtra" },

  // Gujarat
  "ahmedabad": { lat: 23.0225, lng: 72.5714, state: "Gujarat" },
  "surat": { lat: 21.1702, lng: 72.8311, state: "Gujarat" },
  "vadodara": { lat: 22.3072, lng: 73.1812, state: "Gujarat" },
  "rajkot": { lat: 22.3039, lng: 70.8022, state: "Gujarat" },

  // Madhya Pradesh
  "indore": { lat: 22.7196, lng: 75.8577, state: "Madhya Pradesh" },
  "bhopal": { lat: 23.2599, lng: 77.4126, state: "Madhya Pradesh" },
  "gwalior": { lat: 26.2183, lng: 78.1828, state: "Madhya Pradesh" },

  // Delhi NCR & North
  "delhi": { lat: 28.6139, lng: 77.2090, state: "Delhi" },
  "new delhi": { lat: 28.6139, lng: 77.2090, state: "Delhi" },
  "noida": { lat: 28.5355, lng: 77.3910, state: "Uttar Pradesh" },
  "gurugram": { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  "gurgaon": { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  "ghaziabad": { lat: 28.6692, lng: 77.4538, state: "Uttar Pradesh" },
  "chandigarh": { lat: 30.7333, lng: 76.7794, state: "Chandigarh" },
  "lucknow": { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },

  // Goa
  "goa": { lat: 15.2993, lng: 74.1240, state: "Goa" },
  "panaji": { lat: 15.4909, lng: 73.8278, state: "Goa" },
  "madgaon": { lat: 15.2832, lng: 73.9862, state: "Goa" },

  // South & East Metros
  "hyderabad": { lat: 17.3850, lng: 78.4867, state: "Telangana" },
  "chennai": { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  "kolkata": { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
};

/**
 * Calculates Great-Circle Distance between two coordinates in Kilometers (Haversine Formula)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Returns geo coordinates for a given city name string (case-insensitive substring match)
 */
export function getCityCoordinates(cityName?: string | null): { lat: number; lng: number; name: string } | null {
  if (!cityName) return null;
  const normalized = cityName.toLowerCase().trim();

  // 1. Direct key match
  if (CITY_COORDINATES[normalized]) {
    return {
      lat: CITY_COORDINATES[normalized].lat,
      lng: CITY_COORDINATES[normalized].lng,
      name: normalized.charAt(0).toUpperCase() + normalized.slice(1)
    };
  }

  // 2. Substring search (e.g. "Belagavi, Karnataka" or "Jaipur City")
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return {
        lat: coords.lat,
        lng: coords.lng,
        name: key.charAt(0).toUpperCase() + key.slice(1)
      };
    }
  }

  return null;
}

/**
 * Finds the nearest city to the user's live GPS coordinates from the coordinate database
 */
export function findNearestCity(
  userLat: number,
  userLng: number
): { cityName: string; distanceKm: number; state: string } {
  let nearestCity = "Belagavi";
  let minDistance = Infinity;
  let nearestState = "Karnataka";

  for (const [cityName, data] of Object.entries(CITY_COORDINATES)) {
    const dist = calculateDistanceKm(userLat, userLng, data.lat, data.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      nearestState = data.state;
    }
  }

  return {
    cityName: nearestCity,
    distanceKm: minDistance,
    state: nearestState
  };
}

/**
 * Real-time client-side reverse geocode using OpenStreetMap Nominatim with local fallback
 */
export async function reverseGeocodeLive(
  lat: number,
  lng: number
): Promise<{ cityName: string; state: string; distanceKm: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: { "Accept-Language": "en" },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const detectedCity =
        addr.city ||
        addr.town ||
        addr.city_district ||
        addr.suburb ||
        addr.village ||
        addr.county ||
        addr.state_district;

      const detectedState = addr.state || "";

      if (detectedCity) {
        return {
          cityName: detectedCity,
          state: detectedState,
          distanceKm: 0
        };
      }
    }
  } catch (e) {
    // Network or timeout error: Fallback to local coordinate database
  }

  // Fallback to closest city in dictionary (which now includes Jaipur!)
  return findNearestCity(lat, lng);
}
