import { useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { IoAlertCircleOutline } from "react-icons/io5";

interface IInputsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  disable?: boolean;
}

const Inputs: React.FunctionComponent<IInputsProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  error,
  disable,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          disabled={disable}
          className={`block w-full px-4 py-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disable ? "bg-gray-100" : "bg-white"
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            className={`absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 ${
              error ? "right-10" : "right-3"
            }`}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </button>
        )}
        {error && (
          <>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
              <IoAlertCircleOutline size={20} />
            </div>
            <p className="mt-1 text-xs text-red-500">{error}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Inputs;
