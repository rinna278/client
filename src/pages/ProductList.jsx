import React, { useContext } from "react";

import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import { StoreContext } from "../context/StoreContext";
const ProductList = ({ title, category }) => {
  const { products, listProduct } = useContext(StoreContext);

  const filterProduct = listProduct.length !== 0 ? listProduct : products;
  
  const displayProduct =
    category === "both"
      ? filterProduct
      : filterProduct.filter(
          (item) =>
            item.category?.parentCategory.name === category ||
            item.category?.parentCategory.name === "both"
        );
  return (
    <Layout>
      <div className="flex mx-24">
        <Filter />
        <div className="p-12 w-full ">
          <h2 className="font-semibold text-xl text-#333333 mb-12">{title}</h2>
          <div className="grid grid-cols-3 gap-6">
            {displayProduct?.map((product) => (
              <ProductItem product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
