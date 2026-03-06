import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../state/store";
// import Slider from "react-slick";

const Deal = () => {
  const { home } = useAppSelector((store) => store);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="py-5 lg:px-20">
      <div className="flex flex-wrap items-center justify-around gap-4 place-items-center">
        {home.homePageData?.deals?.slice(0, 6).map((item) => (
          <div key={item.id} className="w-32 md:w-40 lg:w-44">
            <DealCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deal;
