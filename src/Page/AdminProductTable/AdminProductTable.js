import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { columns, data } from "./mockData";
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
} from "@mui/material";
import { getProducts } from "../../Service/ProductService";

const AdminProductTable = () => {
  const [products, setproducts] = useState([]);
  // console.log(products,"rr");
  useEffect(() => {
    getAdminProducts();
  }, []);
  const getAdminProducts = () => {
    getProducts()
      .then((response) => {
        //   console.log(response, "kk");
        setproducts(response.data.products);
      })
      .catch((error) => {});
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
      data: products,
    });

  return (
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
            {rows.map((row, i) => {
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
    </Box>
  );
};

export default AdminProductTable;
