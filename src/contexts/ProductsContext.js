import React, { useEffect, useReducer, useState } from "react";
import { APIproducts } from "../const/config";
import axios from "axios";
import { calcSubPrice, calcTotalPrice } from "../const/calcPrice";

export const productContext = React.createContext();
const INIT_STATE = {
  products: null,
  productToEdit: null,
  recommendedProducts: null,
  countOfProducts: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cart: 0,
  countOfProductsFavorites: JSON.parse(localStorage.getItem("favorites"))
    ? JSON.parse(localStorage.getItem("favorites")).products.length
    : 0,
  favorites: 0,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCTS_TO_EDIT":
      return { ...state, productToEdit: action.payload };
    case "GET_RECOMMEND":
      return { ...state, recommendedProducts: action.payload };
    case "CLEAR_STATE":
      return { ...state, productToEdit: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_CART":
      return { ...state, countOfProducts: action.payload };
    case "GET_ALL":
      return { ...state, cart: action.payload };
    case "CLEAR_COUNT":
      return { ...state, countOfProducts: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_FAVORITES":
      return { ...state, countOfProductsFavorites: action.payload };
    case "GET_ALL_FAVORITES":
      return { ...state, favorites: action.payload };
    case "CLEAR_COUNT_FAVORITES":
      return { ...state, countOfProductsFavorites: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! CREATE

  const addProducts = async (product) => {
    try {
      await axios.post(APIproducts, product);
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  // ! READ

  const getProducts = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${APIproducts}/${filter}`);

      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  // ! UPDATE

  const getProductsToEdit = async (id) => {
    try {
      const response = await axios(` 
                ${APIproducts}/${id}`);
      let action = {
        type: "GET_PRODUCTS_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const saveEditedProducts = async (editedProducts) => {
    try {
      await axios.patch(`${APIproducts}/${editedProducts.id}`, editedProducts);
      getProducts();
      clearState();
    } catch (e) {
      console.log(e);
    }
  };

  const clearState = () => {
    let action = {
      type: "CLEAR_STATE",
      payload: null,
    };
    dispatch(action);
  };
  //Delete
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${APIproducts}/${id}`);
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  // Get Recommend items

  const getRecommend = async (id) => {
    try {
      const { data } = await axios(APIproducts);
      let brand;
      data.forEach((item) => {
        if (item.id == id) {
          brand = item.brand;
        }
      });
      // console.log(brand);
      // brand = brand.brand;
      const recom = data.filter((item) => {
        return item.brand === brand;
      });
      // console.log(brand);
      dispatch({
        type: "GET_RECOMMEND",
        payload: recom,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  useEffect(() => {
    if (state.products) {
      const data = state.products;
      setPosts(data);
    }
  }, [state.products]);

  const numberOfLastPost = currentPage * postsPerPage;
  const numberOfFirstPost = numberOfLastPost - postsPerPage;
  const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost);
  const totalPosts = posts.length;
  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const addAndDeleteProductInCart = (product, discount = 0) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    } else {
    }
    let tovar = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    tovar.subPrice = Math.round((calcSubPrice(tovar) * (100 - discount)) / 100);
    let checkArr = cart.products.filter((item) => {
      return item.product.id === product.id;
    });
    if (checkArr.length === 0) {
      cart.products.push(tovar);
    } else {
      cart.products = cart.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let checkArr = cart.products.filter((item) => {
      return item.product.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const changeCountProduct = (count, id, discount = 0) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = Math.round(
          (calcSubPrice(item) * (100 - discount)) / 100
        );
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    getAll();
  };
  const getAll = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_ALL",
      payload: cart,
    });
  };
  const clearCountOfProducts = () => {
    dispatch({
      type: "CLEAR_COUNT",
      payload: 0,
    });
  };
  // конец

  const addAndDeleteProductInFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    } else {
    }
    let tovar = {
      product: product,
      count: 1,
    };
    let checkArr = favorites.products.filter((item) => {
      return item.product.id === product.id;
    });
    if (checkArr.length === 0) {
      favorites.products.push(tovar);
    } else {
      favorites.products = favorites.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_FAVORITES",
      payload: favorites.products.length,
    };
    dispatch(action);
  };

  const checkProductInFavorites = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
        totalPrice: 0,
      };
    }
    let checkArr = favorites.products.filter((item) => {
      return item.product.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const changeCountProductFavorites = (count, id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites.products = favorites.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
      }
      return item;
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    getAllFavorites();
  };

  const getAllFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    dispatch({
      type: "GET_ALL_FAVORITES",
      payload: favorites,
    });
  };
  const clearCountOfProductsFavorites = () => {
    dispatch({
      type: "CLEAR_COUNT_FAVORITES",
      payload: null,
    });
  };
  return (
    <productContext.Provider
      value={{
        addProducts: addProducts,
        getProducts: getProducts,
        getProductsToEdit: getProductsToEdit,
        saveEditedProducts: saveEditedProducts,
        deleteProduct: deleteProduct,
        handlePage: handlePage,
        addAndDeleteProductInCart: addAndDeleteProductInCart,
        changeCountProduct: changeCountProduct,
        checkProductInCart: checkProductInCart,
        getAll: getAll,
        setCurrentPage: setCurrentPage,
        clearCountOfProducts: clearCountOfProducts,
        addAndDeleteProductInFavorites: addAndDeleteProductInFavorites,
        changeCountProductFavorites: changeCountProductFavorites,
        checkProductInFavorites: checkProductInFavorites,
        getAllFavorites: getAllFavorites,
        clearCountOfProductsFavorites: clearCountOfProductsFavorites,
        getRecommend,
        productToEdit: state.productToEdit,
        products: state.products,
        currentPosts: currentPosts,
        totalPosts: totalPosts,
        postsPerPage: postsPerPage,
        currentPage: currentPage,
        cart: state.cart,
        recommendedProducts: state.recommendedProducts,
        favorites: state.favorites,
        countOfProducts: state.countOfProducts,
        countOfProductsFavorites: state.countOfProductsFavorites,
      }}
    >
      {" "}
      {props.children}{" "}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
