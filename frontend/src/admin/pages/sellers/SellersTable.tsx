import React, { useEffect, useState } from "react";
import {
  Paper,
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
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchSellers, updateSellerStatus } from "../../../state/seller/sellerSlice";

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

const accountStatuses = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

const SellerTable = () => {
  const [statusFilter, setStatusFilter] = useState("PENDING_VERIFICATION");
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store.seller);

  useEffect(() => {
    dispatch(fetchSellers(statusFilter !== "ALL" ? statusFilter : ""));
  }, [statusFilter, dispatch]);

  const handleStatusChange = (sellerId: number, newStatus: string) => {
    dispatch(updateSellerStatus({ id: sellerId, status: newStatus }));
  };

  return (
    <div className="pb-5 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Manage Sellers</h1>
        <FormControl sx={{ width: 250 }}>
          <InputLabel>Filter By Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter By Status"
            onChange={(e) => setStatusFilter(e.target.value as string)}
          >
            <MenuItem value="ALL">All Statuses</MenuItem>
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Seller Name</StyledTableCell>
                <StyledTableCell align="center">Business Email</StyledTableCell>
                <StyledTableCell align="center">GSTIN</StyledTableCell>
                <StyledTableCell align="center">Mobile</StyledTableCell>
                <StyledTableCell align="center">Account Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers?.map((seller: any) => (
                <StyledTableRow key={seller.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {seller.sellerName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{seller.email}</StyledTableCell>
                  <StyledTableCell align="center" className="font-mono">{seller.GSTIN}</StyledTableCell>
                  <StyledTableCell align="center">{seller.mobile}</StyledTableCell>
                  <StyledTableCell align="center">
                    <FormControl size="small" sx={{ width: 180 }}>
                      <Select
                        value={seller.accountStatus}
                        onChange={(e) => handleStatusChange(seller.id, e.target.value)}
                        className={`text-xs font-semibold ${
                          seller.accountStatus === "ACTIVE"
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {accountStatuses.map((item) => (
                          <MenuItem key={item.status} value={item.status}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default SellerTable;
