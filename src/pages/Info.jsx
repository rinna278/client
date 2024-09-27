import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Info = () => {
  const { user, setUser, fetchUser, setCur } = useContext(StoreContext);

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "mobile") {
      const result = value.replace(/[^\d]/g, "");
      setUser((data) => ({ ...data, mobile: result }));
    } else {
      setUser((data) => ({ ...data, [name]: value }));
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("http://localhost:3000/user/update", user, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      toast.success(res.data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveAddress = async (idAddress) => {
    try {
      const res = await axios.delete("http://localhost:3000/address/delete", {
        data: {
          _id: idAddress,
        },
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      toast.success(res.data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className="flex gap-x-12 mx-24 my-10">
        <SideBar />
        <div className="w-full">
          <h1 className="font-bold text-3xl text-#3C4242 mb-5">My Info</h1>
          <p className="font-bold text-xl text-#3C4242">Contact Details</p>
          <form action="">
            <div className="py-5 border-b">
              <label
                htmlFor="email"
                className="font-semibold text-lg text-#807D7E"
              >
                Email Address
              </label>
              <div className="font-semibold text-lg flex justify-between">
                <input
                  type="email"
                  id="email"
                  className="outline-none"
                  value={user?.email}
                />
              </div>
            </div>
            <div className="py-5 border-b">
              <label
                htmlFor="name"
                className="font-semibold text-lg text-#807D7E"
              >
                First Name
              </label>
              <div className="font-semibold text-lg flex justify-between">
                <input
                  onChange={onChangeHandle}
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="outline-none"
                  value={user?.firstname}
                />
                <input
                  onClick={handleUpdateInfo}
                  type="submit"
                  value="change"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="py-5 border-b">
              <label
                htmlFor="name"
                className="font-semibold text-lg text-#807D7E"
              >
                Last Name
              </label>
              <div className="font-semibold text-lg flex justify-between">
                <input
                  onChange={onChangeHandle}
                  name="lastname"
                  type="text"
                  id="lastname"
                  className="outline-none"
                  value={user?.lastname}
                />
                <input
                  onClick={handleUpdateInfo}
                  type="submit"
                  value="change"
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="py-5 border-b">
              <label
                htmlFor="phone"
                className="font-semibold text-lg text-#807D7E"
              >
                Phone Number
              </label>
              <div className="font-semibold text-lg flex justify-between">
                <input
                  onChange={onChangeHandle}
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="outline-none"
                  value={user?.mobile}
                />
                <input
                  onClick={handleUpdateInfo}
                  type="submit"
                  value="change"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="py-5 border-b flex justify-between">
              <p className="font-semibold text-lg text-#807D7E">Password</p>
              <div className="font-semibold text-lg flex justify-between">
                <Link to={"/newpassword"}>change</Link>
              </div>
            </div>
          </form>
          <div>
            <div className="flex justify-between text-#3C4242 my-7">
              <h2 className="font-bold text-2xl">Address</h2>
              <Link
                onClick={() => setCur("Add")}
                className="text-#3C4242 font-semibold"
                to={"/info/address"}
              >
                Add New
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {user?.address?.map((item) => (
                <div className="bg-#F6F6F6 rounded-xl py-6 px-11 flex flex-col gap-5">
                  <p className="font-semibold text-xl text-#3C4242">
                    {item.firstname + " " + item.lastname}
                  </p>
                  <p className="text-#807D7E font-medium">{item.mobile}</p>
                  <p className="text-#807D7E font-medium">
                    {`${item?.deliInstruction} ${item.apartment}, ${item.streetAddress}, ${item.state}, ${item.city}, ${item.country}`}
                  </p>
                  <div className="text-#807D7E flex gap-3">
                    <div className="py-2 px-5 border-2 rounded-lg font-medium">
                      Home
                    </div>
                  </div>
                  <div className="text-#3C4242 font-semibold flex gap-5">
                    <button onClick={() => handleRemoveAddress(item._id)}>
                      Remove
                    </button>
                    <Link
                      onClick={() => setCur("Edit")}
                      to={`/info/address/${item._id}`}
                      className="cursor-pointer"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Info;
