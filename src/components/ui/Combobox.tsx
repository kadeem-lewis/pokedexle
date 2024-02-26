import type {
  ComboBoxProps as AriaComboBoxProps,
  ListBoxItemProps,
} from "react-aria-components";
import {
  ComboBox as AriaComboBox,
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
  items,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox {...props}>
      <div>
        <Input className="w-full border-b-2 border-dashed border-foreground bg-transparent py-1 pl-3" />
      </div>
      <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-primary text-base shadow-lg ring-1 ring-black/5">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
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
        `my-item ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}
