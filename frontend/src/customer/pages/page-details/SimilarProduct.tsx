import { useEffect } from "react";
import ProductCard from "../product/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllProducts } from "../../../state/customer/productSlice";

const SimilarProduct = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (product?.category?.name) {
      dispatch(
        fetchAllProducts({
          category: product.category.name,
          pageNumber: 0,
        }),
      );
    }
  }, [dispatch, product?.category?.name]);

  const products = useAppSelector((state) => state.product.products);

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8">
      {products.slice(0, 6).map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SimilarProduct;
