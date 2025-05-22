import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";

import { Heading } from "~/components/atoms/heading.tsx";

import { VehicleDataTable } from "../organisms/vehicle-data-table.tsx";
import { VehicleDataTableFilter } from "../organisms/vehicle-data-table-filter.tsx";

import { ApplicationTemplate } from "./application-template.tsx";

const meta = {
  title: "Templates/ApplicationTemplate",
  component: ApplicationTemplate,
  parameters: {
    docs: {
      description: {
        component:
          "Application template component following atomic design principles. Provides slots for heading, filter, and table components.",
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description:
        "The heading content to be displayed at the top of the template",
    },
    filter: {
      control: { disable: true },
      description: "The filter component to be displayed below the heading",
    },
    table: {
      control: { disable: true },
      description: "The table component to be displayed below the filter",
    },
  },
} satisfies Meta<typeof ApplicationTemplate>;

export default meta;

type Story = StoryObj<typeof ApplicationTemplate>;

const sampleVehicleIds = [
  "3d122bf6-9058-4ee7-bfb1-4ad9e84a6373",
  "436bdd0d-fc78-430f-bef4-5370ad57e512",
  "76b7d622-762d-4221-ab58-90d1c739071b",
];

const sampleVehicleData = [
  {
    id: "1",
    timestamp: "2023-01-01T12:00:00Z",
    speed: 60,
    odometer: 12_345,
    soc: 80,
    elevation: 100,
    shift_state: "D",
  },
  {
    id: "2",
    timestamp: "2023-01-01T12:05:00Z",
    speed: 65,
    odometer: 12_350,
    soc: 79,
    elevation: 105,
    shift_state: "D",
  },
];

export const Default: Story = {
  args: {
    heading: <Heading>Vehicle Data Dashboard</Heading>,
  },
};

export const WithFilter: Story = {
  args: {
    heading: <Heading>Vehicle Data Dashboard</Heading>,
    filter: (
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={{
          start: DateTime.now().minus({ years: 1 }),
          end: DateTime.now(),
        }}
      />
    ),
  },
};

export const WithFilterAndTable: Story = {
  render: () => {
    const [_, setFilter] = useState({});

    return (
      <ApplicationTemplate
        heading={<Heading as="h1">Vehicle Data Dashboard</Heading>}
        filter={
          <VehicleDataTableFilter
            vehicleIds={sampleVehicleIds}
            dateRange={{
              start: DateTime.now().minus({ years: 1 }),
              end: DateTime.now(),
            }}
            onFilter={async (...args) => setFilter(args)}
          />
        }
        table={<VehicleDataTable data={sampleVehicleData} />}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    heading: <Heading as="h1">Vehicle Data Dashboard</Heading>,
    filter: (
      <VehicleDataTableFilter
        vehicleIds={sampleVehicleIds}
        dateRange={{
          start: DateTime.now().minus({ years: 1 }),
          end: DateTime.now(),
        }}
      />
    ),
    table: <VehicleDataTable data={sampleVehicleData} />,
    isLoading: true,
  },
};
