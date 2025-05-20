import axios from "axios";

class DataProvider {
  serverPath: string;
  apiVersion: string;

  constructor() {
    this.serverPath = import.meta.env.VITE_SERVER_PATH;
    this.apiVersion = import.meta.env.VITE_API_VERSION;
  }

  async getVehicleData() {
    try {
      const result = await axios.get(`/vehicle_data/`, {
        baseURL: `${this.serverPath}/api/v${this.apiVersion}`,
      });

      return result.data;
    } catch (error) {
      console.error(
        "An error occurred whilst requesting data from the server",
        { error },
      );
    }
  }
}

export { DataProvider };
