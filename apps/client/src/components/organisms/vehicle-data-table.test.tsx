import { render, screen } from "@testing-library/react";
import type { VehicleData } from "types/vehicle-data.model";

import "@testing-library/jest-dom";

import { VehicleDataTable } from "./vehicle-data-table";

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
    // Missing shift_state
  },
  {
    timestamp: "2023-05-01T13:00:00Z",
    // Missing speed
    odometer: 12_650,
    soc: 65,
    elevation: 180,
    shift_state: "P",
  },
];

describe("VehicleDataTable", () => {
  it("renders the table with correct headers", () => {
    render(<VehicleDataTable data={vehicleData} />);

    expect(screen.getByText("Event Date and Time")).toBeInTheDocument();
    expect(screen.getByText("Speed (km/h)")).toBeInTheDocument();
    expect(screen.getByText("Odometer (kms)")).toBeInTheDocument();
    expect(screen.getByText("State of Charge (%)")).toBeInTheDocument();
    expect(screen.getByText("Elevation (m)")).toBeInTheDocument();
    expect(screen.getByText("Shift State")).toBeInTheDocument();
  });

  it("renders the table with correct data", () => {
    const { container } = render(<VehicleDataTable data={vehicleData} />);

    expect(container.textContent).toContain("2023-05-01T08:30:00Z");
    expect(container.textContent).toContain("65");
    expect(container.textContent).toContain("12500");
    expect(container.textContent).toContain("78");
    expect(container.textContent).toContain("120");
    expect(container.textContent).toContain("D");

    expect(container.textContent).toContain("2023-05-01T09:15:00Z");
    expect(container.textContent).toContain("0");
    expect(container.textContent).toContain("P");
  });

  it("renders dash for missing values", () => {
    render(<VehicleDataTable data={vehicleData} />);

    const dashElements = screen.getAllByText("-");
    expect(dashElements.length).toBe(2);
  });

  it("renders an empty table when no data is provided", () => {
    render(<VehicleDataTable data={[]} />);

    expect(screen.getByText("Event Date and Time")).toBeInTheDocument();
    expect(screen.getByText("Speed (km/h)")).toBeInTheDocument();
    expect(screen.getByText("Odometer (kms)")).toBeInTheDocument();
    expect(screen.getByText("State of Charge (%)")).toBeInTheDocument();
    expect(screen.getByText("Elevation (m)")).toBeInTheDocument();
    expect(screen.getByText("Shift State")).toBeInTheDocument();

    expect(screen.queryByText("2023-05-01T08:30:00Z")).not.toBeInTheDocument();
  });

  it("passes additional props to the table", () => {
    const testId = "test-vehicle-data-table";
    render(
      <VehicleDataTable
        data={vehicleData}
        data-testid={testId}
        aria-label="Vehicle Data Table"
      />,
    );

    const table = screen.getByTestId(testId);
    expect(table).toBeInTheDocument();
    expect(table).toHaveAttribute("aria-label", "Vehicle Data Table");
  });
});
