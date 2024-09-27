import React, { useContext, useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PrimaryButton from "../components/PrimaryButton";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
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
        <img src="images/signin.png" alt="" className="h-screen" />
        <div className="w-full px-20 py-5">
          <h1 className="font-bold text-5xl text-#333333 mb-12">
            Sign In Page
          </h1>
          <form onSubmit={handleSignin} className="flex flex-col gap-5 text-#3C4242">
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Email address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-lg  mb-2">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 rounded-lg py-3 px-5 w-full outline-none "
              />
            </div>
            <p className="underline text-right">Forget your password</p>
            <div>
              <PrimaryButton type={'submit'} title={"Sign In"} />
            </div>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="underline hover:text-#8A33FD">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
