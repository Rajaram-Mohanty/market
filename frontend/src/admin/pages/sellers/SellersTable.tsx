import React, { useState } from "react";
import {
  Paper,
  Button,
  styled,
  tableCellClasses,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";



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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const accountStatus = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Seller's account is pending verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Seller's account is active",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Seller's account is suspended",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Seller's account is deactivated",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Seller's account is banned",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Seller's account is closed",
  },
];

const SellerTable = () => {
  const [status, setStatus] = useState("ACTIVE");

  return (
    <div className="pb-5">
      <FormControl fullWidth sx={{ width: 300 }}>
        <InputLabel>Account Status</InputLabel>
        <Select
          value={status}
          label="Account Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          {accountStatus.map((item) => (
            <MenuItem key={item.status} value={item.status}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-5">
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell align="right">Products</StyledTableCell>
                  <StyledTableCell align="right">Shipping Address</StyledTableCell>
                  <StyledTableCell align="right">Order Status</StyledTableCell>
                  <StyledTableCell align="right">Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>


    </div>
  );
};

export default SellerTable;
