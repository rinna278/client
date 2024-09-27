import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import formatPrice from "../utils/FormatPrice";
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
  const { cart, user, fetchCart } = useContext(StoreContext);
  const discountValue = user?.VIP === "1" ? 0.05 : user?.VIP === "2" ? 0.1 : 0;
  useEffect(() => {
    fetchCart();
  }, [cart]);
  const cartItem = cart.cartItem;
  return (
    <Layout>
      <div className={`${cartItem?.length !== 0 ? "block" : "hidden"}`}>
        <div
          className={`${
            localStorage.getItem("token") ? "hidden" : "block"
          } text-#807D7E text-sm mx-24 my-10`}
        >
          <p>
            Please fill in the fields below and click place order to complete
            your purchase!
          </p>
          <p>
            Already registered?
            <Link className="text-#8A33FD" to={`/signin`}>
              Please login here
            </Link>
          </p>
        </div>

        <div>
          <div className="bg-#3C4242 text-center text-white text-lg font-semibold grid grid-cols-7 px-24 py-6">
            <p className="col-span-3 text-left">Product Details</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>subtotal</p>
            <p>action</p>
          </div>
          <div className="mx-24">
            {cartItem?.map((item) => (
              <CartItem item={item} />
            ))}
          </div>
        </div>

        <div className="flex justify-between px-24 py-7 bg-#F6F6F6">
          <div>
            <h2 className="font-semibold text-2xl text-#3C4242">
              Discount Codes
            </h2>
            <p className="text-#807D7E mt-2 mb-10">
              Enter your coupon code if you have one
            </p>
            <div className="rounded-xl border-2 overflow-hidden bg-white mb-10">
              <input className="bg-white px-3 outline-none" type="text" />
              <button className="px-8 py-3 bg-#8A33FD active:opacity-80 text-white">
                Apply Coupon
              </button>
            </div>
            <Link
              to={"/shop"}
              className="px-8 py-3 hover:bg-#8A33FD bg-white hover:text-white text-#3C4242 font-semibold rounded-xl border-2"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="bg-#EDEEF2 px-20 py-10 flex flex-col items-center justify-between">
            <div className="grid grid-cols-2 gap-20 place-items-center pb-6 border-b border-#3C4242">
              <div className="grid grid-rows-3 text-#3C4242 font-medium text-xl">
                <p>Sub Total</p>
                <p>VIP {user?.VIP}</p>

                <p className="font-bold mt-5">Grand Total</p>
              </div>
              <div className="text-#3C4242 font-medium text-xl grid grid-rows-3">
                <p>{formatPrice(cart.totalPrice)}</p>
                <p>
                  {user?.VIP === "1" ? "5%" : user?.VIP === "2" ? "10%" : "0"}
                </p>

                <p className="font-bold mt-5">
                  {discountValue === 0
                    ? formatPrice(cart.totalPrice)
                    : formatPrice(cart.totalPrice-cart.totalPrice * discountValue)}
                </p>
              </div>
            </div>
            <Link
              to={"/checkout"}
              className="active:opacity-85 bg-#8A33FD px-8 py-3 mt-4 text-white rounded-lg"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          cartItem?.length === 0 ? "flex" : "hidden"
        } flex-col bg-#F6F6F6 items-center gap-3 py-16`}
      >
        <img src="images/empty-cart.png" alt="" />
        <h1 className="font-bold text-4xl ">Your cart is empty and sad :(</h1>
        <p className="text-#807D7E">Add something to make it happy!</p>
        <Link
          to={"/shop"}
          className="active:opacity-85 bg-#8A33FD px-8 py-3 mt-4 text-white rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </Layout>
  );
};

export default Cart;
