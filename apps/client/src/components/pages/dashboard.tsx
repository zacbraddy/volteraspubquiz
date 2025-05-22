import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import type { Vehicle } from "types/vehicle.model.ts";
import type { VehicleData } from "types/vehicle-data.model.ts";

import { VehicleDataTableFilter } from "~/components/organisms/vehicle-data-table-filter.tsx";
import { ApplicationTemplate } from "~/components/templates/application-template.tsx";

import { DataProvider } from "../../providers/data.provider.tsx";
import { Heading } from "../atoms/heading.tsx";
import { VehicleDataTable } from "../organisms/vehicle-data-table.tsx";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);
  const queryClient = useQueryClient();

  const [firstLoadComplete, setFirstLoadComplete] = useState(false);

  const { data: vehicleData, isLoading: vehicleDataLoading } = useQuery<
    VehicleData[],
    Error,
    VehicleData[]
  >({
    queryKey: ["vehicle_data"],
    queryFn: dataProvider.getVehicleData.bind(dataProvider),
  });

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

  const onFilter = async () => {
    await queryClient.invalidateQueries({ queryKey: ["vehicle_data"] });
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
        />
      }
      table={
        <VehicleDataTable
          data={vehicleData ?? []}
          isLoading={vehicleDataLoading}
        />
      }
    />
  );
};

export { Dashboard };
