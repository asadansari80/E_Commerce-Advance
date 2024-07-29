import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { updateProfileService } from "../Service/UserService";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const ref = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("Provide proper email")
      .required("This field is mandetory"),
  });

  const handleProfileUpdate = (value) => {
    // console.log(value,"tt");
    updateProfileService(value)
      .then((response) => {
        toast.success("Profile updated successfully");
        ref.current.resetForm();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <Container>
      <Box>
        <Formik
          innerRef={ref}
          initialValues={{
            name: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            // console.log(value,"kk");
            handleProfileUpdate(value);
          }}
        >
          <Form>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              flexGrow=""
            >
              <Box>
                {" "}
                <Typography variant="h5" fontWeight="bold" color="blue">
                  Update Profile
                </Typography>
                <Typography color="red">{error}</Typography>
              </Box>
              <Box padding="10px">
                <Field
                  type="text"
                  name="name"
                  lable="Name"
                  varient="outlined"
                  id="outlined-basic"
                  placeholder="Name"
                  as={TextField}
                />
                <ErrorMessage name="name" component="div" />
              </Box>
              <Box padding="10px">
                <Field
                  type="email"
                  name="email"
                  lable="Email"
                  varient="outlined"
                  id="outlined-basic"
                  placeholder="Email"
                  as={TextField}
                />
                <ErrorMessage name="email" component="div" />
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

export default UpdateProfile;
