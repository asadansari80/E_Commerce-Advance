import { Box, Container } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Navbar2 from "../Navbar/Navbar2";
import AdminProductTable from "../AdminProductTable/AdminProductTable";

const Home = () => {
  return (
    <Container maxWidth={false} style={{ width: "100%" }}>
      {/* <Navbar /> */}
      <Navbar2 />
      <Box margin={12}>
        <AdminProductTable />
      </Box>
    </Container>
  );
};

export default Home;
