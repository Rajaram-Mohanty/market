import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchTransactionsBySeller } from "../../../state/seller/transactionSlice";

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

export default function TransactionTable() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Customer Details</StyledTableCell>
            <StyledTableCell align="center">Order</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.transactions?.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {item.date}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.customer?.email}
              </StyledTableCell>
              <StyledTableCell align="center">{item.order?.id}</StyledTableCell>
              <StyledTableCell align="center">
                {item.order?.totalSellingPrice}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
