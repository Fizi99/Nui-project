import { useEffect, useState } from "react";

function Accelerometer() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [z, setZ] = useState<number | null>(null);

  useEffect(() => {
    async function requestPermission() {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        "requestPermission" in DeviceMotionEvent
      ) {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("devicemotion", handleMotionEvent);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setPermissionGranted(true);
        window.addEventListener("devicemotion", handleMotionEvent);
      }
    }

    requestPermission();

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  function handleMotionEvent(event: DeviceMotionEvent) {
    if (event.accelerationIncludingGravity) {
      setX(event.accelerationIncludingGravity.x);
      setY(event.accelerationIncludingGravity.y);
      setZ(event.accelerationIncludingGravity.z);
    }
  }

  async function handlePermissionGranted() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      "requestPermission" in DeviceMotionEvent
    ) {
      try {
        const permissionState = await (DeviceMotionEvent as any).requestPermission();
        if (permissionState === "granted") {
          setPermissionGranted(true);
          window.addEventListener("devicemotion", handleMotionEvent);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      {permissionGranted ? (
        <>
          <p>X: {x}</p>
          <p>Y: {y}</p>
          <p>Z: {z}</p>
        </>
      ) : (
        <div className="modal" id="modal">
          <div className="modal-content">
            <h2>Allow access to device motion and orientation</h2>
            <p>
              This app requires access to device motion and orientation to
              function properly.
            </p>
            <button className="btn" onClick={handlePermissionGranted}>
              Grant Permission
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Accelerometer;
