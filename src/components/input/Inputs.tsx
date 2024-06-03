import React from "react";

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  disable?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  error,
  disable,
}) => {
  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`block w-full px-4 py-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          disabled={disable}
        />
        {error && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
            <svg
              fill="currentColor"
              height="20"
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                d="M250.26 166.05 256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path d="M256 367.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20z" />
            </svg>
          </div>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-500" id={`${name}-error`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
