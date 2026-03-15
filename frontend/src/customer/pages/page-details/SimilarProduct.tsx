import { useEffect } from "react";
import ProductCard from "../product/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllProducts } from "../../../state/customer/productSlice";

const SimilarProduct = () => {
  const dispatch = useAppDispatch();
  const { product, products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (product?.category?.categoryId) {
      dispatch(
        fetchAllProducts({
          category: product.category.categoryId,
          pageNumber: 0,
        }),
      );
    }
  }, [dispatch, product?.category?.categoryId]);

  const viewableProducts = products
    .filter((item) => item.id !== product?.id)
    .slice(0, 6);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-7 gap-y-8 py-5">
      {viewableProducts.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SimilarProduct;
