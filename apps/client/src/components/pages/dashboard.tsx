import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "types/constants.ts";
import type { PaginatedResponse } from "types/paginated-response.model.ts";
import type { Vehicle } from "types/vehicle.model.ts";
import type { VehicleData } from "types/vehicle-data.model.ts";
import type { VehicleDataFilter } from "types/vehicle-data-table-filter.model.ts";

import { VehicleDataTableFilter } from "~/components/organisms/vehicle-data-table-filter.tsx";
import { ApplicationTemplate } from "~/components/templates/application-template.tsx";

import { DataProvider } from "../../providers/data.provider.tsx";
import { Heading } from "../atoms/heading.tsx";
import { VehicleDataTable } from "../organisms/vehicle-data-table.tsx";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);

  const [firstLoadComplete, setFirstLoadComplete] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<VehicleDataFilter>({
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE,
  });

  const vehicleDataRequest = useCallback(
    () => dataProvider.getVehicleData.bind(dataProvider)(currentFilter),
    [dataProvider, currentFilter],
  );

  const { data: vehicleDataResponse, isLoading: vehicleDataLoading } = useQuery<
    PaginatedResponse<VehicleData>,
    Error,
    PaginatedResponse<VehicleData>
  >({
    queryKey: ["vehicle_data", currentFilter],
    queryFn: vehicleDataRequest,
  });

  const vehicleData = vehicleDataResponse?.items ?? [];

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery<
    Vehicle[],
    Error,
    Vehicle[]
  >({
    queryKey: ["vehicles"],
    queryFn: dataProvider.getVehicles.bind(dataProvider),
  });

  const vehicleIds = useMemo(
    () => (vehicles ? vehicles.map((v) => v.id) : []),
    [vehicles],
  );

  useEffect(() => {
    if (!vehicleDataLoading && !firstLoadComplete && !vehiclesLoading) {
      setFirstLoadComplete(true);
    }
  }, [vehicleDataLoading, firstLoadComplete]);

  const onFilter = async (newFilter: VehicleDataFilter) => {
    const updatedFilter = {
      ...newFilter,
      pageSize:
        newFilter.pageSize ?? currentFilter.pageSize ?? DEFAULT_PAGE_SIZE,
      page: newFilter.page ?? currentFilter.page ?? DEFAULT_PAGE,
    };
    setCurrentFilter(updatedFilter);
  };

  return (
    <ApplicationTemplate
      isLoading={!firstLoadComplete}
      heading={<Heading>Table of Vehicle Data</Heading>}
      filter={
        <VehicleDataTableFilter
          vehicleIds={vehicleIds}
          dateRange={{ start: DateTime.now(), end: DateTime.now() }}
          onFilter={onFilter}
          currentFilter={currentFilter}
        />
      }
      table={
        <VehicleDataTable
          data={vehicleData}
          isLoading={vehicleDataLoading}
          totalItems={vehicleDataResponse?.total ?? 0}
          currentFilter={currentFilter}
          onFilter={onFilter}
        />
      }
    />
  );
};

export { Dashboard };
