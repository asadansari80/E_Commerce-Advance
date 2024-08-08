import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserAction from "../../Component/UserAction";

// const navigate = useNavigate();
export const columns = [
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
          <UserAction id={row.values._id} />
        </div>
      );
    },
  },
];
