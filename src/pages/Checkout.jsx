import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import formatPrice from "../utils/FormatPrice";
import { StoreContext } from "../context/StoreContext";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [showPayPal, setShowPayPal] = useState(false);
  const { user, cart } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const discountValue = user.VIP === "1" ? 0.05 : user.VIP === "2" ? 0.1 : 0;

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setShowPayPal(event.target.value === "paypal");
  };

  const [address, setAddress] = useState({});

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address || Object.keys(address).length === 0) {
      toast.error("Vui lòng chọn địa chỉ");
      navigate("/info");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/order/placeOrder",
        {
          shipAddress: address,
          paymentMethod: paymentMethod,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      navigate("/order");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePayPalApprove = async (details) => {
    if (!address || Object.keys(address).length === 0) {
      toast.error("Vui lòng thêm địa chỉ");
      navigate("/info");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/order/placeOrder",
        {
          shipAddress: address,
          paymentMethod: "paypal",
          paymentDetails: details,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Thanh toán thành công!");
      navigate("/order");
    } catch (error) {
      toast.error("Lỗi khi đặt hàng sau khi thanh toán bằng PayPal");
    }
  };

  return (
    <Layout>
      <div className="my-12 mx-24">
        <div className="flex gap-5 mb-3">
          <div className="rounded-xl border-l-4 border-#8A33FD"></div>
          <h2 className="text-#3C4242 font-bold text-4xl">Hello</h2>
        </div>
        <div className="grid grid-cols-5 gap-9">
          <div className="mt-3 col-span-3">
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-2 gap-5 pb-7">
              <div className="py-7 col-span-2">
                <p className="font-bold text-xl text-#3C4242">Shipping Address</p>
                <p className="text-#3C4242 mb-7 mt-2">
                  Select the address that matches your card or payment method.
                </p>
                <div className="flex flex-col mt-7">
                  {user.address?.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setAddress(item)}
                      className="flex items-center bg-#F6F6F6 rounded-xl py-4 px-7 border-b-2"
                    >
                      <input
                        required
                        name="address"
                        type="radio"
                        className="w-4 h-4 cursor-pointer"
                        id={idx}
                      />
                      <label htmlFor={idx} className="font-bold text-#3C4242 ml-5">
                        <p className="font-semibold text-xl text-#3C4242">
                          {`${item.firstname}, ${item.lastname} | ${item.mobile}`}
                        </p>
                        <p className="text-#807D7E font-medium text-base">
                          {`${item.deliInstruction} ${item.apartment}, ${item.streetAddress}, ${item.state}, ${item.city}, ${item.country}`}
                        </p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

              <div className="py-7 col-span-2">
                <p className="font-bold text-xl text-#3C4242 mb-7">Shipping Method</p>
                <div className="bg-#F6F6F6 rounded-xl py-9 px-7 flex flex-col gap-6">
                  <div>
                    <p className="font-bold text-xl text-#3C4242">
                      Arrives by Monday, June 7
                    </p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-2 gap-3">
                    <p className="font-bold text-xl text-#3C4242">Delivery Charges</p>
                    <p className="text-end font-bold text-xl text-#3C4242">
                      {formatPrice(5)}
                    </p>
                    <p className="font-medium text-#807D7E">
                      Additional fees may apply
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-7 col-span-2">
                <p className="font-bold text-xl text-#3C4242">Payment Method</p>
                <p className="text-#3C4242 mb-7 mt-2">
                All transactions are secure and encrypted.
                </p>
                <div className="bg-#F6F6F6 rounded-xl py-9 px-7 flex flex-col gap-6">
                  <div>
                    <input
                      required
                      type="radio"
                      id="cash"
                      className="w-4 h-4 cursor-pointer"
                      name="PaymentMethod"
                      value="Cash on delivery"
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="cash" className="font-bold text-#3C4242 text-xl ml-3">
                      Cash on delivery
                    </label>
                  </div>
                  <hr />
                  <div>
                    <input
                      type="radio"
                      id="Paypal"
                      className="w-4 h-4 cursor-pointer"
                      name="PaymentMethod"
                      value="paypal"
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="Paypal" className="font-bold text-#3C4242 text-xl ml-3">
                      Cash online
                    </label>
                  </div>
                </div>
              </div>

              {showPayPal ? (
                <PayPalScriptProvider options={{ "client-id": "AWIJCMF3OaxHj8g31kC5OkHxhIMB0tluOb_CViPsBtI-adN1zC5bmU8nYtUPewCVrDIVBUqVpflFVojK" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: (cart.totalPrice + 5 - cart.totalPrice * discountValue).toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(handlePayPalApprove);
                    }}
                    onError={(err) => {
                      toast.error("Thanh toán PayPal thất bại");
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <PrimaryButton title={"Place Order"} type={"submit"} />
              )}
            </form>
          </div>

          <div className="py-10 px-5 border-2 col-span-2 h-fit rounded-lg">
            <h2 className="font-bold text-2xl text-#3C4242 pb-4 border-b-2">Order Summary</h2>
            {cart.cartItem?.map((item) => (
              <div key={item.product?.id} className="grid grid-cols-5 items-center py-4 border-b-2">
                <img
                  src={item.product?.image}
                  className="w-16 h-16 rounded overflow-hidden"
                  alt=""
                />
                <div className="col-span-3 font-bold text-sm place-self-start">
                  <span className="text-#3C4242">
                    {item.product?.title}
                    <span className="text-#807D7E"> x{item.quantity}</span>
                  </span>
                  <p className="text-#3C4242 mt-2">
                    Color : <span className="text-#807D7E">{item.color}</span>
                  </p>
                </div>
                <p className="font-bold text-sm text-end text-#807D7E">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))}

            <div className="grid grid-cols-2 font-bold text-lg text-#3C4242 gap-y-4 py-4 border-b-2">
              <p>Subtotal ({cart.totalItem})</p>
              <p className="text-end">
                {formatPrice(cart.totalPrice)}
              </p>
              <p>VIP Discount</p>
              <p className="text-end">
                {user.VIP === "1" ? "-5%" : user.VIP === "2" ? "-10%" : "0%"}
              </p>
              <p>Shipping Cost</p>
              <p className="text-end">{formatPrice(5)}</p>
            </div>
            <div className="grid grid-cols-2 font-bold text-lg text-#3C4242 py-4">
              <p>Total</p>
              <p className="text-end">
                {formatPrice(cart.totalPrice - (cart.totalPrice * discountValue) + 5)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
