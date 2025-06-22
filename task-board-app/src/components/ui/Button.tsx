import React from "react";

interface ButtonProps {
  onClick: (e?: any) => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ onClick, className = "", children, style }) => {
  return (
    <button
      onClick={onClick}
      style={style || {}}
      className={`border-2 border-dotted
                          text-sm font-bold relative
                          text-transparent bg-clip-text 
                          bg-gradient-to-r from-blue-600 via-white to-blue-600
                          animate-[shimmer_3s_linear_infinite]
                          [background-size:200%_100%]
                          [text-shadow:1px_1px_0px_rgba(0,0,0,0.25),2px_2px_0px_rgba(0,0,0,0.25),3px_3px_5px_rgba(0,0,0,0.15)]
                          rounded-md p-2 ${className}
                        `}
    >
      {children}
    </button>
  );
};


