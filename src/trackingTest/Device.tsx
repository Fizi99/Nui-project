export interface Location {
  x: number;
  y: number;
}

export interface Device {
  location: Location;
  index: number;
}

export interface DeviceState {
  devices: Device[];
}
