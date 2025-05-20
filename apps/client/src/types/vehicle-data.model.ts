export interface VehicleData {
  timestamp: string;
  speed?: number;
  odometer: number;
  soc: number;
  elevation: number;
  shift_state?: string;
}
