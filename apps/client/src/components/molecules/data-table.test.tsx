import { createColumnHelper } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { DataTable } from "./data-table";

interface TestData {
  id: number;
  name: string;
  age: number;
  email?: string;
}

// Create test data
const testData: TestData[] = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 40 },
];

// Create column definitions using the column helper
const columnHelper = createColumnHelper<TestData>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("age", {
    header: "Age",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ cell }) => cell.getValue() ?? "-",
  }),
];

describe("DataTable", () => {
  it("renders the table with correct headers", () => {
    render(<DataTable<TestData> data={testData} columns={columns} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders the table with correct data", () => {
    render(<DataTable data={testData} columns={columns} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();

    const dashElements = screen.getAllByText("-");
    expect(dashElements.length).toBe(1);
  });

  it("renders an empty table when no data is provided", () => {
    render(<DataTable data={[]} columns={columns} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("passes additional props to the table root", () => {
    const testId = "test-data-table";
    render(
      <DataTable
        data={testData}
        columns={columns}
        data-testid={testId}
        aria-label="Test Data Table"
      />,
    );

    const table = screen.getByTestId(testId);
    expect(table).toBeInTheDocument();
    expect(table).toHaveAttribute("aria-label", "Test Data Table");
  });

  it("renders custom header and cell components", () => {
    const customColumns = [
      columnHelper.accessor("id", {
        header: () => <span data-testid="custom-header">Custom ID Header</span>,
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ cell }) => (
          <span data-testid="custom-cell">{cell.getValue()}</span>
        ),
      }),
    ];

    render(<DataTable data={testData} columns={customColumns} />);

    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
    expect(screen.getByText("Custom ID Header")).toBeInTheDocument();

    const customCells = screen.getAllByTestId("custom-cell");
    expect(customCells.length).toBe(3); // One for each row
    expect(customCells[0]).toHaveTextContent("John Doe");
    expect(customCells[1]).toHaveTextContent("Jane Smith");
    expect(customCells[2]).toHaveTextContent("Bob Johnson");
  });

  it("handles columns with no header defined", () => {
    const noHeaderColumns = [
      columnHelper.accessor("id", {}), // No header defined
      ...columns.slice(1),
    ];

    render(<DataTable data={testData} columns={noHeaderColumns} />);

    expect(screen.getByText("Name")).toBeInTheDocument(); // Second column header
  });

  it("handles empty columns array", () => {
    expect(() => {
      render(<DataTable data={testData} columns={[]} />);
    }).not.toThrow();
  });
});
