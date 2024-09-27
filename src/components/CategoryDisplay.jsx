import React from "react";
import CategoryItem from "./CategoryItem";
const CategoryDisplay = () => {
  return (
    <>
      <div className="flex gap-5 mb-16 mt-20">
        <div className="rounded-xl border-l-4 border-#8A33FD"></div>
        <h2 className=" text-#3C4242 font-bold text-4xl">Categories For Men</h2>
      </div>
      <div className="flex justify-between px-6">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </>
  );
};

export default CategoryDisplay;
