import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { VehicleDataTableFilter } from "~/components/organisms/vehicle-data-table-filter.tsx";
import { ApplicationTemplate } from "~/components/templates/application-template.tsx";

import { DataProvider } from "../../providers/data.provider.tsx";
import { Heading } from "../atoms/heading.tsx";
import { VehicleDataTable } from "../organisms/vehicle-data-table.tsx";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle_data"],
    queryFn: dataProvider.getVehicleData.bind(dataProvider),
  });

  const onFilter = async () => {
    await queryClient.invalidateQueries({ queryKey: ["vehicle_data"] });
  };

  return (
    <ApplicationTemplate
      isLoading={isLoading}
      heading={<Heading>Table of Vehicle Data</Heading>}
      filter={
        <VehicleDataTableFilter
          vehicleIds={["1", "2", "3"]}
          dateRange={{ start: DateTime.now(), end: DateTime.now() }}
          onFilter={onFilter}
        />
      }
      table={<VehicleDataTable data={data} />}
    />
  );
};

export { Dashboard };
