import {
  useEffect,
  useState,
} from "react";
import { middleOfIndia } from "../../../constants/constants";
import {
  Popup,
  useMap,
} from "@vis.gl/react-maplibre";
import { getLocation } from "../../../api/api";

export default function YouAreHere() {
  const [
    popupLocation,
    setPopupLocation,
  ] = useState(middleOfIndia);
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    (async () => {
      const location =
        await getLocation();
      // console.log(location, "location");
      if (location !== middleOfIndia) {
        setPopupLocation(location);
        map.flyTo({
          center: location,
          zoom: 8,
        });
      }
    })();
  }, [map]);

  if (!map) return null;
  // console.log(
  //   popupLocation,
  //   "popupLocation"
  // );
  return (
    <Popup
      longitude={popupLocation[0]} // Use actual longitude
      latitude={popupLocation[1]} // Use actual latitude
      className='bg-transparent p-2 rounded shadow-lg' // Tailwind styles for the popup
    >
      <h3 className='text-sm font-semibold text-black tracking-tighter'>
        You are approximately here!
      </h3>
    </Popup>
  );
}
