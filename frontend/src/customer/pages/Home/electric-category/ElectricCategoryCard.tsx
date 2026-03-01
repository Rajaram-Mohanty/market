import React from "react";
import type { HomeCategory } from "../../../../types/homeCategoryTypes";
import { useNavigate } from "react-router-dom";

const ElectricCategoryCard = ({ item }: { item: HomeCategory }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="flex flex-col justify-center gap-3 cursor-pointer"
    >
      <img className="object-contain h-10" src={item.image} alt={item.name} />
      <h2 className="font-semibold text-sm text-center">{item.name}</h2>
    </div>
  );
};

export default ElectricCategoryCard;
