import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { userLogin } from "../../Service/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/usersSlice";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgetPassword = () => {
    navigate("/forgotpassword");
  };
  const handleLogin = (value) => {
    // console.log(value,"yy");
    userLogin(value)
      .then((response) => {
        // console.log(response, "www");
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      })
      .catch((error) => {
        // console.log(error, "cc");
        setError(error.response.data.message);
      });
  };

  const validationSchema = Yup.object({
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
  });
  return (
    <Container>
      <Box>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            handleLogin(value);
          }}
        >
          <Form>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              height="100vh"
            >
              <Typography variant="h4" fontWeight="bold" color="blue">
                SignIn
              </Typography>
              <Typography color="orangered">{error}</Typography>
              <Box padding="10px">
                <Field
                  type="text"
                  name="email"
                  lable="Email"
                  varient="filled"
                  id="filled-basic"
                  placeholder="email"
                  as={TextField}
                />
                <ErrorMessage name="email" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="password"
                  name="password"
                  lable="Password"
                  varient="filled"
                  id="filled-basic"
                  placeholder="password"
                  as={TextField}
                />
                <ErrorMessage name="password" component="div" />
              </Box>
              <Box>
                <Typography
                  onClick={handleForgetPassword}
                  color="orangered"
                  variant="subtitle2"
                  style={{ cursor: "pointer" }}
                >
                  Forget Password ?
                </Typography>
              </Box>
              <Box mt={2} mb={2}>
                <Button type="submit" variant="outlined" color="primary">
                  Sign In
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
