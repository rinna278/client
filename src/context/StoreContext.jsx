import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:3000/wishlist", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/order", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProducts(res.data.products))
      .catch((error) => console.log(error));
  }, []);

  const fetchUser = () => {
    axios
      .get("http://localhost:3000/user/info", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((error) => console.log(error));
  };

  const fetchCart = () => {
    axios
      .get("http://localhost:3000/cart", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCart(res.data.cart))
      .catch((error) => console.log(error));
  };

  const handleAddToCart = async (productId, size, color) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/cart/add",
        {
          productId: productId,
          size: size,
          color: color,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveCart = async (cartItemId) => {
    try {
      const res = await axios.delete("http://localhost:3000/cartItem/delete", {
        data: {
          _id: cartItemId,
        },
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePlus = async (cartItemId, quantity) => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/cartItem/update",
        {
          _id: cartItemId,
          quantity: quantity + 1,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSub = async (cartItemId, quantity) => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/cartItem/update",
        {
          _id: cartItemId,
          quantity: quantity - 1,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser(), fetchCart(), fetchOrders(), fetWishlist();
  }, []);

  const contextValue = {
    products,
    cart,
    user,
    orders,
    setUser,
    handleAddToCart,
    handleRemoveCart,
    handlePlus,
    handleSub,
    fetchCart,
    fetchUser,
    fetchOrders,
    wishlist,
    setWishlist,
    setProducts,
    fetWishlist,
    listProduct,
    setListProduct,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
