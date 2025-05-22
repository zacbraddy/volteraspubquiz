import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { VehicleData } from "types/vehicle-data.model.ts";

import { DataTable } from "../molecules/data-table.tsx";

interface VehicleDataProps {
  data: VehicleData[];
  [key: string]: any;
}

const VehicleDataTable = (props: VehicleDataProps) => {
  const { data, ...rest } = props;

  const columnHelper = createColumnHelper<VehicleData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("timestamp", {
        header: "Event Date and Time",
      }),
      columnHelper.accessor("speed", {
        header: "Speed (km/h)",
        cell: ({ cell }) => cell.getValue() ?? "-",
      }),
      columnHelper.accessor("odometer", { header: "Odometer (kms)" }),
      columnHelper.accessor("soc", { header: "State of Charge (%)" }),
      columnHelper.accessor("elevation", { header: "Elevation (m)" }),
      columnHelper.accessor("shift_state", {
        header: "Shift State",
        cell: ({ cell }) => cell.getValue() ?? "-",
      }),
    ],
    [],
  );

  return <DataTable<VehicleData> data={data} columns={columns} {...rest} />;
};

export { VehicleDataTable };
