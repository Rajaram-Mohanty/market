import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../state/store";

const ShopByCategory = () => {
  const { home } = useAppSelector((store) => store);
  return (
    <div className="flex flex-wrap justify-between lg:px-20">
      {home.homePageData?.shopByCategories?.slice(0, 6).map((item) => (
        <ShopByCategoryCard item={item} key={item.id || item.categoryId} />
      ))}
    </div>
  );
};

export default ShopByCategory;
