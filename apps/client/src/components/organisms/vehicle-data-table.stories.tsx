import { useState } from "react";
import type { Meta } from "@storybook/react";
import type { VehicleData } from "types/vehicle-data.model";
import type { VehicleDataFilter } from "types/vehicle-data-table-filter.model";

import { VehicleDataTable } from "./vehicle-data-table";

const meta = {
  title: "Organisms/VehicleDataTable",
  component: VehicleDataTable,
} satisfies Meta<typeof VehicleDataTable>;

export default meta;

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

const generateLargeDataset = (count: number): VehicleData[] => {
  const result: VehicleData[] = [];
  for (let i = 0; i < count; i++) {
    const baseData = vehicleData[i % vehicleData.length];
    result.push({
      ...baseData,
      timestamp: `2023-05-${String(Math.floor(i / 5) + 1).padStart(2, "0")}T${String(8 + (i % 12)).padStart(2, "0")}:30:00Z`,
      odometer: (baseData.odometer || 12_500) + i * 10,
    });
  }
  return result;
};

export const Default = {
  args: {
    data: vehicleData,
    isLoading: false,
  },
};

export const Loading = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const WithPagination = {
  render: () => {
    const [filter, setFilter] = useState<VehicleDataFilter>({
      pageSize: 5,
      page: 1,
    });

    const largeDataset = generateLargeDataset(25);
    const totalItems = largeDataset.length;

    const currentPageData = largeDataset.slice(
      filter.page ?? 1,
      (filter.page ?? 1) + (filter.pageSize ?? 5),
    );

    const handleFilter = async (newFilter: VehicleDataFilter) => {
      setFilter(newFilter);
    };

    return (
      <VehicleDataTable
        data={currentPageData}
        isLoading={false}
        totalItems={totalItems}
        currentFilter={filter}
        onFilter={handleFilter}
      />
    );
  },
};
