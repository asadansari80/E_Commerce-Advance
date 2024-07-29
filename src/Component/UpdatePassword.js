import React, { useRef, useState } from "react";
import { updatePasswordService } from "../Service/UserService";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const UpdatePassword = () => {
  const [error, setError] = useState("");
  const ref = useRef(null);

  const handleUpdate = (value) => {
    // console.log(value,"uu");
    console.log(ref.current, "xxx");

    updatePasswordService(value)
      .then((response) => {
        toast.success("Password updated successfully");
        ref.current.resetForm();
      })
      .catch((error) => {
        // console.log(error, "www");
        setError(error.response.data.message);
      });
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters long")
      .matches(
        /[a-z]/,
        "New password must contain at least one lowercase letter"
      )
      .matches(
        /[A-Z]/,
        "New password must contain at least one uppercase letter"
      )
      .matches(/[0-9]/, "New password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "New password must contain at least one special character"
      )
      .notOneOf(
        [Yup.ref("oldPassword"), null],
        "New password must be different from the old password"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <Container>
      <Box>
        <Formik
          innerRef={ref}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value, "qq");
            handleUpdate(value);
          }}
        >
          <Form>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" fontWeight="bold" color="blue">
                Update Password
              </Typography>
              <Box padding="10px">
                <Field
                  type="password"
                  id="outlined-basic"
                  lable="Old Password"
                  varient="outlined"
                  name="oldPassword"
                  placeholder="Old Password"
                  as={TextField}
                />
                <ErrorMessage name="oldPassword" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="password"
                  id="outlined-basic"
                  lable="New Password"
                  varient="outlined"
                  name="newPassword"
                  placeholder="New Password"
                  as={TextField}
                />
                <ErrorMessage name="newPassword" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="password"
                  id="outlined-basic"
                  lable="Confirm Password"
                  varient="outlined"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  as={TextField}
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </Box>
              <Button variant="contained" type="submit" as={Button}>
                Update
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};
export default UpdatePassword;
