import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ApplicationTemplate } from "./application-template";

describe("ApplicationTemplate", () => {
  it("renders loading spinner when isLoading is true", () => {
    render(<ApplicationTemplate isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.queryByText(/heading/i)).not.toBeInTheDocument();
  });

  it("renders heading when provided", () => {
    const headingText = "Test Heading";
    render(<ApplicationTemplate heading={<h1>{headingText}</h1>} />);

    expect(screen.getByText(headingText)).toBeInTheDocument();
  });

  it("renders filter when provided", () => {
    const filterText = "Test Filter";
    render(<ApplicationTemplate filter={<div>{filterText}</div>} />);

    expect(screen.getByText(filterText)).toBeInTheDocument();
  });

  it("renders table when provided", () => {
    const tableText = "Test Table";
    render(<ApplicationTemplate table={<div>{tableText}</div>} />);

    expect(screen.getByText(tableText)).toBeInTheDocument();
  });

  it("renders all sections when provided", () => {
    const headingText = "Test Heading";
    const filterText = "Test Filter";
    const tableText = "Test Table";

    render(
      <ApplicationTemplate
        heading={<h1>{headingText}</h1>}
        filter={<div>{filterText}</div>}
        table={<div>{tableText}</div>}
      />,
    );

    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByText(filterText)).toBeInTheDocument();
    expect(screen.getByText(tableText)).toBeInTheDocument();
  });

  it("renders empty container when no props are provided", () => {
    render(<ApplicationTemplate />);

    expect(screen.queryByText(/heading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/filter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/table/i)).not.toBeInTheDocument();
  });
});
