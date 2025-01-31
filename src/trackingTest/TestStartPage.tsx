import { useState, useEffect } from "react";

interface MotionData {
  acceleration: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  timestamp: number | null;
  interval: number;
}

const ACCELERATION_THRESHOLD = 0.1;
//const FRICTION = 0.95;
//const FRICTION = 0.95;

const MotionTracker: React.FC = () => {
  const [motion, setMotion] = useState<MotionData>({
    acceleration: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    timestamp: null,
    interval: 0,
  });
  const [isTracking, setIsTracking] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (permissionsGranted) {
      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
  }, [permissionsGranted, isTracking]);

  const requestPermissions = async () => {
    try {
      if ((DeviceMotionEvent as any).requestPermission) {
        const motionPermission = await (
          DeviceMotionEvent as any
        ).requestPermission();
        if (motionPermission === "granted") {
          setPermissionsGranted(true);
        } else {
          setError(
            "Permission denied. Please enable motion sensors in your settings."
          );
        }
      } else {
        setPermissionsGranted(true);
      }
    } catch (err) {
      setError("Error requesting permissions: " + err);
    }
  };

  const handleMotion = (event: DeviceMotionEvent) => {
    if (!isTracking || !event.acceleration) return;

    const { x = 0, y = 0, z = 0 } = event.acceleration;
    const timestamp = event.timeStamp;
    const interval = event.interval;

    setMotion((prev: any) => {
      if (!prev.timestamp) {
        return { ...prev, timestamp };
      }

      const dt = (timestamp - prev.timestamp) / 1000;
      const accXTemp = x as number;
      const accYTemp = y as number;
      const accZTemp = z as number;
      const accX =
        Math.abs(x as number) > ACCELERATION_THRESHOLD ? accXTemp : 0;
      const accY =
        Math.abs(y as number) > ACCELERATION_THRESHOLD ? accYTemp : 0;
      const accZ =
        Math.abs(z as number) > ACCELERATION_THRESHOLD ? accZTemp : 0;

      if (Math.abs(accX) > 0 || Math.abs(accY) > 0 || Math.abs(accZ) > 0) {
        const velX = prev.velocity.x + (accXTemp as number) * dt;
        const velY = prev.velocity.y + (accYTemp as number) * dt;
        const velZ = prev.velocity.z + (accZTemp as number) * dt;

        const posX = prev.position.x + velX * dt;
        const posY = prev.position.y + velY * dt;
        const posZ = prev.position.z + velZ * dt;

        // const posX =
        //   prev.position.x + prev.velocity.x * dt + (1 / 2) * accXTemp * dt * dt;
        // const posY =
        //   prev.position.y + prev.velocity.y * dt + (1 / 2) * accYTemp * dt * dt;
        // const posZ =
        //   prev.position.z + prev.velocity.z * dt + (1 / 2) * accZTemp * dt * dt;

        return {
          acceleration: { x: accX, y: accY, z: accZ },
          velocity: { x: velX, y: velY, z: velZ },
          position: { x: posX, y: posY, z: posZ },
          timestamp,
          interval,
        };
      }

      return {
        acceleration: { x: accX, y: accY, z: accZ },
        velocity: {
          x: prev.velocity.x,
          y: prev.velocity.y,
          z: prev.velocity.z,
        },
        position: {
          x: prev.position.x,
          y: prev.position.y,
          z: prev.position.z,
        },
        timestamp,
        interval,
      };
    });
  };

  const startTracking = () => {
    if (!permissionsGranted) {
      setError("Please grant motion permissions first");
      return;
    }
    setIsTracking(true);
    calibrate();
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const calibrate = () => {
    setMotion({
      acceleration: { x: 0, y: 0, z: 0 },
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      timestamp: null,
      interval: 0,
    });
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
        <h3 className="text-lg font-bold">timestamp + interval</h3>
        <p>timestamp: {motion.timestamp ? motion.timestamp.toFixed(4) : 0}</p>
        <p>interval: {motion.interval.toFixed(4)}</p>
      </div>

      <div className="mt-4 p-4 border rounded">
        <h3 className="text-lg font-bold">Position Data (meters)</h3>
        <p>X: {motion.position.x.toFixed(4)}</p>
        <p>Y: {motion.position.y.toFixed(4)}</p>
        <p>Z: {motion.position.z.toFixed(4)}</p>
      </div>
      <div className="mt-4 p-4 border rounded">
        <h3 className="text-lg font-bold">acceleration Data (meters)</h3>
        <p>X: {motion.acceleration.x.toFixed(4)}</p>
        <p>Y: {motion.acceleration.y.toFixed(4)}</p>
        <p>Z: {motion.acceleration.z.toFixed(4)}</p>
      </div>
      <div className="mt-4 p-4 border rounded">
        <h3 className="text-lg font-bold">velocity Data (meters)</h3>
        <p>X: {motion.velocity.x.toFixed(4)}</p>
        <p>Y: {motion.velocity.y.toFixed(4)}</p>
        <p>Z: {motion.velocity.z.toFixed(4)}</p>
      </div>
    </div>
  );
};

export default MotionTracker;
