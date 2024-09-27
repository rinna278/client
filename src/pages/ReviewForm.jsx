import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosStar } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const ReviewForm = () => {
  const [productRatings, setProductRatings] = useState({});
  const [productReviews, setProductReviews] = useState({});

  const [order, setOrder] = useState({});
  const uniqueOrders = {};
  const navigate = useNavigate();

  order.orderItems?.forEach((order) => {
    const key = order.product._id;
    uniqueOrders[key] = order;
  });

  const result = Object.values(uniqueOrders);

  const handleRatingChange = (itemId, rating) => {
    setProductRatings((prev) => ({
      ...prev,
      [itemId]: rating,
    }));
  };

  const handleReviewChange = (itemId, review) => {
    setProductReviews((prev) => ({
      ...prev,
      [itemId]: review,
    }));
  };

  const { id } = useParams();

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

  const submitReview = async (review, productId) => {
    const response = await axios.post(
      `http://localhost:3000/review/create`,
      {
        review: review,
        productId: productId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  };

  const submitRate = async (rating, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/rating/create`,
        {
          rating: rating,
          productId: productId,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleSubmit = async (e, itemId) => {
    e.preventDefault();
    console.log(itemId);
    
    try {
      const rating = productRatings[itemId];
      const review = productReviews[itemId];
      
      await submitRate(rating, itemId);
      await submitReview(review, itemId);

      // handleRatingChange(itemId, 0);
      // handleReviewChange(itemId, "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {order.orderItems?.map((item) => (
        <div
          className="p-4 bg-white rounded-lg shadow-md flex gap-10 border items-center justify-center"
          key={item.id}
        >
          <div className="flex items-center mb-4">
            <img
              src={item.product?.image}
              alt="Product"
              className="w-16 h-16 rounded mr-4"
            />
            <div>
              <p className="font-medium">{item.product?.title}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e, item.product._id)}
            className="w-full max-w-lg"
          >
            <div className="mb-4">
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((index) => (
                  <IoIosStar
                    key={index}
                    className={`cursor-pointer text-5xl ${
                      (productRatings[item.product._id] || 0) >= index
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleRatingChange(item.product._id, index)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4 text-center">
              <label
                htmlFor={`review-${item.product._id}`}
                className="block font-medium mb-2"
              >
                Your comment
              </label>
              <textarea
                id={`review-${item.product._id}`}
                className="w-full p-2 border rounded"
                placeholder="what do you thing"
                maxLength="300"
                value={productReviews[item.product._id] || ""}
                onChange={(e) => handleReviewChange(item.product._id, e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      ))}
    </Layout>
  );
};

export default ReviewForm;
