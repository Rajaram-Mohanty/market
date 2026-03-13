import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../state/customer/productSlice";
import { addItemToCart } from "../../../state/customer/cartSlice";
import { addProductToWishlist } from "../../../state/customer/wishlistSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId]);

  const handleActiveImage = (value: number) => {
    setActiveImage(value);
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("jwt"),
        request: {
          productId: Number(productId),
          quantity: quantity,
          size: "M",
        },
      }),
    );
  };

  const handleAddToWishlist = () => {
    dispatch(addProductToWishlist(Number(productId)));
  };

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images?.map((item, index) => (
              <img
                key={index}
                onClick={() => handleActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images?.[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section className="text-lg">
          <h1 className="text-primary-color font-bold">
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">
            {product.product?.title}
          </p>
          <div className="flex flex-row gap-10 justify-between items-center w-max py-2 px-3 pt-5 ">
            <div className="flex items-center gap-1">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "20px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>

          <div className="price flex flex-col gap-3 mt-5 text-2xl">
            <div className="flex items-center gap-2">
              <span className="font-sans text-gray-1000">
                ₹ {product.product?.sellingPrice}
              </span>
              <span className="line-through text-grey-500 opacity-50">
                ₹ {product.product?.mrpPrice}
              </span>
              <span className="text-primary-color font-semibold">
                {product.product?.discountPercent}% off
              </span>
            </div>
            <div>
              <p>Inclusive of all taxes . Free shipping above ₹1500 </p>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic and Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>Quantity</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className="item-center flex mt-12 gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              onClick={handleAddToCart}
            >
              Add to the cart
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
              onClick={handleAddToWishlist}
            >
              wishlist
            </Button>
          </div>

          <div className="mt-12">
            <p>{product.product?.description}</p>
          </div>

          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
