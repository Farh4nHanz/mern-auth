import PropTypes from "prop-types";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// helpers
import { capitalizeLetter } from "@/lib/helpers";

export const FormInput = ({
  form,
  name,
  inputType = "text",
  inputPlaceholder = "",
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{capitalizeLetter(name)}</FormLabel>
          <FormControl>
            <Input
              type={inputType}
              placeholder={inputPlaceholder}
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

FormInput.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object,
  }),
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  inputPlaceholder: PropTypes.string,
};
