import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // console.log("inside logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Box
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </Box>
  );
};

export const Setting = () => {
  const navigate = useNavigate();

  const handleSetting = () => {
    navigate("/setting");
  };
  return (
    <Box
      onClick={() => {
        handleSetting();
      }}
    >
      Setting
    </Box>
  );
};
