import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { DateTime } from "luxon";

import { VehicleDataTableFilter } from "./vehicle-data-table-filter";

const vehicleIds: string[] = [
  "3d122bf6-9058-4ee7-bfb1-4ad9e84a6373",
  "436bdd0d-fc78-430f-bef4-5370ad57e512",
  "76b7d622-762d-4221-ab58-90d1c739071b",
];

const meta = {
  title: "Organisms/VehicleDataTableFilter",
  component: VehicleDataTableFilter,
  parameters: {
    docs: {
      description: {
        component:
          "A filter component for vehicle data tables that allows filtering by vehicle ID.",
      },
    },
  },
  argTypes: {
    onFilter: { action: "filter applied" },
    vehicleIds: {
      control: "object",
      description: "List of vehicle IDs to select from",
    },
    dateRange: {
      control: "object",
      description: "Date range for filtering",
    },
  },
  args: {
    vehicleIds,
    dateRange: {
      start: DateTime.now().minus({ years: 1 }),
      end: DateTime.now().plus({ years: 1 }),
    },
  },
} satisfies Meta<typeof VehicleDataTableFilter>;

export default meta;

type Story = StoryObj<typeof VehicleDataTableFilter>;

export const Default: Story = {
  args: {},
};

export const WithActions: Story = {
  args: {
    onFilter: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open vehicle ID dropdown", async () => {
      const selectTrigger = canvas.getByRole("combobox");
      await userEvent.click(selectTrigger);
    });

    await step("Select a vehicle ID", async () => {
      const option = canvas.getByText(vehicleIds[0]);
      await userEvent.click(option);
    });

    await step("Apply the filter", async () => {
      const filterButton = canvas.getByRole("button", { name: /filter/i });
      await userEvent.click(filterButton);
    });

    await step("Verify filter was applied", async () => {
      await expect(args.onFilter).toHaveBeenCalledWith({
        vehicleId: vehicleIds[0],
      });
    });
  },
};
