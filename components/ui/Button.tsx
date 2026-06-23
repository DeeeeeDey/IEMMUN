import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer rounded-full";
    
    let variantStyles = "";
    switch (variant) {
      case "primary":
        variantStyles = "bg-accent text-white hover:bg-accent/90 active:scale-[0.98] shadow-[0_4px_14px_rgba(195,13,15,0.4)] hover:shadow-[0_6px_20px_rgba(195,13,15,0.6)] border border-transparent";
        break;
      case "secondary":
        variantStyles = "bg-white text-black border border-transparent hover:bg-white/90 active:scale-[0.98] shadow-lg hover:shadow-white/20";
        break;
      case "outline":
        variantStyles = "bg-white/[0.03] text-white border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] active:scale-[0.98] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]";
        break;
      case "ghost":
        variantStyles = "bg-transparent text-white/60 hover:text-white hover:bg-white/5 active:scale-[0.98]";
        break;
      case "link":
        variantStyles = "bg-transparent text-accent hover:text-accent-hover underline underline-offset-4 p-0";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = "px-4 py-2 text-[10px]";
        break;
      case "md":
        sizeStyles = "px-6 py-3 text-xs";
        break;
      case "lg":
        sizeStyles = "px-8 py-4 text-sm";
        break;
    }

    // Adjust sizes for link variant
    if (variant === "link") {
      sizeStyles = "";
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
