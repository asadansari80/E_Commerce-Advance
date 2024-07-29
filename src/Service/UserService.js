import { APP_ENPOINT, generateUrl } from "./AppEndpoint";
import axios from "axios";

export const createUser = (value) => {
  const payload = {
    name: value.name,
    email: value.email,
    password: value.password,
  };
  return axios.post(generateUrl(APP_ENPOINT.createUser), { ...payload });
};

export const userLogin = (value) => {
  const payload = {
    email: value.email,
    password: value.password,
  };
  return axios.post(generateUrl(APP_ENPOINT.userLogin), { ...payload });
};

export const forgotPassword = (value) => {
  const payload = {
    email: value.email,
  };
  return axios.post(generateUrl(APP_ENPOINT.forgotPassword), { ...payload });
};

export const updatePasswordService = (value) => {
  const payload = {
    oldPassword: value.oldPassword,
    newPassword: value.newPassword,
    confirmPassword: value.confirmPassword,
  };
  const token = localStorage.getItem("token");

  return axios.put(
    generateUrl(APP_ENPOINT.updatePasswordService),
    {
      ...payload,
    },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateProfileService = (value) => {
  const newUserData = {
    name: value.name,
    email: value.email,
  };
  const token = localStorage.getItem("token");
  return axios.put(
    generateUrl(APP_ENPOINT.updateProfileService),
    {
      ...newUserData,
    },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

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
