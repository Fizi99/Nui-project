interface Gyroscope extends Sensor {
    x: number | null;
    y: number | null;
    z: number | null;
}

declare var Gyroscope: {
    prototype: Gyroscope;
    new (options?: SensorOptions): Gyroscope;
};

interface Accelerometer extends Sensor {
    x: number | null;
    y: number | null;
    z: number | null;
}

declare var Accelerometer: {
    prototype: Accelerometer;
    new (options?: SensorOptions): Accelerometer;
};

interface SensorOptions {
    frequency?: number; // Frequency of sensor readings in Hz
}

interface Sensor extends EventTarget {
    start(): void;
    stop(): void;
    onreading: (() => void) | null;
    onerror: ((event: Event) => void) | null;
}

if ('Gyroscope' in window && 'Accelerometer' in window) {
    const ws = new WebSocket('ws://localhost:5173');
    const gyroscope = new Gyroscope({ frequency: 30 });
    const accelerometer = new Accelerometer({ frequency: 30 });
    
    // Function to handle incoming WebSocket messages
    ws.onmessage = (event) => {
        console.log("Message from server:", event.data);
    };
    
    // Send motion data to the server
    function sendData() {
        if (ws.readyState === WebSocket.OPEN) {
            const data = {
                timestamp: Date.now(),
                gyro: {
                    x: gyroscope.x,
                    y: gyroscope.y,
                    z: gyroscope.z,
                },
                accel: {
                    x: accelerometer.x,
                    y: accelerometer.y,
                    z: accelerometer.z,
                },
            };
            ws.send(JSON.stringify(data));
        }
    }
    
    gyroscope.addEventListener('reading', sendData);
    accelerometer.addEventListener('reading', sendData);
    
    gyroscope.start();
    accelerometer.start();
    
} else {
    console.error("Your browser does not support Gyroscope or Accelerometer APIs.");
}
