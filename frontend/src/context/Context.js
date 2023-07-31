import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StateContext = createContext();
const api_uri = process.env.REACT_APP_API_URL;
const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState("");
  const [cartItem, setCartItem] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const CART_STORAGE_KEY = "cart";
  const [cart, setCart] = useState(() => {
    const cartFromLocalStorage = localStorage.getItem(CART_STORAGE_KEY);
    return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
  });

  // Save the cart state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cartIdFromLocalStorage = localStorage.getItem("cartId");

    if (cartIdFromLocalStorage) {
      try {
        setCartId(
          cartIdFromLocalStorage.replace(/\\/g, "").replace(/^"(.*)"$/, "$1")
        );
      } catch (error) {
        console.error("Error setting data from localStorage", error);
      }
    } else {
      const createCartItem = async () => {
        try {
          const response = await axios.post(`${api_uri}/store/carts/`);
       
          setCartId(response.data.id);
          // Convert the response.data.id to a string before storing it
          const stringifiedData = JSON.stringify(response.data.id);
          localStorage.setItem("cartId", stringifiedData);
        
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

  const fetchCart = async (id, cart) => {
    try {
      // Add items to the cart using API calls
      for (const item of cart) {
        await axios.post(`${api_uri}/store/carts/${id}/items/`, item);
      }
      // Fetch the updated cart from the backend API
      const response = await axios.get(`${api_uri}/store/carts/${id}/`);
      // Return the items in the cart (optional)
      return response.data.items;
    } catch (error) {
      console.error("Error in fetching cart", error);
      console.error(error);
      throw error;
    }
  };

  const addToCart = async (payload) => {
    setCart([...cart, payload]);
  };

  const removeItemFromCart = (itemId) => {
    // Filter out the item with the given itemId from the cart array
    const updatedCart = cart.filter((item) => item.product.id !== itemId);
    setCart(updatedCart);
  };

  const updateItemInCart = (product, quantity) => {
    // Find the index of the item with the given itemId in the cart array
    const itemIndex = cart.findIndex((item) => item.product == product);

    if (itemIndex !== -1) {
      // If the item is found, update its quantity
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity = quantity;
      setCart(updatedCart);
    } else {
      console.error(`Item with id ${product} not found in the cart.`);
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(`${api_uri}/store/orders/`, {});

      // setCartItem([]);
      //localStorage.removeItem("cartItem");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const BuyNow = () => {};

  const Collections = async () => {
    try {
      const response = await axios.get(`${api_uri}/store/collections/`);
      return response.data;
    } catch (error) {}
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

  const constructCartItem = async () => {
    cart.map(async (item) => {
      const payload = {
        product_id: item?.product?.id,
        quantity: item.quantity,
      };
      console.log("payload", payload);
      // Add items to the cart using API call
      try {
        await axios.post(`${api_uri}/store/carts/${cartId}/items/`, payload);
      } catch (err) {
        console.log(err);
      }
    });
    try {
      // Fetch the updated cart from the backend API (optional)
      const response = await axios.get(`${api_uri}/store/carts/${cartId}/`);
      const updatedCart = response.data;
      console.log("cccart", updatedCart);
      setCartItem(updatedCart);
      // Return the items in the cart (optional)
      return updatedCart.items;
    } catch (error) {
      console.error("Error in constructing cart items", error);
      throw error;
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
        cartId,
        setCartId,
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
        updateItemInCart,
        Collections,
        ProductsInCollection,
        cartItem,
        constructCartItem,
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
