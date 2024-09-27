import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const WishItem = ({ item }) => {
  const {  fetWishlist } = useContext(StoreContext);

  const removeWish = async (id) => {
    try {
      const res =await axios.delete(
        "http://localhost:3000/wishlist/delete",
        {
          data:{
            id:id
          },
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      fetWishlist()
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className="grid grid-cols-7 place-items-center py-7 border-b border-#BEBCBD">
      <AiOutlineClose className="w-6 h-6 cursor-pointer active:scale-95" onClick={()=>removeWish(item._id)}/>

      <img
        src={item.product?.image}
        className="w-24 h-28 rounded place-self-start"
        alt=""
      />
      <div className="font-bold text-xl text-#3C4242 col-span-3 place-self-start">
        <p>{item.product?.title}</p>
        <p>
          Color : <span className="font-normal text-#807D7E">{item.color}</span>
        </p>
        <p>
          Size : <span className="font-normal text-#807D7E">{item.size}</span>
        </p>
      </div>

      <Link
        to={`/products/${item.product?._id}`}
        className="px-7 py-3 bg-#8A33FD text-white rounded-xl active:opacity-80"
      >
        Detail
      </Link>
    </div>
  );
};

export default WishItem;
