import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StateContext = createContext();
const api_uri = process.env.REACT_APP_API_URL;
const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [cart, setCart] = useState([]);
  const [MyCart, setMyCart] = useState([]);
  const [User, setUser] = useState(null);
  const[accessToken, setAccessToken] = useState(null)
  const[refreshAccessToken, setRefreshAccessToken] = useState(null)

  

  useEffect(() => {
    const cartItemFromLocalStorage = localStorage.getItem("cartItem");

    if (cartItemFromLocalStorage) {
      try {
        setCartItem(cartItemFromLocalStorage);
        fetchCart(
          cartItemFromLocalStorage.replace(/\\/g, "").replace(/^"(.*)"$/, "$1")
        );
      } catch (error) {
        console.error("Error setting data from localStorage", error);
      }
    } else {
      const createCartItem = async () => {
        try {
          const response = await axios.post(`${api_uri}/store/carts/`);
          console.log("creating cart", response);
          setCartItem(response.data.id);
          fetchCart(response.data.id);
          // Convert the response.data.id to a string before storing it
          const stringifiedData = JSON.stringify(response.data.id);
          localStorage.setItem("cartItem", stringifiedData);
          console.log(
            "Cart created and saved to local storage",
            localStorage.getItem("cartItem")
          );
        } catch (error) {
          console.error("Error in creating a shopping cart", error);
          console.log("error in creating a cart", error);
        }
      };

      createCartItem();
    }
  }, []);

  const OneProduct = async (id) => {
    try {
      const response = await axios.get(`${api_uri}/store/products/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    // Fetch product list from the backend API
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${api_uri}/store/products/`);
        const data = response.data;
        setProducts(data.results); // Update the productList state with fetched data
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchProductList();
  }, []); // Empty dependency array to run this effect only once on mount

  const handleNextPage = () => {
    fetch(nextPageUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("Error fetching data:", error);
      });
  };

  const handlePrevPage = () => {
    fetch(prevPageUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = () => {
    let url = `${api_uri}/store/products/`;
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setIsSearching(true);
  };

  const fetchCart = async (id) => {
    try {
      const response = await axios.get(`${api_uri}/store/carts/${id}/`);
      setCart(response.data.items);
      setMyCart(response.data);
      return response.data.items
    } catch (error) {
      console.error("Error in fetching cart", error);
      console.error(error);
      throw error
    }
  };

  const addToCart = async (payload) => {
    const { id } = payload;
    console.log("payload", payload);
    try {
      const response = await axios.post(
        `${api_uri}/store/carts/${id}/items/`,
        payload
      );
      fetchCart(id);
    } catch (error) {
      console.error("Error in adding product to cart", error);
    }
  };

  const removeItemFromCart = async (cartId, itemId) => {
    try {
      const response = await axios.delete(
        `${api_uri}/store/carts/${cartId}/items/${itemId}/`
      );
      fetchCart(cartId.replace(/\\/g, "").replace(/^"(.*)"$/, "$1"));
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const updateItemInCart = async (cartId, itemId, quantity) => {
    const payload = {
      quantity: quantity,
      id: cartId,
    };

    try {
      const response = await axios.patch(
        `${api_uri}/store/carts/${cartId}/items/${itemId}/`,
        payload
      );
      fetchCart(cartId);
    } catch (error) {
      console.error("Error updating item in cart", error);
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(`${api_uri}/store/orders/`, {
        cartItems: cartItem,
      });

      setCartItem([]);
      localStorage.removeItem("cartItem");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const BuyNow = () => {};

  const Collections = async () => {
    try {
      const response = await axios.get(`${api_uri}/store/collections/`);
      return response.data;
    } catch (error) {
      
    }
  };

  const ProductsInCollection = async (collectionId) => {
    try {
      const response = await axios.get(`${api_uri}/store/by_collection/`, {
        params: { collection_id: collectionId },
      });
      setProducts(response.data.results);
      setIsSearching(true);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

// const getUserInfo = async () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   if(storedUser && storedUser.access){
//     setAccessToken(storedUser.access);
//   try {
//     const userResponse = await axios.get(`${api_uri}/auth/users/me/`, {
//       headers: {
//         Authorization: `JWT ${storedUser.access}`,
//       },
//     });
//     setUser(userResponse);
//     return userResponse.data
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       console.log(error)
//       await refreshToken();
//     } else {
//       console.log('Error while fetching user info:', error);
//       throw error
//     }
//   }
// }
// };

// const refreshToken = async () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   if(storedUser){
//     setRefreshAccessToken(storedUser?.refresh);
//   try {
//     const refreshResponse = await axios.post(`${api_uri}/auth/jwt/refresh/`, {
//       refresh: refreshAccessToken,
//     });

//     // Update the access token in the state and localStorage
//     const newAccessToken = refreshResponse.data.access;
//     setUser(null); // Clear the user state since the token is being refreshed
//     localStorage.setItem(
//       "user",
//       JSON.stringify({ ...storedUser, access: newAccessToken })
//     );
//     getUserInfo();
//   } catch (error) {
//     console.log('Error while refreshing token:', error);
//   }
// }
// };

  return (
    <StateContext.Provider
      value={{
        products,
        cartItem,
        setCartItem,
        setProducts,
        nextPageUrl,
        setNextPageUrl,
        prevPageUrl,
        setPrevPageUrl,
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
        handleNextPage,
        handlePrevPage,
        handleSearch,
        addToCart,
        removeItemFromCart,
        PlaceOrder,
        BuyNow,
        cart,
        setCart,
        fetchCart,
        OneProduct,
        MyCart,
        updateItemInCart,
        Collections,
        ProductsInCollection,
        
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};

export default ContextProvider;
