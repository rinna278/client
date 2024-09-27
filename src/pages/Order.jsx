import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import OrderItem from "../components/OrderItem";
import { StoreContext } from "../context/StoreContext";

const Order = () => {
  const [status, setStatus] = useState("active");
  const { orders, fetchOrders } = useContext(StoreContext);

  useEffect(() => {
    fetchOrders();
  }, []);
  const orderActive = orders.filter(
    (item) =>
      item.orderStatus === "Order Placed" ||
      item.orderStatus === "Inprogress" ||
      item.orderStatus === "Shipped"
  );
  const orderCancel = orders.filter((item) => item.orderStatus === "Canceled");
  const orderComplete = orders.filter(
    (item) => item.orderStatus === "Delivered"
  );
  const order =
    status === "active"
      ? orderActive
      : status === "canceled"
      ? orderCancel
      : status === "completed"
      ? orderComplete
      : "";
  return (
    <Layout>
      <div className="flex gap-x-12 mx-24 my-10">
        <SideBar />
        <div className="w-full">
          <h1 className="font-bold text-3xl text-#3C4242 ">My Orders</h1>
          <div className="flex font-medium text-2xl mt-9 text-#3C4242 border-b-2 justify-between">
            <p
              onClick={() => setStatus("active")}
              className={`${
                status === "active"
                  ? "border-#3C4242 bg-#F6F6F6 border-b-2"
                  : ""
              } cursor-pointer  py-3 px-12 rounded-t-xl `}
            >
              Active
            </p>
            <p
              onClick={() => setStatus("canceled")}
              className={`${
                status === "canceled"
                  ? "border-#3C4242 bg-#F6F6F6 border-b-2"
                  : ""
              } cursor-pointer  py-3 px-12 rounded-t-xl `}
            >
              Canceled
            </p>
            <p
              onClick={() => setStatus("completed")}
              className={`${
                status === "completed"
                  ? "border-#3C4242 bg-#F6F6F6 border-b-2"
                  : ""
              } cursor-pointer  py-3 px-12 rounded-t-xl `}
            >
              Completed
            </p>
          </div>
          {order?.map((item) => (
            <OrderItem item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
