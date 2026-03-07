import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import {
  fetchSellerProducts,
  deleteProduct,
} from "../../../state/seller/sellerProductSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import type { Product } from "../../../types/productTypes";
import { Button, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerProduct } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
  }, []);

  const handleDelete = (productId: number | undefined) => {
    if (productId) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Images</StyledTableCell>
            <StyledTableCell align="center">Product Title</StyledTableCell>
            <StyledTableCell align="center">MRP</StyledTableCell>
            <StyledTableCell align="center">Selling Price</StyledTableCell>
            <StyledTableCell align="center">Color</StyledTableCell>
            <StyledTableCell align="center">Update Stock</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item: Product) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell align="center" component="th" scope="row">
                <div className="flex gap-1 flex-wrap justify-center">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      className="w-20 rounded-md"
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{item.title}</StyledTableCell>
              <StyledTableCell align="center">{item.mrpPrice}</StyledTableCell>
              <StyledTableCell align="center">
                {item.sellingPrice}
              </StyledTableCell>
              <StyledTableCell align="center">{item.color}</StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small">in_Stock</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/seller/update-product/${item.id}`)}
                >
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(item.id)}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
