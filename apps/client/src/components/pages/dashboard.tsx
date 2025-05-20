import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataProvider } from "../../providers/data.provider.tsx";
import type { VehicleData } from "../../types/vehicle-data.model.ts";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle_data"],
    queryFn: dataProvider.getVehicleData.bind(dataProvider),
  });

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
      columnHelper.accessor("shift_state", { header: "Shift State" }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {isLoading && "Calm down I'm still loading!"}
      {!isLoading && (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? undefined
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
