import { useEffect, useReducer, useState } from "react";

// Define MotionData interface
interface MotionData {
  acceleration: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  timestamp: number | null;
}

// Motion Action Type
type MotionAction =
  | { type: "UPDATE_MOTION"; payload: MotionData }
  | { type: "RESET" };

// Constants
const ACCELERATION_THRESHOLD = 0.1;
const FRICTION = 0.95;

// Motion reducer function
const motionReducer = (state: MotionData, action: MotionAction): MotionData => {
  switch (action.type) {
    case "UPDATE_MOTION":
      return action.payload;
    case "RESET":
      return {
        acceleration: { x: 0, y: 0, z: 0 },
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        timestamp: null,
      };
    default:
      return state;
  }
};

// Motion Tracker Component
const MotionTracker: React.FC = () => {
  const [motion, dispatch] = useReducer(motionReducer, {
    acceleration: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    timestamp: null,
  });

  const [isTracking, setIsTracking] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (permissionsGranted && isTracking) {
      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
  }, [permissionsGranted, isTracking]);

  // Request permissions for motion sensors (iOS specific)
  const requestPermissions = async () => {
    try {
      if ((DeviceMotionEvent as any).requestPermission) {
        const motionPermission = await (DeviceMotionEvent as any).requestPermission();
        if (motionPermission === "granted") {
          setPermissionsGranted(true);
        } else {
          setError("Permission denied. Please enable motion sensors in your settings.");
        }
      } else {
        setPermissionsGranted(true);
      }
    } catch (err) {
      setError("Error requesting permissions: " + err);
    }
  };

  // Handle motion event updates
  const handleMotion = (event: DeviceMotionEvent) => {
    if (!isTracking || !event.acceleration) return;

    const x = event.acceleration.x ?? 0;
    const y = event.acceleration.y ?? 0;
    const z = event.acceleration.z ?? 0;

    const timestamp = event.timeStamp;
    const prev = motion;

    if (!prev.timestamp) {
      dispatch({ type: "UPDATE_MOTION", payload: { ...prev, timestamp } });
      return;
    }

    const dt = (timestamp - prev.timestamp) / 1000;
    const accX = Math.abs(x) > ACCELERATION_THRESHOLD ? x : 0;
    const accY = Math.abs(y) > ACCELERATION_THRESHOLD ? y : 0;
    const accZ = Math.abs(z) > ACCELERATION_THRESHOLD ? z : 0;

    const velX = (prev.velocity.x + accX * dt) * FRICTION;
    const velY = (prev.velocity.y + accY * dt) * FRICTION;
    const velZ = (prev.velocity.z + accZ * dt) * FRICTION;

    const posX = prev.position.x + velX * dt;
    const posY = prev.position.y + velY * dt;
    const posZ = prev.position.z + velZ * dt;

    const newMotionState: MotionData = {
      acceleration: { x: accX, y: accY, z: accZ },
      velocity: { x: velX, y: velY, z: velZ },
      position: { x: posX, y: posY, z: posZ },
      timestamp,
    };

    dispatch({ type: "UPDATE_MOTION", payload: newMotionState });
  };

  // Start motion tracking
  const startTracking = () => {
    if (!permissionsGranted) {
      setError("Please grant motion permissions first");
      return;
    }
    setIsTracking(true);
    dispatch({ type: "RESET" });
  };

  // Stop motion tracking
  const stopTracking = () => {
    setIsTracking(false);
  };

  // Reset motion data
  const calibrate = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      {!permissionsGranted && (
        <button
          onClick={requestPermissions}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Request Permissions
        </button>
      )}
      <div className="mt-4">
        <button
          onClick={startTracking}
          disabled={!permissionsGranted || isTracking}
          className="bg-green-500 text-white px-4 py-2 rounded m-2"
        >
          Start Tracking
        </button>
        <button
          onClick={stopTracking}
          disabled={!isTracking}
          className="bg-red-500 text-white px-4 py-2 rounded m-2"
        >
          Stop Tracking
        </button>
        <button
          onClick={calibrate}
          disabled={!isTracking}
          className="bg-yellow-500 text-white px-4 py-2 rounded m-2"
        >
          Calibrate
        </button>
      </div>
      <div className="mt-4 p-4 border rounded">
        <h3 className="text-lg font-bold">Position Data (meters)</h3>
        <p>X: {motion.position.x.toFixed(2)}</p>
        <p>Y: {motion.position.y.toFixed(2)}</p>
        <p>Z: {motion.position.z.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MotionTracker;
