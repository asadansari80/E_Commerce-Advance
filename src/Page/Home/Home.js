import { Box, Container } from "@mui/material";
import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import AdminProductTable from "../AdminProductTable/AdminProductTable";
import ProductCard from "../ProductCard/ProductCard";
import ProductWrapper from "../ProductWrapper/ProductWrapper";

const Home = () => {
  const token = localStorage.getItem("token");

  const userDetails = localStorage.getItem("user");
  // console.log(userDetails, "ff");

  const parseUserDetails = JSON.parse(userDetails || "{}");
  // console.log(parseUserDetails, "aa");
  return (
    <Container maxWidth={false} style={{ width: "100%" }}>
      {/* <Navbar /> */}
      <Navbar2 />
      <Box margin={12}>
        {token ? (
          parseUserDetails.role === "admin" ? (
            <AdminProductTable />
          ) : (
            <Box>
              <ProductWrapper />
            </Box>
          )
        ) : (
          "please Login to get content"
        )}
      </Box>
    </Container>
  );
};

export default Home;
