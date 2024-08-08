import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { getProductsService } from "../../Service/ProductService";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const categoryItem = ["", "Shirt", "T-Shirt", "Jeans", "Trousers", "Jakets"];
const ProductWrapper = () => {
  const [productData, setProductData] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState({ minPrice: "", maxPrice: "" });
  console.log(price);

  const getProductFromBackend = (pageNo, search, category, price) => {
    getProductsService(pageNo, search, category, price)
      .then((response) => {
        // console.log(response, "ee");
        setProductData(response.data);
      })
      .catch((error) => {});
  };

  const handleSearch = (value) => {
    getProductFromBackend(1, value, category, price);
    setSearch(value);
    setPageNo(1);
  };

  const handleCategory = (category) => {
    // console.log(value);
    setCategory(category);
    getProductFromBackend(1, search, category, price);
    setPageNo(1);
  };

  const handleApply = () => {
    // console.log(price);
    getProductFromBackend(1, search, category, price);
    setPageNo(1);
  };

  const handleClear = () => {
    setPageNo(1);
    setSearch("");
    setCategory("");
    setPrice({ minPrice: "", maxPrice: "" });
    getProductFromBackend(pageNo, "", "", "");
  };

  useEffect(() => {
    getProductFromBackend(pageNo);
  }, []);

  const handleChangePage = (event, pageNo) => {
    setPageNo(pageNo);
    // console.log(pageNo, "nn");
    getProductFromBackend(pageNo, search, category, price);
  };

  return (
    <Box marginTop={10}>
      <Box>
        <Box display="flex" justifyContent="space-around" alignContent="center">
          <Box>
            {" "}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Product"
                inputProps={{ "aria-label": "search product" }}
                onChange={(event) => {
                  // console.log(event.target.value, "ff");
                  handleSearch(event.target.value);
                }}
                value={search}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categoryItem}
              sx={{ width: 400 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={(event, newValue) => {
                // console.log(newValue,"ee");
                handleCategory(newValue);
              }}
              value={category}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" paddingLeft={6}>
          {" "}
          <Typography
            variant="h3"
            fontFamily="monospace"
            fontSize="20px"
            color="blue"
            fontWeight="bold"
          >
            {" "}
            Price
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Price"
              placeholder="MIN price"
              variant="outlined"
              onChange={(event) => {
                console.log(event.target.value, "zz");
                setPrice({ ...price, minPrice: event.target.value });
              }}
              value={price.minPrice}
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Price"
              placeholder="MAX price"
              variant="outlined"
              onChange={(event) => {
                // console.log(event.target.value, "jj");
                setPrice({
                  ...price,
                  maxPrice: event.target.value,
                });
              }}
              value={price.maxPrice}
            />
          </Box>
          <Box display="flex" padding={1}>
            <Box padding={1}>
              <Button
                type="submit"
                variant="contained"
                onClick={(value) => {
                  handleApply();
                }}
              >
                Apply
              </Button>
            </Box>
            <Box padding={1}>
              {" "}
              <Button
                type="reset"
                variant="contained"
                onClick={(event) => {
                  handleClear(event);
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        marginTop={4}
        justifyContent={"space-around"}
      >
        {productData.products?.map((data) => {
          // console.log(data,"cc");
          return (
            <Box>
              <ProductCard
                name={data.name}
                description={data.description}
                price={data.price}
                category={data.category}
              />
            </Box>
          );
        })}
      </Box>
      <Box padding={2}>
        <Stack spacing={10}>
          <Pagination
            count={Math.ceil(
              productData.filteredProductsCount / productData.resultPerPage
            )}
            color="primary"
            page={pageNo}
            onChange={(event, value) => {
              //   console.log(value, "ee");
              handleChangePage(event, value);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductWrapper;
