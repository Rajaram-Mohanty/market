import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../state/store";
import { useEffect } from "react";
import { paymentSuccess } from "../../state/customer/orderSlice";
import { Button } from "@mui/material";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const location = useLocation();

  // Helper to get query parameters (payment_id and payment_link_id)
  const getQueryParam = (key: string) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");

    dispatch(
      paymentSuccess({ jwt: localStorage.getItem("jwt") || "",
        paymentId: paymentId || "",
        paymentLinkId: paymentLinkId || ""
      })
    )
  }, [orderId, location.search]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Congratulations!</h1>
        <h2 className="text-2xl font-semibold text-center">
          Your order was successful!
        </h2>
        <div>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="secondary"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
