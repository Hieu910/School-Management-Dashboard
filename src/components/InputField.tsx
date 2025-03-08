import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered w-full max-w-xs"
        {...inputProps}
        defaultValue={defaultValue}
        autoComplete="new-password"
      />
      {error?.message && (
        <p className="text-sm text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;