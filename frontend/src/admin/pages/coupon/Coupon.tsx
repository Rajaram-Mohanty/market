import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Coupon = () => {
  const [status, setStatus] = useState("ACTIVE");

  return (
    <div className="space-y-5">
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
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Min Order Value</StyledTableCell>
                <StyledTableCell>Discount</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 1, 1, 1].map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    DIWALI2024
                  </StyledTableCell>
                  <StyledTableCell>2024-10-25</StyledTableCell>
                  <StyledTableCell>2024-11-10</StyledTableCell>
                  <StyledTableCell>699</StyledTableCell>
                  <StyledTableCell>70%</StyledTableCell>
                  <StyledTableCell>Active</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Coupon;
