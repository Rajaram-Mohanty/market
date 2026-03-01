import React from "react";
import type { Deal } from "../../../../types/dealTypes";
import { useNavigate } from "react-router-dom";

const DealCard = ({ item }: { item: Deal }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.category?.categoryId}`)}
      className="w-[13rem] cursor-pointer"
    >
      <img
        className="border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top"
        src={item.category?.image}
        alt=""
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center">
        <h1 className="text-primary-color font-bold text-lg">
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
