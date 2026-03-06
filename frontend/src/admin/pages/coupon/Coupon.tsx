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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  fetchAllCoupons,
  deleteCoupon,
  updateCoupon,
} from "../../../state/admin/adminCouponSlice";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
  const dispatch = useAppDispatch();
  const { coupon } = useAppSelector((store) => store);
  const jwt = localStorage.getItem("jwt") || "";

  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  // Edit states
  const [editCode, setEditCode] = useState("");
  const [editDiscountPercentage, setEditDiscountPercentage] = useState(0);
  const [editValidityStartDate, setEditValidityStartDate] = useState<any>(null);
  const [editValidityEndDate, setEditValidityEndDate] = useState<any>(null);
  const [editMinimumOrderValue, setEditMinimumOrderValue] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCoupons(jwt));
  }, [dispatch, jwt]);

  const handleDelete = (id: number) => {
    dispatch(deleteCoupon({ id, jwt })).then(() => {
      dispatch(fetchAllCoupons(jwt));
    });
  };

  const handleEditClick = (item: any) => {
    setSelectedCoupon(item);
    setEditCode(item.code);
    setEditDiscountPercentage(item.discountPercentage);
    setEditValidityStartDate(dayjs(item.validityStartDate));
    setEditValidityEndDate(dayjs(item.validityEndDate));
    setEditMinimumOrderValue(item.minimumOrderValue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCoupon(null);
  };

  const handleUpdate = () => {
    if (selectedCoupon) {
      const updatedData = {
        code: editCode,
        discountPercentage: editDiscountPercentage,
        validityStartDate: editValidityStartDate?.toISOString(),
        validityEndDate: editValidityEndDate?.toISOString(),
        minimumOrderValue: editMinimumOrderValue,
      };
      dispatch(
        updateCoupon({ id: selectedCoupon.id, coupon: updatedData, jwt }),
      ).then(() => {
        dispatch(fetchAllCoupons(jwt));
      });
      handleClose();
    }
  };

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
                <StyledTableCell align="center">Coupon Code</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">
                  Min Order Value
                </StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupon.coupons?.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {item.code}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dayjs(item.validityStartDate).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dayjs(item.validityEndDate).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.minimumOrderValue}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.discountPercentage}%
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.active ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleEditClick(item)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Coupon Code"
                fullWidth
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Discount %"
                type="number"
                fullWidth
                value={editDiscountPercentage}
                onChange={(e) =>
                  setEditDiscountPercentage(Number(e.target.value))
                }
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Validity Start Date"
                  value={editValidityStartDate}
                  onChange={(newValue) => setEditValidityStartDate(newValue)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Validity End Date"
                  value={editValidityEndDate}
                  onChange={(newValue) => setEditValidityEndDate(newValue)}
                />
              </Grid>
            </LocalizationProvider>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Minimum Order Value"
                type="number"
                fullWidth
                value={editMinimumOrderValue}
                onChange={(e) =>
                  setEditMinimumOrderValue(Number(e.target.value))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Coupon;
