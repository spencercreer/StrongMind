import React from "react";
import { useGetToppings } from "../../../api/queries";
import MultiSelectDropdown, {
  MultiSelectOption,
} from "../../../componentLibrary/MultiSelectDropdown";

export default function ToppingSelect({
  value,
  onChange,
}: {
  value: MultiSelectOption[];
  onChange: (value: MultiSelectOption[]) => void;
}) {
  const { data: toppings, isError, isLoading } = useGetToppings();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !toppings) return <div>Error</div>;

  return (
    <MultiSelectDropdown
      label="Toppings"
      placeholder="Select Toppings..."
      options={toppings.map((topping) => ({
        value: topping._id!,
        label: topping.name,
      }))}
      value={value}
      onChange={onChange}
    />
  );
}
