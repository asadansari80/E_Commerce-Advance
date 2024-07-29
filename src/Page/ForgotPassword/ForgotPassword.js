import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { forgotPassword } from "../../Service/UserService";

const ForgotPassword = () => {
  const handleSubmit = (value) => {
    console.log(value, "dd");
    forgotPassword(value)
      .then((response) => {
        // console.log(response,"22");
      })
      .catch((error) => {});
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Provide proper email")
      .required("This field is mandetory"),
  });
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value, "xxs");
            handleSubmit(value);
          }}
        >
          <Form>
            <Typography color="blue" variant="h5">
              Forgot Password
            </Typography>
            <Box padding="10px">
              <Field
                type="text"
                name="email"
                lable="Email"
                varient="filled"
                id="filled-basic"
                placeholder="enter your email"
                as={TextField}
              />
              <ErrorMessage name="email" component="div" />
            </Box>
            <Box mt={2} mb={2} padding="10px">
              <Button type="submit" variant="outlined">
                {" "}
                submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
