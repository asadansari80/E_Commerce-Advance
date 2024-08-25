import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CreateProductReviewAPI,
  getProductDetails,
} from "../../Service/ProductService";
import { Button, TextField, Typography } from "@mui/material";
import Navbar2 from "../Navbar/Navbar2";
import QuantitySelector from "../../Component/QuantitySelector";
import { useDispatch } from "react-redux";
import { addProductInCart } from "../../Redux/cartSlice";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import ProductReview from "../ProductReview/ProductReview";
import ProductReviewWrapper from "../ProductReviewWrapper/ProductReviewWrapper";

const ProductPage = () => {
  // console.log(props,"frf");
  const [productDetail, setProductDetail] = useState({});
  // console.log(productDetail, "ttt");
  const [message, setMessage] = useState("");
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [quantity, setQuantity] = useState(1);
  // console.log(review,"112");

  // const [cart, setCart] = useState({});
  // console.log(productDetail, "vv");
  const params = useParams();

  useEffect(() => {
    getProductDetails(params.productId)
      .then((response) => {
        // console.log(response.data.product, "dd");
        setProductDetail(response.data.product);
      })
      .catch((error) => {});
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addProductInCart({ productId: params.productId, quantity: quantity })
    );
    console.log(quantity, "sssss");
  };

  const handleSubmitReview = () => {
    CreateProductReviewAPI(star, review, params.productId)
      .then((response) => {
        // console.log(response, "sdfef");
        setStar(0);
        setReview("");
        getProductDetails(params.productId)
          .then((response) => {
            // console.log(response.data.product, "dd");
            setProductDetail(response.data.product);
          })
          .catch((error) => {
            // console.log(error, "rett");
            toast.error("product not found");
          });
      })
      .catch((error) => {});
  };

  return (
    <Box>
      <Box>
        <Navbar2 />
      </Box>
      <Box
        display="flex"
        justifyContent="left"
        paddingLeft="30px"
        paddingTop="30px"
        marginTop={8}
      >
        <Box borderRight="2px solid lightgray" paddingRight="40px">
          <img src="/image/shirt.jpg" height="520px" />
        </Box>
        <Box paddingTop="30px" paddingLeft="40px">
          <Typography
            variant="h4"
            fontSize="22px"
            color="green"
            fontWeight="bold"
          >
            {productDetail.name}
          </Typography>
          <Typography variant="subtitle1" color="GrayText" fontSize="14px">
            {productDetail.description}
          </Typography>

          <Typography
            variant="h5"
            color="darkgreen"
            fontSize="16px"
            fontWeight="bold"
            // paddingBottom={2}
            // borderBottom="1px solid lightgray"
          >
            Rs-{productDetail.price}
          </Typography>
          <Box borderBottom="1px solid lightgray">
            <StarRatings
              // rating={star}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="3px"
              name="rating"
            />
          </Box>
          <Typography
            variant="subtitle1"
            color="GrayText"
            fontSize="14px"
            paddingTop={1}
          >
            {productDetail.category}
          </Typography>
          <Typography
            variant="subtitle1"
            color="orange"
            fontSize="14px"
            fontWeight={productDetail.Stock <= 5 ? 800 : 500}
          >
            {productDetail.Stock >= 5
              ? "In Stock"
              : ` Only ${productDetail.Stock} Left`}
          </Typography>
          <Typography varient="subtitle1" fontSize="12px" color="error">
            {message}
          </Typography>
          <Box>
            <QuantitySelector
              maxQuantity={productDetail.Stock}
              setMessage={setMessage}
              setQuantity={setQuantity}
              quantity={quantity}
            />
          </Box>

          <Box paddingTop={1}>
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: "gold",
                fontWeight: "bold",
                color: "white",
                "&:hover": {
                  backgroundColor: "gold",
                  color: "black",
                },
              }}
              onClick={(event) => {
                // console.log(event,"rr");
                handleAddToCart();
              }}
            >
              Add to cart
            </Button>
          </Box>
          <Box borderTop="1px solid lightgray" marginTop={3}>
            <Box marginTop={2}>
              <StarRatings
                rating={star}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="3px"
                name="rating"
                changeRating={(rating) => {
                  // console.log(rating,"lll");
                  setStar(rating);
                }}
              />
            </Box>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 2,
              }}
            >
              <TextField
                review={review}
                value={review}
                id="product-review"
                label="Write your review"
                placeholder="Share your thoughts about the product..."
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  // console.log(event.target.value, "ede");
                  setReview(event.target.value);
                }}
              />
              <Button
                variant="contained"
                type="button"
                sx={{
                  backgroundColor: "gold",
                  fontWeight: "bold",
                  color: "white",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "gold",
                    color: "black",
                  },
                }}
                onClick={(value) => {
                  handleSubmitReview();
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Box marginTop={2}>
            <ProductReviewWrapper review={productDetail.reviews} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
