import React from "react";
import { FaFacebookF, FaGooglePlay } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
const Footer = () => {
  return (
    <div className="block bg-#2A2F2F text-#F6F6F6 px-44 py-14">
      <div className="flex justify-between mb-3">
        <div className="">
          <h2 className="font-bold text-3xl mb-4">Need Help</h2>
          <ul className="flex flex-col text-lg gap-4">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-4">Need Help</h2>
          <ul className="flex flex-col text-lg gap-4">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-4">Need Help</h2>
          <ul className="flex flex-col text-lg gap-4">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-4">Need Help</h2>
          <ul className="flex flex-col text-lg gap-4">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex gap-3">
          <div className="rounded-xl text-#2A2F2F p-3 bg-#F6F6F6">
            <FaFacebookF />
          </div>
          <div className="rounded-xl text-#2A2F2F p-3 bg-#F6F6F6">
            <FaFacebookF />
          </div>
          <div className="rounded-xl text-#2A2F2F p-3 bg-#F6F6F6">
            <FaFacebookF />
          </div>
          <div className="rounded-xl text-#2A2F2F p-3 bg-#F6F6F6">
            <FaFacebookF />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-5">Download The App </h2>
          <div className="flex gap-5">
            <div className="flex gap-3 items-center">
              <FaGooglePlay className="w-8 h-8" />
              <div>
                <p className=" text-xs">android app on</p>
                <p className="text-lg">Google Play</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
            <MdOutlinePhoneAndroid className="w-8 h-8" />
              <div>
                <p className=" text-xs">Available on the</p>
                <p className="text-lg">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-y p-7 mt-12 flex border-#807D7E justify-between items-center">
        <h2 className="font-bold text-3xl">Popular Categories</h2>
        <IoIosArrowDown className="h-6 w-6" />
      </div>
    
        <p className="mt-9 text-center">Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</p>
      
    </div>
  );
};

export default Footer;
