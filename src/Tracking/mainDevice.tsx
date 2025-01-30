// File: MainDevice.tsx
import React, { useEffect, useReducer } from 'react';
import { DeviceCard } from './DeviceCard';
import { Device } from './Device';

type State = { devices: Device[] };
type Action =
  | { type: 'UPDATE_DEVICE'; payload: Device }
  | { type: 'SET_DEVICES'; payload: Device[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DEVICES':
      return { ...state, devices: action.payload };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map((device) =>
          device.id === action.payload.id ? action.payload : device
        ),
      };
    default:
      return state;
  }
};

const initialState: State = { devices: [] };

export const MainDevice: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch initial device data
    const initialDevices: Device[] = [
      { id: '1', name: 'Device 1', status: 'online', position: { x: 0, y: 0, z: 0 } },
      { id: '2', name: 'Device 2', status: 'offline', position: { x: 1, y: 1, z: 0 } },
      { id: '3', name: 'Device 3', status: 'online', position: { x: 2, y: 2, z: 0 } },
      { id: '4', name: 'Device 4', status: 'online', position: { x: 3, y: 3, z: 0 } },
    ];
    dispatch({ type: 'SET_DEVICES', payload: initialDevices });

    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:5173');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedDevice: Device = {
        id: '1', 
        name: 'Device 1',
        status: 'online', 
        position: {
          x: data.gyro.x ?? 0,
          y: data.gyro.y ?? 0,
          z: data.gyro.z ?? 0,
        },
      };
      dispatch({ type: 'UPDATE_DEVICE', payload: updatedDevice });
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Main Device Dashboard</h1>
      <div>
        {state.devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};
