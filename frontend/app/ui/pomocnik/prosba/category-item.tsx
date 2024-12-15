import React from "react";
import { NavItemProps } from "@/app/ui/mainpage/navigation";

interface CategoryItemProps extends NavItemProps {
  className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon: Icon,
  label,
  radius,
  style,
  className,
}) => (
  <div
    style={{
      ...style,
      width: `${radius * 2}px`, // Double the radius for width and height
      height: `${radius * 2}px`,
    }}
    className={`absolute flex flex-col items-center justify-center bg-amber-600 border-2 border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 ${className || ''}`}
  >
    <Icon className={`w-6 h-6 md:w-10 md:h-10 text-white`} />
    <div className="text-xs md:text-sm mt-1 text-white font-bold drop-shadow-md">
      {label}
    </div>
  </div>
);

export default CategoryItem;
