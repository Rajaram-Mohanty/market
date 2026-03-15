import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import type { Product } from "../../../types/productTypes";
import { useNavigate } from "react-router-dom";
import { addProductToWishlist } from "../../../state/customer/wishlistSlice";
import { useAppDispatch } from "../../../state/store";

const images = [
  "https://images.unsplash.com/photo-1610189012906-4783fda31c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
];
const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleAddToWishlist = (e:any) => {
    e.stopPropagation();
    item.id && dispatch(addProductToWishlist(item.id));
  };

  return (
    <div
      onClick={() =>
        navigate(
          `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`,
        )
      }
      className="group px-4 relative"
    >
      <div
        className="card relative w-full max-w-[280px] h-[350px] overflow-hidden mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.images.map((item: any, index: any) => (
          <img
            className="card-media object-top"
            src={item}
            alt=""
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {isHovered && (
          <div className="indicator flex flex-col items-center space-y-3">
            <div className="flex gap-3">
              <Button
                onClick={handleAddToWishlist}
                variant="contained"
                color="secondary"
              >
                <Favorite sx={{ color: teal[500] }} />
              </Button>
              <Button variant="contained" color="secondary">
                <ModeComment sx={{ color: teal[500] }} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="details group-hover-effect pt-3 space-y-1 rounded-md max-w-[280px] mx-auto">
        <div className="name">
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>

        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-1000">
            Rs {item.sellingPrice}
          </span>
          <span className="thin-line-through text-grey-500">
            Rs {item.mrpPrice}
          </span>
          <span className="text-primary-color font-semibold">
            {item.discountPercent}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
