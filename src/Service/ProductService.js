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

export const getProducts = () => {
  const token = localStorage.getItem("token");

  return axios.get(generateUrl(APP_ENPOINT.getProducts), {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};
