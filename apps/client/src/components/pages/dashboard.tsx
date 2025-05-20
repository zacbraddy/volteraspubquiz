import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataProvider } from "../../providers/data.provider.tsx";

const Dashboard = () => {
  const dataProvider = useMemo(() => new DataProvider(), []);

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle_data"],
    queryFn: dataProvider.getVehicleData.bind(dataProvider),
  });

  return (
    <div>
      {isLoading && "Calm down I'm still loading!"}
      {!isLoading && <div>{JSON.stringify(data, undefined, 2)}</div>}
    </div>
  );
};

export default Dashboard;
