import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductReview from "../ProductReview/ProductReview";
import { ProductReviewAPI } from "../../Service/ProductService";
import { useParams } from "react-router-dom";

const ProductReviewWrapper = () => {
  // console.log(props,"eee");
  const params = useParams();
  const [review, setReview] = useState([]);

  const getProductReviewData = () => {
    ProductReviewAPI(params.productId).then((response) => {
      //   console.log(response, "sss");
      setReview(response.data.reviews);
    });
  };

  useEffect(() => {
    getProductReviewData();
  }, []);

  return (
    <Box>
      {review?.map((data) => {
        return (
          <ProductReview
            name={data.name}
            rating={data.rating}
            comment={data.comment}
            id={data._id}
            onDeleteReview={getProductReviewData}
          />
        );
      })}
    </Box>
  );
};

export default ProductReviewWrapper;
