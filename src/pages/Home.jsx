import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CategoryDisplay from "../components/CategoryDisplay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import signup from "../assets/signup.png";
import { Link } from "react-router-dom";

const slider = [
  "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-cong-so_113855991.jpg",
  "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-dang-cap-hien-dai_113856116.png",
];
const Home = () => {
  const [cur, setCur] = useState(0);
  const prev = () => setCur((cur) => (cur === 0 ? slider.length - 1 : cur - 1));
  const next = () => setCur((cur) => (cur === slider.length - 1 ? 0 : cur + 1));
  useEffect(() => {
    const slideInterval = setInterval(next, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <div
          className="flex w-screen h-screen transition-transform ease-out duration-1000"
          style={{ transform: `translateX(-${cur * 100}%)` }}
        >
          {slider.map((slide) => (
            <img src={slide} alt="" />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between">
          <button onClick={prev}>
            <IoIosArrowBack className="w-16 h-16 text-white" />
          </button>
          <button onClick={next}>
            <IoIosArrowForward className="w-16 h-16 text-white" />
          </button>
        </div>
      </div>
      <div className="mx-24">
          <div className="grid grid-cols-2 rounded-lg overflow-hidden h-screen my-20">
            <div className="bg-[url(/src/assets/bg.png)] bg-no-repeat px-16 py-44 bg-cover">
              <h2 className="font-bold text-4xl text-white mb-8">
                WE MADE YOUR EVERYDAY FASHION BETTER!
              </h2>
              <p className="text-white font-light text-xl mb-12">
                In our journey to improve everyday fashion, euphoria presents
                EVERYDAY wear range - Comfortable & Affordable fashion 24/7
              </p>
              <Link
                to={"/shop"}
                className="bg-white text-#3C4242 px-11 py-3 rounded-lg"
              >
                Shop Now
              </Link>
            </div>

            <img src={signup} className="" alt="" />
          </div>  
        <CategoryDisplay />
        <CategoryDisplay />
      </div>
    </Layout>
  );
};

export default Home;
