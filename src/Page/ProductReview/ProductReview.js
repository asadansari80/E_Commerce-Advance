import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import StarRatings from "react-star-ratings";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";
import { DeleteProductReviewAPI } from "../../Service/ProductService";

const ProductReview = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(props.rating);
  const [editedComment, setEditedComment] = useState(props.comment);
  // const [reviews, setReviews] = useState(props.review);
  const param = useParams();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteReview = () => {
    DeleteProductReviewAPI(param.productId, props.id).then((response) => {
      props.onDeleteReview(props.id);
    });
  };

  const handleSave = () => {
    console.log("Saved:", { rating: editedRating, comment: editedComment });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRating(props.rating);
    setEditedComment(props.comment);
    setIsEditing(false);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
          >
            <Typography variant="h6" fontWeight="bold">
              {props.name}
            </Typography>
            <Box>
              <IconButton
                onClick={handleEdit}
                sx={{ marginRight: 1, color: "blue" }}
              >
                <MdOutlineEditNote />
              </IconButton>
              <IconButton onClick={handleDeleteReview} sx={{ color: "blue" }}>
                <FaRegTrashCan />
              </IconButton>
            </Box>
          </Box>

          {isEditing ? (
            <Box>
              <Box marginBottom={1}>
                <StarRatings
                  rating={editedRating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="3px"
                  changeRating={(newRating) => setEditedRating(newRating)}
                />
              </Box>

              <TextField
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                multiline
                fullWidth
                rows={2}
                variant="outlined"
                margin="normal"
              />

              <Box display="flex" justifyContent="flex-end" marginTop={1}>
                <Button onClick={handleCancel} sx={{ marginRight: 1 }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "gold",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "gold",
                      color: "black",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box marginBottom={1}>
                <StarRatings
                  rating={props.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="3px"
                />
              </Box>

              <Typography variant="body2" color="textSecondary">
                {props.comment}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductReview;
