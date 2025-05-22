import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { VehicleData } from "types/vehicle-data.model.ts";

import { Spinner } from "~/components/atoms/spinner.tsx";

import { DataTable } from "../molecules/data-table.tsx";

interface VehicleDataProps {
  data: VehicleData[];
  isLoading: boolean;
  [key: string]: any;
}

const VehicleDataTable = (props: VehicleDataProps) => {
  const { data, isLoading, ...rest } = props;

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

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return <DataTable<VehicleData> data={data} columns={columns} {...rest} />;
};

export { VehicleDataTable };
