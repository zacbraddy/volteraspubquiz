import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { createListCollection } from "@ark-ui/react/collection";

import * as BaseSelect from "./styled/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<
    React.ComponentProps<typeof BaseSelect.Root>,
    "collection" | "onValueChange" | "onChange"
  > {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
}

const Select = (props: SelectProps) => {
  const {
    options,
    label,
    placeholder,
    onChange = (_: string): void => {
      /* noop */
    },
  } = props;

  const collection = createListCollection<SelectOption>({
    items: options,
  });

  return (
    <BaseSelect.Root
      positioning={{ sameWidth: true }}
      width="2xs"
      collection={collection}
      onValueChange={(details) =>
        onChange(details.value.length > 0 ? details.value[0] : "")
      }
    >
      {label && <BaseSelect.Label>{label}</BaseSelect.Label>}
      <BaseSelect.Control>
        <BaseSelect.Trigger>
          <BaseSelect.ValueText placeholder={placeholder} />
          <LuChevronsUpDown />
        </BaseSelect.Trigger>
      </BaseSelect.Control>
      <BaseSelect.Positioner>
        <BaseSelect.Content>
          {collection.items.map((item: SelectOption) => (
            <BaseSelect.Item key={item.value} item={item}>
              <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
              <BaseSelect.ItemIndicator>
                <LuCheck />
              </BaseSelect.ItemIndicator>
            </BaseSelect.Item>
          ))}
        </BaseSelect.Content>
      </BaseSelect.Positioner>
    </BaseSelect.Root>
  );
};

export { Select };
