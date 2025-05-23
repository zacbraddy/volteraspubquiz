import axios from "axios";
import type { PaginatedResponse } from "types/paginated-response.model.ts";
import type { VehicleData } from "types/vehicle-data.model.ts";
import type { VehicleDataFilter } from "types/vehicle-data-table-filter.model.ts";

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

    return [] as unknown as T;
  }

  async getVehicleData(
    filter: VehicleDataFilter,
  ): Promise<PaginatedResponse<VehicleData>> {
    return this._wrapApiCall<PaginatedResponse<VehicleData>>(async () => {
      const params = new URLSearchParams();
      if (filter.vehicleId) {
        params.append("vehicle_id", filter.vehicleId);
      }
      if (filter.pageSize !== undefined) {
        params.append("page_size", filter.pageSize.toString());
      }
      if (filter.page !== undefined) {
        params.append("page", filter.page.toString());
      }

      const queryString = params.toString();

      const result = await axios.get(
        `/vehicle_data/${queryString ? `?${queryString}` : ""}`,
        {
          baseURL: `${this.serverPath}/api/v${this.apiVersion}`,
        },
      );

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
