import type {
  ComboBoxProps,
  ListBoxItemProps,
  ValidationResult,
} from "react-aria-components";
import {
  Button,
  ComboBox as AriaComboBox,
  FieldError,
  Header,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Section,
  Text,
} from "react-aria-components";

interface MyComboBoxProps<T extends object>
  extends Omit<ComboBoxProps<T>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  ...props
}: MyComboBoxProps<T>) {
  return (
    <AriaComboBox {...props}>
      <Label>{label}</Label>
      <div className="my-combobox-container">
        <Input />
        <Button>▼</Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox>{children}</ListBox>
      </Popover>
    </AriaComboBox>
  );
}

function MyItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `my-item ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}
