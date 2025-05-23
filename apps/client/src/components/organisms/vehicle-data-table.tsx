import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "types/constants";
import type { VehicleData } from "types/vehicle-data.model";
import type { VehicleDataFilter } from "types/vehicle-data-table-filter.model";

import { Pagination } from "~/components/atoms/pagination";
import { Spinner } from "~/components/atoms/spinner";

import { DataTable } from "../molecules/data-table";

interface VehicleDataProps {
  data: VehicleData[];
  isLoading: boolean;
  totalItems?: number;
  currentFilter?: VehicleDataFilter;
  onFilter?: (newFilter: VehicleDataFilter) => Promise<void>;
  [key: string]: any;
}

const VehicleDataTable = (props: VehicleDataProps) => {
  const {
    data,
    isLoading,
    totalItems = 0,
    currentFilter = { pageSize: DEFAULT_PAGE_SIZE, page: DEFAULT_PAGE },
    onFilter = async () => {
      /* noop */
    },
    ...rest
  } = props;

  const columnHelper = createColumnHelper<VehicleData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("timestamp", {
        header: "Event Date and Time",
        cell: ({ cell }) =>
          DateTime.fromISO(cell.getValue()).toFormat("dd/MM/yyyy HH:mm:ss"),
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

  const handlePaginationChange = async (page: number) => {
    await onFilter({
      ...currentFilter,
      page: page,
    });
  };

  return (
    <div>
      <DataTable<VehicleData> data={data} columns={columns} {...rest} />
      {totalItems > (currentFilter.pageSize ?? Infinity) && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Pagination
            count={totalItems}
            page={currentFilter.page ?? DEFAULT_PAGE}
            pageSize={currentFilter.pageSize ?? DEFAULT_PAGE_SIZE}
            onPageChange={(page) => void handlePaginationChange(page.page)}
          />
        </div>
      )}
    </div>
  );
};

export { VehicleDataTable };
