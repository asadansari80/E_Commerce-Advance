import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
// import { columns } from "./mockData"; // Assuming columns are imported from mockData
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAdminProductsService } from "../../Service/ProductService";
import { useNavigate } from "react-router-dom";
import UserAction from "../../Component/UserAction";

const AdminProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const userDetails = localStorage.getItem("user");
  // console.log(userDetails, "ff");

  const parseUserDetails = JSON.parse(userDetails || "{}");
  // console.log(parseUserDetails, "aa");

  useEffect(() => {
    getAdminProducts();
  }, []);

  const getAdminProducts = useCallback(() => {
    console.log("insideeee");

    getAdminProductsService()
      .then((response) => {
        console.log("insideeee");
        setProducts(response.data.products);
      })
      .catch((error) => {
        // console.error(error,"yy");
      });
  }, [setProducts]);

  const columns = useMemo(() => {
    return [
      {
        Header: "Product ID",
        accessor: "_id",
      },
      {
        Header: " Product Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Product Discription",
        accessor: "description",
      },
      {
        Header: "Stock",
        accessor: "Stock",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => {
          // console.log(row.values._id, "www");
          return (
            <div>
              <UserAction
                id={row.values._id}
                getAdminProducts={getAdminProducts}
              />
            </div>
          );
        },
      },
    ];
  }, [getAdminProducts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use 'page' for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 }, // Set default page index
    },
    usePagination // Use pagination plugin hook
  );

  return (
    <Box>
      <Box>
        <Typography fontSize="32px" color="blue" fontFamily="monospace">
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  sx={{ backgroundColor: "lightgreen" }}
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps()}
                      sx={{ fontWeight: "bold", color: "blue" }}
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          sx={{ fontWeight: "light", color: "grey" }}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            startIcon={<ArrowBackIcon />}
          >
            First
          </Button>
          <IconButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography>
            Page {pageIndex + 1} of {pageOptions.length}
          </Typography>
          <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
            <ArrowForwardIcon />
          </IconButton>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            endIcon={<ArrowForwardIcon />}
          >
            Last
          </Button>
          <Box ml={2}>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProductTable;
