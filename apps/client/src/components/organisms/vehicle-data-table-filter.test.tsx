import { fireEvent, render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import { vi } from "vitest";

import "@testing-library/jest-dom";

import { VehicleDataTableFilter } from "./vehicle-data-table-filter";

const sampleVehicleIds = [
  "3d122bf6-9058-4ee7-bfb1-4ad9e84a6373",
  "436bdd0d-fc78-430f-bef4-5370ad57e512",
  "76b7d622-762d-4221-ab58-90d1c739071b",
];

const sampleDateRange = {
  start: DateTime.now().minus({ years: 1 }),
  end: DateTime.now(),
};

describe("VehicleDataTableFilter", () => {
  it("renders the filter with vehicle ID select and filter button", () => {
    render(
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={sampleDateRange}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
  });

  it("displays the placeholder text in the select", () => {
    render(
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={sampleDateRange}
      />,
    );

    const placeholderElement = screen.getByText("vehicle_id");
    expect(placeholderElement).toBeInTheDocument();
  });

  it("calls onFilter with the selected vehicle ID when filter button is clicked", () => {
    const mockOnFilter = vi.fn();
    const initialFilter = { vehicleId: sampleVehicleIds[0] };

    render(
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={sampleDateRange}
        currentFilter={initialFilter}
        onFilter={mockOnFilter}
      />,
    );

    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton);

    expect(mockOnFilter).toHaveBeenCalledWith(initialFilter);
  });

  it("handles empty vehicle IDs gracefully", () => {
    render(
      <VehicleDataTableFilter vehicleIds={[]} dateRange={sampleDateRange} />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
  });

  it("passes additional props to the container", () => {
    const testId = "test-filter";
    render(
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={sampleDateRange}
        data-testid={testId}
      />,
    );

    const container = screen.getByTestId(testId);
    expect(container).toBeInTheDocument();
  });
});
