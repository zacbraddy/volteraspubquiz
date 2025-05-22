import axios from "axios";
import type { VehicleData } from "types/vehicle-data.model.ts";

import type { Vehicle } from "~/types/vehicle.model";

class DataProvider {
  serverPath: string;
  apiVersion: string;

  constructor() {
    this.serverPath = import.meta.env.VITE_SERVER_PATH;
    this.apiVersion = import.meta.env.VITE_API_VERSION;
  }

  async _wrapApiCall<T>(toExecute: () => Promise<T>): Promise<T> {
    try {
      return await toExecute();
    } catch (error) {
      console.error(
        "An error occurred whilst requesting data from the server",
        { error },
      );
    }

    // Cast empty array to T to ensure type compatibility
    return [] as unknown as T;
  }

  async getVehicleData(): Promise<VehicleData[]> {
    return this._wrapApiCall<VehicleData[]>(async () => {
      const result = await axios.get(`/vehicle_data/`, {
        baseURL: `${this.serverPath}/api/v${this.apiVersion}`,
      });

      return result.data;
    });
  }

  async getVehicles(): Promise<Vehicle[]> {
    return this._wrapApiCall<Vehicle[]>(async () => {
      const result = await axios.get(`vehicle_data/vehicles/`, {
        baseURL: `${this.serverPath}/api/v${this.apiVersion}`,
      });

      return result.data;
    });
  }
}

export { DataProvider };
