// import { middleOfIndia } from "../constants/constants";
// import { toast } from "react-hot-toast";
// import axios from 'axios';

// export interface LocationResponse {
//   status: string;
//   country: string;
//   countryCode: string;
//   region: string;
//   regionName: string;
//   city: string;
//   zip: string;
//   lat: number;
//   lon: number;
//   timezone: string;
//   isp: string;
//   org: string;
//   as: string;
//   query: string;
// }

// export async function getLocation() {
//   try {
//     const response = await axios.get<LocationResponse>("https://api.allorigins.win/raw?url=http://ip-api.com/json", 
                                                       
// // {  headers: { "User-Agent": "Freemap-client/1.0" }}
//                                                       );

//     const json = response.data;

//     if (typeof json.lat === "number" && typeof json.lon === "number") {
//       return [json.lon, json.lat];
//     }
//   } catch (e: unknown) {
//     // Handle errors
//     if (axios.isAxiosError(e)) {
//       // Handle Axios-specific errors
//       if (e.response) {
//         // The request was made and the server responded with a status code
//         toast.error(`Error: ${e.response.status} - ${e.response.data}`);
//         console.log("Error response data: ", e.response.data);
//       } else if (e.request) {
//         // The request was made but no response was received
//         toast.error("No response received from the server.");
//         console.log("Error request: ", e.request);
//       } else {
//         // Something happened in setting up the request
//         toast.error(e.message);
//         console.log("Error in setup: ", e.message);
//       }
//     } else if (e instanceof Error) {
//       toast.error(e.message); // Show error message
//       console.log("Error in useSignup: ", e.message); // Log the error
//     } else {
//       console.error("An unknown error occurred"); // Log unknown errors
//     }
//   }
  
//   return middleOfIndia;
// }
import { middleOfIndia } from "../constants/constants";
import { toast } from "react-hot-toast";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export async function getLocation(): Promise<[number, number]> {
  try {
    // Check if the geolocation API is supported
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return middleOfIndia as [number, number];
    }

    // Get the current position
    const position: Position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Return the latitude and longitude
    return [position.coords.longitude, position.coords.latitude] as [number, number];
  } catch (error: any) {
    // Handle errors
    if (error.code === error.PERMISSION_DENIED) {
      toast.error("Permission to access location was denied.");
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      toast.error("Location information is unavailable.");
    } else if (error.code === error.TIMEOUT) {
      toast.error("The request to get user location timed out.");
    } else {
      toast.error("An unknown error occurred.");
    }

    console.error("Error getting location:", error);

    // Return the default location
    return middleOfIndia as [number, number];
  }
}
