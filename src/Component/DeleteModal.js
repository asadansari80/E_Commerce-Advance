import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import {
  getAdminProductsService,
  productDelete,
} from "../Service/ProductService";
import { toast } from "react-toastify";

const DeleteModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    productDelete(props.id).then((response) => {
      // console.log(response, "ccc");
      toast.success("Product deleted successfully");
      props.delAPI();
    });
    handleClose();
  };

  return (
    <div>
      <Typography variant="contained" color="green" onClick={handleOpen}>
        Delete
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "2px solid lightgray",
            boxShadow: 16,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
