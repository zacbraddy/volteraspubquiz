import type { DateTime } from "luxon";

import type { VehicleDataFilter } from "~/types/vehicle-data-table-filter.model.ts";

import { Button } from "../atoms/button.tsx";
import { Select } from "../atoms/select";

interface VehicleDataTableFilterProps {
  vehicleIds: string[];
  dateRange: {
    start: DateTime;
    end: DateTime;
  };
  onFilter?: (newFilter: VehicleDataFilter) => Promise<void>;
  [key: string]: any;
}

const VehicleDataTableFilter = (props: VehicleDataTableFilterProps) => {
  const {
    vehicleIds,
    dateRange,
    onFilter = () => {
      /* noop */
    },
    ...rest
  } = props;

  const [currentFilter, setCurrentFilter] = useState<VehicleDataFilter>({});

  const vehicleIdOptions =
    vehicleIds?.map((id) => ({
      value: id,
      label: id,
    })) || [];

  const handleOnFilterChange = (
    prop: keyof VehicleDataFilter,
    value: string,
  ) => {
    setCurrentFilter({
      ...currentFilter,
      [prop]: value,
    });
  };

  const handleOnFilterSubmit = async () => {
    await onFilter(currentFilter);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", gap: "1rem" }}
      {...rest}
    >
      <Select
        options={vehicleIdOptions}
        placeholder="vehicle_id"
        value={[currentFilter.vehicleId ?? ""]}
        onChange={(item) => handleOnFilterChange("vehicleId", item)}
      />
      <Button onClick={() => void handleOnFilterSubmit()}>Filter</Button>
    </div>
  );
};

export { VehicleDataTableFilter };
