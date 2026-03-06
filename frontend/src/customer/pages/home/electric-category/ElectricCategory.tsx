import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../state/store";

const ElectricCategory = () => {
  const { home } = useAppSelector((store) => store);
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b ">
      {home.homePageData?.electricCategories?.slice(0, 6).map((item) => (
        <ElectricCategoryCard item={item} key={item.id || item.categoryId} />
      ))}
    </div>
  );
};

export default ElectricCategory;
