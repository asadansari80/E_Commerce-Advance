import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getProductDetails } from "../Service/ProductService";

const QuantitySelector = (props) => {
  // console.log(props, "ddd");

  const handleIncrease = () => {
    // console.log(
    //   props.quantity > quantity,
    //   "mm",
    //   props.quantity,
    //   "nn",
    //   quantity,
    //   "kk"
    // );
    if (props.quantity < props.maxQuantity && props.quantity < 4) {
      props.setQuantity((prevQuantity) => prevQuantity + 1);
      props.setMessage("");
    } else {
      props.setMessage("You can have maximum of 4");
    }
  };
  const handleDecrease = () => {
    if (props.quantity > 1 && props.quantity - 1) {
      props.setQuantity((prevQuantity) => prevQuantity - 1);
      props.setMessage("");
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="outlined"
        onClick={handleDecrease}
        sx={{
          minWidth: "40px",
          paddingX: "10px",
          color: "blue",
          borderColor: "blue",
          "&:hover": {
            backgroundColor: "lightblue",
            borderColor: "blue",
          },
        }}
      >
        -
      </Button>
      <Typography
        sx={{ marginX: "10px", minWidth: "40px", textAlign: "center" }}
      >
        {props.quantity}
      </Typography>
      <Button
        variant="outlined"
        onClick={handleIncrease}
        sx={{
          minWidth: "40px",
          paddingX: "10px",
          color: "blue",
          borderColor: "blue",
          "&:hover": {
            backgroundColor: "lightblue",
            borderColor: "blue",
          },
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default QuantitySelector;
