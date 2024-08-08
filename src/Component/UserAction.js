import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const UserAction = (props) => {
  // console.log(props, "ll");
  const navigate = useNavigate();
  return (
    <Box display="flex">
      <Box
        padding={1}
        sx={{ cursor: "pointer", textDecoration: "underline", color: "green" }}
        onClick={(event) => {
          navigate(`/Product/${props.id}/edit`);
        }}
      >
        Edit
      </Box>
      <Box
        padding={1}
        sx={{ cursor: "pointer", textDecoration: "underline", color: "green" }}
      >
        <DeleteModal
          id={props.id}
          delAPI={props.getAdminProducts}
        />
      </Box>
    </Box>
  );
};

export default UserAction;
