import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import * as Yup from "yup";
import { createUser } from "../../Service/UserService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [upload, setUpload] = useState(null);
  //   console.log(upload, "aaa");

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required("This field is mandetory"),
    email: Yup.string()
      .email("Provide proper email")
      .required("This field is mandetory"),
    password: Yup.string()
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      )
      .min(8, "Password must be at least 8 characters long.")
      .max(12, "Password cannot be longer than 12 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });
  const handleSubmit = (value) => {
    // console.log(value,"101");
    createUser(value)
      .then((response) => {
        // console.log(response.data, "ll");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      })
      .catch((error) => {
        // console.log(error, "jjj");
        setError(error.response.data.message);
      });
  };

  return (
    <Container>
      <Box>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value,"rrr");
            handleSubmit(value);
          }}
        >
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              height="100vh"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" fontWeight="bold" color="blue">
                SignUp
              </Typography>
              <Typography color="red">{`${
                error ? `!!Error ${error}!!` : ""
              }`}</Typography>
              <Box padding="10px">
                <Field
                  type="text"
                  id="filled-basic"
                  lable="Name"
                  varient="filled"
                  name="name"
                  placeholder="Name"
                  as={TextField}
                />
                <ErrorMessage name="name" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="text"
                  id="filled-basic"
                  lable="Email"
                  varient="filled"
                  name="email"
                  placeholder="Email"
                  as={TextField}
                />
                <ErrorMessage name="email" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="password"
                  id="filled-basic"
                  lable="Password"
                  varient="filled"
                  name="password"
                  placeholder="password"
                  as={TextField}
                />
                <ErrorMessage name="password" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="password"
                  id="filled-basic"
                  lable="Confirm Password"
                  varient="filled"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  as={TextField}
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </Box>
              <Box padding="10px">
                <input
                  onChange={(e) => {
                    setUpload(e.target.files[0]);

                    // console.log(e.target.files,"144");
                  }}
                  type="file"
                />
                {/* <Button
                  type="button"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                </Button> */}
              </Box>
              <Box>
                <Button variant="contained" type="submit" as={Button}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
