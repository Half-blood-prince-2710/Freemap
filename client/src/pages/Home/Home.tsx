import { Map } from "@vis.gl/react-maplibre";
import { middleOfIndia } from "../../constants/constants";
import Header from "./components/Header";
import "maplibre-gl/dist/maplibre-gl.css";
import YouAreHere from "./components/YouAreHere";
function Home() {
 
  return (
    <div className='h-screen w-full flex flex-col'>
      <Header/>
      {/* Full height and width */}
      <Map
        initialViewState={{
          longitude: middleOfIndia[0],
          latitude: middleOfIndia[1],
          zoom: 2,
        }}
        // onLoad={handleLoad}
        mapStyle='https://tiles.openfreemap.org/styles/liberty'>
        <YouAreHere/>
        </Map>

      
    </div>
  );
}

export default Home;
