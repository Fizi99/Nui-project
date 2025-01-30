export interface Device {
    id: string;
    name: string;
    status: 'online' | 'offline';
    position: { x: number; y: number };
  }
//  { id: '1', name: 'Device 1', status: 'online', position: { x: 0, y: 0 } },

export class TrackingData{
    devices : Device[];
    constructor( devices: Device[]){
        this.devices = devices;
    }
}
