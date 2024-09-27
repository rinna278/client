import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { IoIosArrowBack } from "react-icons/io";
import formatPrice from "../utils/FormatPrice";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import formatDate from "../utils/FormatDate";
const OrderDetail = () => {
  const { id } = useParams();

  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3000/order/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setOrder(res.data.order))
      .catch((error) => console.log(error));
  }, []);
  console.log(order);
  
  return (
    <Layout>
      <div className="flex gap-x-12 mx-24 my-10">
        <SideBar />
        <div className="w-full">
          <Link
            to={"/order"}
            className="flex items-center gap-3 cursor-pointer mb-12"
          >
            <IoIosArrowBack className="w-6 h-6" />
            <h1 className="font-bold text-3xl text-#3C4242">Order Details</h1>
          </Link>
          <div className="bg-#F6F6F6 rounded-lg py-7 px-11 mb-7 grid grid-cols-2 place-items-start gap-2">
            <h2 className="font-semibold text-xl text-#3C4242">
              Order no: {order._id}
            </h2>
            <p className="place-self-end font-semibold text-lg text-#807D7E">
              Total:{" "}
              <span className="text-#3C4242">
                {formatPrice(order.totalPrice - order.totalDiscountPrice + 5)}
              </span>
            </p>
            <p className=" font-semibold text-lg text-#807D7E">
              ShippingAddress:{" "}
              <span className="text-#3C4242">
                {`${order.shippingAddress?.deliInstruction} ${order.shippingAddress?.apartment}, ${order.shippingAddress?.streetAddress}, ${order.shippingAddress?.state}, ${order.shippingAddress?.city}, ${order.shippingAddress?.country}`}
              </span>
            </p>
            <p className="text-#807D7E place-self-end">
              Placed On{" "}
              <span>{order.orderDate ? formatDate(order.orderDate) : ""}</span>{" "}
            </p>
          </div>

          <div className="flex px-7 justify-between items-center mt-12 mx-32">
            <div className="flex flex-col gap-4 items-center">
              <div
                className={`${
                  order.orderStatus === "Order Placed"
                    ? "text-#8A33FD"
                    : "text-#BEBCBD"
                }  text-xl font-bold`}
              >
                Order Placed
              </div>
            </div>
            <div className="bg-#BEBCBD w-14 mt-2 h-0.5"></div>
            <div className="flex flex-col gap-4 items-center">
              <div
                className={`${
                  order.orderStatus === "Inprogress"
                    ? "text-#8A33FD"
                    : "text-#BEBCBD"
                }  text-xl font-bold`}
              >
                Inprogress
              </div>
            </div>
            <div className="bg-#BEBCBD w-14 mt-2 h-0.5"></div>
            <div className="flex flex-col gap-4 items-center">
              <div
                className={`${
                  order.orderStatus === "shipped"
                    ? "text-#8A33FD"
                    : "text-#BEBCBD"
                }  text-xl font-bold`}
              >
                shipped
              </div>
            </div>
            <div className="bg-#BEBCBD w-14 mt-2 h-0.5"></div>
            <div className="flex flex-col gap-4 items-center">
              <div
                className={`${
                  order.orderStatus === "Delivered"
                    ? "text-#8A33FD"
                    : "text-#BEBCBD"
                }  text-xl font-bold`}
              >
                Delivered
              </div>
            </div>
          </div>

          <div className="bg-#F6F6F6 rounded-lg my-12">
            {order.orderItems?.map((item) => (
              <div className="grid grid-cols-5 place-items-center py-6 px-10 ">
                <img
                  src={item.product?.image}
                  className="w-24 h-28"
                  alt=""
                />
                <div className="col-span-2 place-self-start font-semibold text-xl text-#3C4242">
                  <p>{item.product?.title}</p>
                  <p>
                    Color : <span className="text-#807D7E">{item.color}</span>
                  </p>
                  <p>
                    Size : <span className="text-#807D7E">{item.size}</span>
                  </p>
                </div>
                <p className="font-semibold text-xl text-#3C4242">
                  Qty : <span className="text-#807D7E">{item.quantity}</span>
                </p>
                <p className="font-semibold text-xl text-#807D7E">
                  {formatPrice(item.quantity * item.price)}
                </p>
              </div>
            ))}
            <hr />
          </div>
          <Link
            className={`${order.orderStatus === "Delivered" ? "bg-#8A33FD text-white rounded-lg py-3 px-5 font-medium text-lg w-fit block" : "hidden"}`}
            to={`/order/rate/${order._id}`}
          >
            Rate and Review
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
