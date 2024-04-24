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
import { tv } from "tailwind-variants";

const combobox = tv({
  slots: {
    input:
      "w-full border-b-2 border-dashed border-foreground bg-transparent py-1 pl-3",
    root: "w-full max-h-inherit overflow-auto p-1 outline-none",
    popover:
      " mx-auto max-h-60 min-w-[--inherit] overflow-auto rounded-md bg-bg-panel text-base shadow-lg ring-1 ring-black/5",
    item: "relative m-1 flex cursor-default flex-col p-1 rounded-md outline-none selected:bg-teal-600 disabled:brightness-50 focus:bg-teal-600 focus:selected:bg-teal-700 border-b border-border capitalize",
  },
});
//TODO: popover width should be the same as the input. If I use full, it will be the same as the window width and inherit will be the same as the parent width. I need the same as the input width.

const { input, root, popover, item } = combobox();

interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T extends object>({
  children,
  className,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox className={root(className)} {...props}>
      <Group>
        <Input className={input()} />
        <Button className="hidden">▼</Button>
      </Group>
      <Popover placement="bottom" className={popover()}>
        <ListBox>{children}</ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} className={item()} />;
}
