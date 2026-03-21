import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchSellerReport } from "../../../state/seller/sellerSlice";
import { Card, Divider, Button } from "@mui/material";
import TransactionTable from "./Transaction";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <div>
      <Card className="rounded-md space-y-4 p-5">
        <h1 className="text-gray-600 font-medium">Total Earning</h1>
        <h1 className="font-bold text-xl pb-1">₹{seller.report?.totalEarning || 0}</h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment: <strong>₹{seller.report?.netEarnings || 0}</strong>
        </p>
      </Card>
      <div className="mt-20 flex flex-col gap-3">
        <Button variant="contained" className="w-fit">
          Transactions
        </Button>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
