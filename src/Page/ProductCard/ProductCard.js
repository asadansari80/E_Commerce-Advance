import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

const ProductCard = (props) => {
  //   console.log(props, "ff");
  return (
    <Box sx={{ width: 400, padding: "8px", margin: "2px" }}>
      <Card variant="outlined">
        {" "}
        <React.Fragment>
          <CardContent>
            <Typography
              variant="h3"
              fontSize="16px"
              fontWeight="700"
              fontFamily="monospace"
              color="blue"
              gutterBottom
            >
              {props.name}
            </Typography>
            <Typography variant="h3" fontSize="14px" fontFamily="monospace">
              {props.description}{" "}
            </Typography>
            <Typography variant="h3" fontSize="14px" fontFamily="monospace">
              {props.category}
            </Typography>
            <Typography
              variant="h3"
              fontSize="14px"
              fontFamily="monospace"
              fontWeight="700"
              color="blue"
            >
              Rs {props.price}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default ProductCard;
