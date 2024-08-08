export const BASE_URL = "http://localhost:8080/api/v1";
export const APP_ENPOINT = {
  createUser: "/register",
  userLogin: "/login",
  forgotPassword: "/password/forgot",
  updatePasswordService: "/password/update",
  updateProfileService: "/me/update",
  createproduct: "/admin/product/new",
  getAdminProducts: "/admin/products",
  getProducts: "/products",
  getProductDetails: "/Product/",
  productUpdate: "/admin/product/",
  productDelete: "/admin/product/",
};

export const generateUrl = (endpoint) => {
  return BASE_URL + endpoint;
};
