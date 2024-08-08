import axios from "axios";
import { APP_ENPOINT, generateUrl } from "./AppEndpoint";

export const createProductApi = (value) => {
  const payload = {
    name: value.productName,
    description: value.description,
    category: value.category,
    stock: value.stock,
    price: value.price,
  };
  const token = localStorage.getItem("token");

  return axios.post(
    generateUrl(APP_ENPOINT.createproduct),
    { ...payload },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAdminProductsService = (pageNo) => {
  const token = localStorage.getItem("token");

  return axios.get(generateUrl(APP_ENPOINT.getAdminProducts), {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getProductsService = (pageNo, search, category, price) => {
  const token = localStorage.getItem("token");

  return axios.get(
    generateUrl(APP_ENPOINT.getProducts) +
      `?page=${pageNo}${search ? `&keyword=${search}` : ""}${
        category ? `&category=${category}` : ""
      }${price?.minPrice ? `&price[gte]=${price.minPrice}` : ""}${
        price?.maxPrice ? `&price[lte]=${price.maxPrice}` : ""
      }`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getProductDetails = (id) => {
  // console.log(id);
  const token = localStorage.getItem("token");
  return axios.get(`${generateUrl(APP_ENPOINT.getProductDetails)}${id}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const productUpdate = (value, id) => {
  const payload = {
    name: value.productName,
    description: value.discription,
    price: value.price,
    category: value.category,
    Stock: value.stock,
    images: "",
  };
  const token = localStorage.getItem("token");
  return axios.put(
    generateUrl(APP_ENPOINT.productUpdate) + `${id}`,
    { ...payload },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const productDelete = (productId) => {
  const token = localStorage.getItem("token");
  return axios.delete(generateUrl(APP_ENPOINT.productDelete) + `${productId}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};
