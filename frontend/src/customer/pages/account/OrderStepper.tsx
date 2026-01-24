import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  { name: "Order Placed", description: "on Monday, 30 Sep", value: "PLACED" },
  { name: "Packed", description: "Item packed in warehouse", value: "PACKED" },
  { name: "Shipped", description: "on Tuesday, 01 Oct", value: "SHIPPED" },
  { name: "Arriving", description: "on Friday, 04 Oct", value: "ARRIVING" },
  { name: "Arrived", description: "Delivered", value: "DELIVERED" },
];

const cancelStep = [
  { name: "Order Placed", description: "on Monday, 30 Sep", value: "PLACED" },
  {
    name: "Order Cancelled",
    description: "Cancelled on Tuesday, 01 Oct",
    value: "CANCELLED",
  },
];

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancelStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  const currentStep = 2;

  return (
    <div className="mx-auto my-10">
      {statusStep.map((step, index) => (
        <div key={index} className="flex px-4">
          <div className="flex flex-col items-center">
            <div
              className={`z-10 rounded-full flex items-center justify-center 
                            ${index <= currentStep ? "bg-gray-200 text-teal-500" : "bg-gray-100 text-gray-400"}`}
            >
              {step.value === orderStatus ? (
                <CheckCircleIcon />
              ) : (
                <FiberManualRecordIcon sx={{ fontSize: "1.1rem" }} />
              )}
            </div>

            {index < statusStep.length - 1 && (
              <div
                className={`h-20 w-[2px] ${index < currentStep ? "bg-teal-500" : "bg-gray-300"}`}
              ></div>
            )}
          </div>

          <div className="ml-2 w-full">
            <p
              className={`${step.value === orderStatus ? "text-primary-color font-medium" : "text-gray-500"}`}
            >
              {step.name}
            </p>
            <p className="text-xs opacity-70">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStepper;
