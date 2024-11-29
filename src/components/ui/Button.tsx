import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const buttonVariants = {
  primary:
    "bg-purple-700 hover:bg-purple-700/90 text-white rounded tracking-widest",
  secondary:
    "bg-purple-300 hover:bg-purple-300/90 text-purple-700 tracking-widest",
};

const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2",
};

export const Button = ({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  onClick,
  children,
  loading,
  className,
}: ButtonProps) => {
  return (
    <>
      <button
        type={onClick ? "submit" : "button"}
        className={`select-none transition-all ease-in-out duration-200 flex items-center justify-center ${
          buttonVariants[variant]
        } ${buttonSizes[size]} ${className} ${loading && "opacity-50"}`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <img src="./loader.svg" className="w-5 h-5 animate-spin invert" />
        ) : (
          <>
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {children}
            {endIcon && <span className="mr-2">{endIcon}</span>}
          </>
        )}
      </button>
    </>
  );
};
