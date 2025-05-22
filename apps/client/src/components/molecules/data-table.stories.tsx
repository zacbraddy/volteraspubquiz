import type { Meta } from "@storybook/react";
import { createColumnHelper } from "@tanstack/react-table";
import type { VehicleData } from "types/vehicle-data.model";

import { DataTable } from "./data-table.tsx";

const meta = {
  title: "Molecules/DataTable",
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;

// Example vehicle data
const vehicleData: VehicleData[] = [
  {
    timestamp: "2023-05-01T08:30:00Z",
    speed: 65,
    odometer: 12_500,

    soc: 78,
    elevation: 120,
    shift_state: "D",
  },
  {
    timestamp: "2023-05-01T09:15:00Z",
    speed: 0,
    odometer: 12_530,
    soc: 76,
    elevation: 115,
    shift_state: "P",
  },
  {
    timestamp: "2023-05-01T10:45:00Z",
    speed: 85,
    odometer: 12_580,
    soc: 72,
    elevation: 150,
    shift_state: "D",
  },
  {
    timestamp: "2023-05-01T12:20:00Z",
    speed: 45,
    odometer: 12_610,
    soc: 68,
    elevation: 200,
  },
  {
    timestamp: "2023-05-01T13:00:00Z",
    odometer: 12_650,
    soc: 65,
    elevation: 180,
    shift_state: "P",
  },
];

// Column definitions
const columnHelper = createColumnHelper<VehicleData>();
const columns = [
  columnHelper.accessor("timestamp", {
    header: "Event Date and Time",
  }),
  columnHelper.accessor("speed", {
    header: "Speed (km/h)",
    cell: ({ cell }) => cell.getValue() ?? "-",
  }),
  columnHelper.accessor("odometer", {
    header: "Odometer (kms)",
  }),
  columnHelper.accessor("soc", {
    header: "State of Charge (%)",
  }),
  columnHelper.accessor("elevation", {
    header: "Elevation (m)",
  }),
  columnHelper.accessor("shift_state", {
    header: "Shift State",
    cell: ({ cell }) => cell.getValue() ?? "-",
  }),
];

export const Default = {
  args: {
    data: vehicleData,
    columns: columns,
  },
};
