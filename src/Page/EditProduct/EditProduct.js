import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { getProductDetails, productUpdate } from "../../Service/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "../Navbar/Navbar2";
import { toast } from "react-toastify";

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [initialState, setinitialState] = useState(null);
  //   console.log(initialState, "qqq");

  useEffect(() => {
    getProductDetails(params.productId).then((response) => {
      // console.log(response.data.product, "www");
      setinitialState(response.data.product);
    });
  }, []);

  const handleUpdate = (value) => {
    productUpdate(value, params.productId).then((response) => {
      // console.log(response, "5515");
      toast.success("product updated successfully")
      navigate("/");
    });
  };

  const Category = ["Shirt", "T-shirt", "Jeans", "Trouser", "Jacket"];
  const validationSchema = Yup.object({
    productName: Yup.string()
      .min(3)
      .max(120)
      .required("This field is required"),
    description: Yup.string()
      .min(3)
      .max(120)
      .required("This field is required"),
    category: Yup.string().required("This field is required"),
    stock: Yup.number()
      .min(1)
      .max(9999, "Stock cannot exceed 4 characters")
      .required("Stock is required"),
    price: Yup.number().min(1).max(9999).required("This field is required"),
  });
  const NoSpinnerTextField = styled(TextField)({
    "input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button":
      {
        "-webkit-appearance": "none",
        margin: 0,
      },
  });
  return (
    <Box>
      <Box>
        <Navbar2 />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        marginTop={10}
      >
        {initialState ? (
          <Formik
            initialValues={{
              productName: initialState.name,
              description: initialState.description,
              category: initialState.category,
              stock: initialState.Stock,
              price: initialState.price,
            }}
            validationSchema={validationSchema}
            onSubmit={(value) => {
              //   console.log(value,"ddd");
              handleUpdate(value);
            }}
          >
            <Form>
              {" "}
              <Typography variant="h4" color="blue" fontFamily="monospace">
                Edit Product
              </Typography>
              <Box padding="10px">
                <Field
                  type="text"
                  name="productName"
                  varient="filled"
                  id="filled-basic"
                  lable="Name"
                  placeholder="Product Name"
                  as={TextField}
                />
                <ErrorMessage name="productName" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="text"
                  name="description"
                  varient="filled"
                  id="filled-basic"
                  lable="Description"
                  placeholder="Product Discription"
                  as={TextField}
                />
                <ErrorMessage name="description" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="string"
                  name="category"
                  varient="filled"
                  id="filled-basic"
                  lable="Category"
                  placeholder="Select Category"
                  component={Select}
                  as={Select}
                >
                  <ErrorMessage name="category" component="div" />
                  {Category.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Field>
              </Box>
              <Box padding="10px">
                <Field
                  type="number"
                  name="price"
                  varient="filled"
                  id="filled-basic"
                  lable="Price"
                  placeholder="Price"
                  as={NoSpinnerTextField}
                />
                <ErrorMessage name="price" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="number"
                  name="stock"
                  varient="filled"
                  id="filled-basic"
                  lable="Stock"
                  placeholder="Stock"
                  as={NoSpinnerTextField}
                />
                <ErrorMessage name="stock" component="div" />
              </Box>
              <Box textAlign="center">
                <Button type="submit" variant="contained" as={Button}>
                  update
                </Button>
              </Box>
            </Form>
          </Formik>
        ) : null}
      </Box>
    </Box>
  );
};

export default EditProduct;
