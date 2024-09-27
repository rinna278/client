import React, { useContext } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import formatPrice from "../utils/FormatPrice";
import { StoreContext } from "../context/StoreContext";
const CartItem = ({ item }) => {
  const { handleRemoveCart ,handlePlus,handleSub} = useContext(StoreContext);
  
  return (
    <div className="grid grid-cols-7 py-7 border-b border-#BEBCBD items-center text place-items-center">
      <div className="flex gap-5 col-span-3 place-self-start">
        <img
          src={item.product?.image}
          className="rounded-xl w-24 h-28"
          alt=""
        />
        <div>
          <p className="font-bold text-lg text-#3C4242">
            {item.product?.title}
          </p>
          <p className="font-medium text-sm text-#807D7E">
            Color : {item.color}
          </p>
          <p className="font-medium text-sm text-#807D7E">Size : {item.size}</p>
        </div>
      </div>
      <p className="font-bold text-lg text-#3C4242">{formatPrice(item.price)}</p>
      <div className="flex gap-5 items-center font-medium text-lg rounded-xl">
        <button className={`px-4 py-2 ${item.quantity===1 ? 'hidden' : 'border-2'}`} onClick={()=>handleSub(item._id,item.quantity)}>-</button>
        <span>{item.quantity}</span>
        <button className="px-4 py-2 border-2" onClick={()=>handlePlus(item._id,item.quantity)}>+</button>
      </div>
      <p className="font-bold text-lg text-#3C4242">{formatPrice((item.price)*item.quantity)}</p>
      <button>
        <IoTrashBinOutline
          onClick={() => handleRemoveCart(item._id)}
          className="w-6 h-6 text-#8A33FD cursor-pointer active:opacity-80"
        />
      </button>
    </div>
  );
};

export default CartItem;
