import React, { useContext, useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import axios from "axios";
import { toast } from "react-toastify";
import PrimaryButton from "../components/PrimaryButton";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      localStorage.setItem("token","Bearer "+ res.data.token);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <HeaderAuth />
      <div className="flex gap-16">
        <img src={signup} alt="" className="h-screen" />
        <div className="w-full px-20 py-5">
          <h1 className="font-bold text-5xl text-#333333 mb-3">Sign Up Page</h1>
          <p className="mb-5 text-#807D7E">
            Sign up for free to access to in any of our products
          </p>
          <form onSubmit={handleSignup} className="flex flex-col gap-5 text-#3C4242">
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                First Name
              </label>
              <input
                type="text"
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Last Name
              </label>
              <input
                type="text"
                required
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Password
              </label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div>
              <PrimaryButton type={'submit'} title={"Sign Up"}  />
            </div>
            <p>
              Already have an account?{" "}
              <Link to={"/signin"} className="underline hover:text-#8A33FD">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
