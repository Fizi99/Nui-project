// import { useGeolocated } from "react-geolocated";

// const GeoDemo = () => {
//   const { coords, isGeolocationAvailable, isGeolocationEnabled } =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       userDecisionTimeout: 5000,
//     });

//   return !isGeolocationAvailable ? (
//     <div>Your browser does not support Geolocation</div>
//   ) : !isGeolocationEnabled ? (
//     <div>Geolocation is not enabled</div>
//   ) : coords ? (
//     <table>
//       <tbody>
//         <tr>
//           <td>latitude</td>
//           <td>{coords.latitude}</td>
//         </tr>
//         <tr>
//           <td>longitude</td>
//           <td>{coords.longitude}</td>
//         </tr>
//         <tr>
//           <td>altitude</td>
//           <td>{coords.altitude}</td>
//         </tr>
//         <tr>
//           <td>heading</td>
//           <td>{coords.heading}</td>
//         </tr>
//         <tr>
//           <td>speed</td>
//           <td>{coords.speed}</td>
//         </tr>
//       </tbody>
//     </table>
//   ) : (
//     <div>Getting the location data&hellip; </div>
//   );
// };

// export default GeoDemo;

"use client";

import { getState, setState } from "playroomkit";
import { useEffect, useState } from "react";
import { Device } from "./Device";

interface Props {
  index: number;
}

export default function GeoDemo({ index: index }: Props) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [, setTime] = useState(new Date());
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      getUserLocation();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);

          setUserLocation({ latitude, longitude });
          if (getState("devices")) {
            let devices: Device[] = getState("devices").devices;
            devices[index] = {
              index: index,
              location: { x: latitude, y: longitude },
            };
            let deviceState = { devices: devices };
            setState("devices", deviceState, true);
            setCounter(counter + 1);
          } else {
            console.log("cant get state");
          }
        },

        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  const startTracking = () => {
    const initialDevices: Device[] = [];
    initialDevices[index] = {
      index: index,
      location: {
        x: userLocation ? userLocation.latitude : 0,
        y: userLocation ? userLocation.longitude : 0,
      },
    };
    let deviceState = { devices: initialDevices };
    setState("devices", deviceState, true);
    setCounter(counter + 1);
  };

  return (
    <>
      <h1>Geolocation App</h1>
      {/* create a button that is mapped to the function which retrieves the users location */}
      <button onClick={startTracking}>init tracking</button>
      {/* if the user location variable has a value, print the users location */}
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
    </>
  );
}
