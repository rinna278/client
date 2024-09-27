import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const EditAddress = () => {
  const { fetchUser } = useContext(StoreContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    state: "",
    streetAddress: "",
    apartment: "",
    mobile: "",
    deliInstruction: "",
  });
  const editAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:3000/address/update/${id}`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchUser();
      toast.success(res.data.message);
      navigate("/info");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/address/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data.address))
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <Layout>
      <div className="flex gap-x-12 mx-24 my-10">
        <SideBar />
        <div className="w-full">
          <h1 className="font-bold text-3xl text-#3C4242 mb-5">My Info</h1>
          <p className="font-bold text-xl text-#3C4242">Edit Address</p>
          <form
            onSubmit={editAddress}
            className="grid grid-cols-2 gap-10 mt-12"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                First Name*
              </label>
              <input
                onChange={onChangeHandle}
                type="text"
                name="firstname"
                placeholder="First Name"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
                required
                value={data.firstname}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Last Name*
              </label>
              <input
                required
                value={data.lastname}
                onChange={onChangeHandle}
                name="lastname"
                type="text"
                placeholder="Last Name"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Country / Region*
              </label>
              <input
                required
                value={data.country}
                onChange={onChangeHandle}
                name="country"
                type="text"
                placeholder="Country / Region"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                City*
              </label>
              <input
                value={data.city}
                required
                onChange={onChangeHandle}
                name="city"
                type="text"
                placeholder="Town / City"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                State
              </label>
              <input
                required
                value={data.state}
                onChange={onChangeHandle}
                name="state"
                type="text"
                placeholder="State"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Street Address*
              </label>
              <input
                required
                value={data.streetAddress}
                onChange={onChangeHandle}
                name="streetAddress"
                type="text"
                placeholder="Street Address*"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Apt, suite, unit
              </label>
              <input
                required
                value={data.apartment}
                onChange={onChangeHandle}
                name="apartment"
                type="text"
                placeholder="apartment, suite, unit, etc. (optional)"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Phone*
              </label>
              <input
                required
                value={data.mobile}
                onChange={onChangeHandle}
                name="mobile"
                type="tel"
                placeholder="Phone"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="" className="text-#3C4242 text-lg font-semibold">
                Delivery Instruction
              </label>
              <textarea
                value={data.deliInstruction}
                onChange={onChangeHandle}
                name="deliInstruction"
                type="text"
                placeholder="Delivery Instruction"
                className="bg-#F6F6F6 outline-none px-5 py-4 rounded-lg"
              />
            </div>
            {/* <div className="col-span-2 text-xl text-#3C4242 flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4" name="" id="" />
                <span>Set as default shipping address</span>
              </div>
            </div> */}
            <div className="flex gap-7 text-xl font-bold">
              <PrimaryButton title={"Save"} type={"submit"} />
              <Link
                to="/info"
                className="py-3 px-10 active:opacity-80 bg-#F6F6F6 text-#807D7E  rounded-lg"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditAddress;
