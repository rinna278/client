import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { IoIosStar } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";
import axios from "axios";
import { useParams } from "react-router-dom";
import formatPrice from "../utils/FormatPrice";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [productDesc, setProductDesc] = useState("desc");
  const { handleAddToCart } = useContext(StoreContext);
  const [review, setReview] = useState([]);
  const reviews = product.reviews;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => console.log(error));
  }, [product]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/review/${id}`)
      .then((res) => {
        setReview(res.data.reviews);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectSize !== "" && selectColor !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectSize, selectColor]);
  const AddtoWishlist = async (productId, color, size) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/wishlist/addwishlist",
        {
          product: productId,
          color: color,
          size: size,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Layout>
      <div className="mx-24">
        <div className="flex mb-10 gap-20">
          <div className="w-1/3">
            <img src={product.image} className="size-full" alt="" />
          </div>

          <div className="flex flex-col mt-10 flex-1">
            <h1 className="font-bold text-4xl text-#3C4242">{product.title}</h1>
            <div className="flex gap-7 mt-4 text-xl font-bold items-center">
              <div className="text-3xl text-#3C4242">
                {formatPrice(product.price - product.discount)}
              </div>
              <s className="text-#807D7E">{formatPrice(product.price)}</s>
              <div className="p-0.5 bg-#8A33FD text-white rounded-lg">
                -{((product.discount / product.price) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div className="flex gap-2 items-center text-yellow-500">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <p className="text-#3C4242">
                  {product.numberRating?.toFixed(1)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TfiCommentAlt />
                <p>{reviews?.length} comment</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg mt-9 mb-6">Select Size</p>
              <ul className="flex gap-5 text-sm font-medium text-#3C4242">
                {product?.sizes?.map((size) => (
                  <li
                    onClick={() => setSelectSize(`${size}`)}
                    className={`${
                      selectSize === `${size}` ? "text-white bg-#3C4242" : ""
                    } border-2 w-10 h-10 flex items-center justify-center  rounded-xl cursor-pointer hover:bg-#3C4242 hover:text-white`}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-lg mt-9 mb-6">Select Colours</p>
              <ul className="flex gap-5">
                {product.colors?.map((color) => (
                  <div className="flex items-center justify-center" key={color}>
                    <input
                      type="radio"
                      id={`radio-${color}`}
                      name="color"
                      value={color}
                      className="hidden"
                      checked={selectColor === color}
                      onChange={() => setSelectColor(color)}
                    />
                    <label
                      htmlFor={`radio-${color}`}
                      className="relative cursor-pointer"
                    >
                      <span
                        style={{ backgroundColor: color }}
                        className={`inline-block size-8 rounded-full border-2 border-gray-500 align-middle mr-2 transition-transform duration-200`}
                      ></span>
                    </label>

                    <style jsx>{`
                      input[type="radio"]:checked + label span {
                        background-color: ${color};
                        transform: scale(1.3);
                      }
                    `}</style>
                  </div>
                ))}
              </ul>
            </div>

            <div className="my-9 flex gap-6">
              <SecondaryButton
                action={() =>
                  handleAddToCart(product._id, selectSize, selectColor)
                }
                isButtonDisabled={isButtonDisabled}
                title={"Add to cart"}
              />
              <PrimaryButton
                isButtonDisabled={isButtonDisabled}
                title={formatPrice(product.price)}
              />
              <PrimaryButton
                action={() =>
                  AddtoWishlist(product._id, selectSize, selectColor)
                }
                isButtonDisabled={isButtonDisabled}
                title={"Add to wishlist"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-5 mb-10 ">
            <div className="rounded-xl border-l-4 border-#8A33FD"></div>
            <h2 className=" text-#3C4242 font-bold text-4xl">
              Product Description
            </h2>
          </div>

          <div className="flex justify-center mb-5 gap-x-7 text-lg text-#807D7E">
            <p
              onClick={() => {
                setProductDesc("desc");
              }}
              className={`${
                productDesc === "desc"
                  ? "border-b-2 border-#2A2F2F text-#3C4242 text-lg "
                  : ""
              }py-2 cursor-pointer `}
            >
              Description
            </p>
            <div
              className={`flex gap-2 py-2 cursor-pointer ${
                productDesc === "comments"
                  ? "border-b-2 text-#3C4242 text-lg border-#2A2F2F"
                  : ""
              }`}
            >
              <p
                onClick={() => {
                  setProductDesc("comments");
                }}
              >
                User Comments
              </p>
              <div className="px-0.5 h-6 text-center text-sm text-white bg-#8A33FD rounded-lg">
                {review.length}
              </div>
            </div>
          </div>

          <p
            className={`${
              productDesc === "desc" ? "block" : "hidden"
            } text-#807D7E mx-10 `}
          >
            {product.description}
          </p>
          <div className={`${productDesc === "comments" ? "block" : "hidden"}`}>
            {review.map((item) => (
              <div className="flex gap-10">
                <h3 className="text-xl font-semibold">
                  {item.user?.firstname + " " + item.user?.lastname}
                </h3>
                {/* <div>
                  {"★".repeat(rating)} // đánh giá bằng sao
                  {"☆".repeat(5 - rating)} // sao rỗng
                </div> */}
                <p>{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
