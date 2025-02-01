import { getState, setState } from "playroomkit";
import { useGeolocated } from "react-geolocated";
import { Device } from "./Device";
import { useEffect, useState } from "react";

interface Props {
  index: number;
}

const GeoDemo = ({ index: index }: Props) => {
  const [counter, setCounter] = useState(0);

  const [filteredPos, setFilteredPos] = useState({
    lat: 0,
    long: 0,
    accuracy: 0,
  });

  const kalmanFilter = new KalmanLatLong(1);

  const { coords, timestamp, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  useEffect(() => {
    //do operation on state change
    synchronizeLocation();
    setCounter(counter + 1);
    if (coords && timestamp) {
      kalmanFilter.process(
        coords.latitude,
        coords.longitude,
        coords.accuracy,
        timestamp
      );
    }

    setFilteredPos;
  }, [coords]);

  const synchronizeLocation = () => {
    if (getState("devices")) {
      let devices: Device[] = getState("devices").devices;
      devices[index] = {
        index: index,
        location: {
          x: coords ? coords.latitude : 0,
          y: coords ? coords.longitude : 0,
        },
      };
      let deviceState = { devices: devices };
      setState("devices", deviceState, true);
    } else {
      console.log("cant get state");
    }
  };

  const startSynch = () => {
    let devices: Device[] = [];
    devices[index] = {
      index: index,
      location: {
        x: coords ? coords.latitude : 0,
        y: coords ? coords.longitude : 0,
      },
    };
    let deviceState = { devices: devices };
    setState("devices", deviceState, true);
  };

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <table>
      <tbody>
        <tr>
          <button onClick={() => startSynch()}>start synch</button>
        </tr>
        <td>updates: </td>
        <td>{counter}</td>
        <tr>
          <td>latitude</td>
          <td>{coords.latitude}</td>
          <td>filtered</td>
          <td>{filteredPos.lat}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{coords.longitude}</td>
          <td>filtered</td>
          <td>{filteredPos.long}</td>
        </tr>
        <tr>
          <td>accuracy</td>
          <td>{coords.accuracy}</td>
          <td>filtered</td>
          <td>{filteredPos.accuracy}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default GeoDemo;

class KalmanLatLong {
  private readonly MinAccuracy: number = 1;

  private Q_metres_per_second: number;
  private TimeStamp_milliseconds: number;
  private lat: number;
  private lng: number;
  private variance: number; // P matrix. Negative means object uninitialized

  constructor(Q_metres_per_second: number) {
    this.Q_metres_per_second = Q_metres_per_second;
    this.variance = -1;
    this.TimeStamp_milliseconds = 0;
    this.lat = 0;
    this.lng = 0;
  }

  public getTimeStamp(): number {
    return this.TimeStamp_milliseconds;
  }

  public getLat(): number {
    return this.lat;
  }

  public getLng(): number {
    return this.lng;
  }

  public getAccuracy(): number {
    return Math.sqrt(this.variance);
  }

  public setState(
    lat: number,
    lng: number,
    accuracy: number,
    TimeStamp_milliseconds: number
  ): void {
    this.lat = lat;
    this.lng = lng;
    this.variance = accuracy * accuracy;
    this.TimeStamp_milliseconds = TimeStamp_milliseconds;
  }

  public process(
    lat_measurement: number,
    lng_measurement: number,
    accuracy: number,
    TimeStamp_milliseconds: number
  ): void {
    if (accuracy < this.MinAccuracy) accuracy = this.MinAccuracy;

    if (this.variance < 0) {
      // If variance < 0, object is uninitialized, so initialize with current values
      this.TimeStamp_milliseconds = TimeStamp_milliseconds;
      this.lat = lat_measurement;
      this.lng = lng_measurement;
      this.variance = accuracy * accuracy;
    } else {
      // Apply Kalman filter methodology

      let TimeInc_milliseconds =
        TimeStamp_milliseconds - this.TimeStamp_milliseconds;
      if (TimeInc_milliseconds > 0) {
        // Time has moved on, so the uncertainty in the current position increases
        this.variance +=
          (TimeInc_milliseconds *
            this.Q_metres_per_second *
            this.Q_metres_per_second) /
          1000;
        this.TimeStamp_milliseconds = TimeStamp_milliseconds;
        // TO DO: Use velocity information here to get a better estimate of the current position
      }

      // Kalman gain matrix K = Covariance * Inverse(Covariance + MeasurementVariance)
      let K = this.variance / (this.variance + accuracy * accuracy);

      // Apply K
      this.lat += K * (lat_measurement - this.lat);
      this.lng += K * (lng_measurement - this.lng);

      // New covariance matrix is (IdentityMatrix - K) * Covariance
      this.variance = (1 - K) * this.variance;
    }
  }
}

// "use client";

// import { getState, setState } from "playroomkit";
// import { useEffect, useState } from "react";
// import { Device } from "./Device";

// interface Props {
//   index: number;
// }

// export default function GeoDemo({ index: index }: Props) {
//   const [userLocation, setUserLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   const [, setTime] = useState(new Date());
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//       getUserLocation();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log(position);

//           setUserLocation({ latitude, longitude });
//           if (getState("devices")) {
//             let devices: Device[] = getState("devices").devices;
//             devices[index] = {
//               index: index,
//               location: { x: latitude, y: longitude },
//             };
//             let deviceState = { devices: devices };
//             setState("devices", deviceState, true);
//             setCounter(counter + 1);
//           } else {
//             console.log("cant get state");
//           }
//         },

//         (error) => {
//           console.error("Error get user location: ", error);
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser");
//     }
//   };

//   const startTracking = () => {
//     const initialDevices: Device[] = [];
//     initialDevices[index] = {
//       index: index,
//       location: {
//         x: userLocation ? userLocation.latitude : 0,
//         y: userLocation ? userLocation.longitude : 0,
//       },
//     };
//     let deviceState = { devices: initialDevices };
//     setState("devices", deviceState, true);
//     setCounter(counter + 1);
//   };

//   return (
//     <>
//       <h1>Geolocation App</h1>
//       {/* create a button that is mapped to the function which retrieves the users location */}
//       <button onClick={startTracking}>init tracking</button>
//       {/* if the user location variable has a value, print the users location */}
//       {userLocation && (
//         <div>
//           <h2>User Location</h2>
//           <p>Latitude: {userLocation.latitude}</p>
//           <p>Longitude: {userLocation.longitude}</p>
//         </div>
//       )}
//     </>
//   );
// }
