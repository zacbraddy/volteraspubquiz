import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataProvider } from "../../providers/data.provider.tsx";
import { VehicleDataTable } from "../organisms/vehicle-data-table.tsx";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle_data"],
    queryFn: dataProvider.getVehicleData.bind(dataProvider),
  });

  return (
    <div>
      {isLoading && "Calm down I'm still loading!"}
      {!isLoading && <VehicleDataTable data={data} />}
    </div>
  );
};

export { Dashboard };
