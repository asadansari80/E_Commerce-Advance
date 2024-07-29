import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductApi } from "../../Service/ProductService";

const CreateProduct = () => {
  const Category = ["Shirt", "T-shirt", "Jeans", "Trouser", "Jacket"];
  const navigate = useNavigate();
  const handleCreate = (value, resetForm) => {
    console.log(value, "accca");
    createProductApi(value)
      .then((response) => {
        toast.success("New Product has been Added Successfully");
        // navigate("/");
        resetForm();
      })
      .catch((error) => {});
  };
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
        flexDirection="column"
        height="100vh"
      >
        <Formik
          initialValues={{
            productName: "",
            description: "",
            category: "",
            stock: "",
            price: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value, formAction) => {
            // console.log(formAction, "ll");
            handleCreate(value, formAction.resetForm);
          }}
        >
          <Form>
            <Typography variant="h4" color="blue" fontFamily="monospace">
              Add New Product
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
                // component={Select}
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
            <Box>
              {" "}
              <Stack spacing={2} direction="row">
                <Button variant="contained" type="submit" as={Button}>
                  Add Product
                </Button>
              </Stack>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateProduct;
