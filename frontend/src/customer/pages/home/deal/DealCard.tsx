import React from "react";
import type { Deal } from "../../../../types/dealTypes";
import { useNavigate } from "react-router-dom";

const DealCard = ({ item }: { item: Deal }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.category?.categoryId}`)}
      className="w-full h-[300px] flex flex-col cursor-pointer"
    >
      <img
        className="border-x-[7px] border-t-[7px] border-pink-600 w-full h-48 object-cover object-top shrink-0"
        src={item.category?.image}
        alt=""
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center flex flex-col justify-center grow">
        <h1 className="text-primary-color font-bold text-lg line-clamp-1">
          {item.category?.name}
        </h1>
        <p className="text-gray-600 font-semibold text-base">
          {item.discount}% OFF
        </p>
        <p className="text-balance text-gray-500">shop now</p>
      </div>
    </div>
  );
};

export default DealCard;
