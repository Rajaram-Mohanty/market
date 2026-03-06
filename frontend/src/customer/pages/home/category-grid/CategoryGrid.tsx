import React from "react";
import type { HomeCategory } from "../../../../types/homeCategoryTypes";
import { useNavigate } from "react-router-dom";

interface CategoryGridProps {
  gridData: HomeCategory[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ gridData }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      {gridData.map((item, index) => {
        // Different grid configurations for aesthetic layout
        let gridClasses = "col-span-2 row-span-6"; // Default

        switch (index % 6) {
          case 0:
            gridClasses = "col-span-3 row-span-12";
            break;
          case 1:
            gridClasses = "col-span-2 row-span-6";
            break;
          case 2:
            gridClasses = "col-span-4 row-span-6";
            break;
          case 3:
            gridClasses = "col-span-3 row-span-12";
            break;
          case 4:
            gridClasses = "col-span-4 row-span-6";
            break;
          case 5:
            gridClasses = "col-span-2 row-span-6";
            break;
          default:
            gridClasses = "col-span-2 row-span-6";
        }

        return (
          <div
            key={item.id || index}
            className={`${gridClasses} text-white cursor-pointer`}
            onClick={() => navigate(`/products/${item.categoryId}`)}
          >
            <img
              className="w-full h-full object-cover object-top rounded-md"
              src={item.image}
              alt={item.categoryId || `Category ${index + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
