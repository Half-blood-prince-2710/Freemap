import { middleOfIndia } from "../constants/constants";
import { toast } from "react-hot-toast";
export interface LocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export async function getLocation() {
  try {
    const response = await fetch(
      "http://ip-api.com/json/"
    );
    const json =
      (await response.json()) as LocationResponse;
    if (
      typeof json.lat === "number" &&
      typeof json.lon === "number"
    ) {
      return [json.lon, json.lat];
    }
    // eslint-disable-next-line no-empty
  } catch (e: unknown) {
    // Handle errors
    if (e instanceof Error) {
      toast.error(e.message); // Show error message
      console.log(
        "Error in useSignup: ",
        e.message
      ); // Log the error
    } else {
      console.error(
        "An unknown error occurred"
      ); // Log unknown errors
    }
  } 
  return middleOfIndia;
}
