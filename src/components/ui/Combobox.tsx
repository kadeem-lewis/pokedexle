import type {
  ComboBoxProps as AriaComboBoxProps,
  ListBoxItemProps,
} from "react-aria-components";
import {
  ComboBox as AriaComboBox,
  Button,
  Group,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T extends object>({
  children,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox {...props}>
      <Group>
        <Input className="w-full border-b-2 border-dashed border-foreground bg-transparent py-1 pl-3" />
        <Button className="hidden">▼</Button>
      </Group>
      <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[inherit] overflow-auto rounded-md bg-primary text-base shadow-lg ring-1 ring-black/5">
        <ListBox className="max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]">
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `my-item ${isFocused ? "bg-teal-600" : ""} ${isSelected ? "bg-teal-600" : ""} border-b border-foreground capitalize`
      }
    />
  );
}
