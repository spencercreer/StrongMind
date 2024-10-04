import { useGetToppings } from "../../../api/queries";
import MultiSelectDropdown, {
  MultiSelectOption,
} from "../../../componentLibrary/MultiSelectDropdown";
import Spinner from "../../../componentLibrary/Spinner";

export default function ToppingSelect({
  value,
  onChange,
}: {
  value: MultiSelectOption[];
  onChange: (value: MultiSelectOption[]) => void;
}) {
  const { data: toppings, isError, isLoading } = useGetToppings();

  if (isLoading) return <Spinner />;
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
