import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const steps = [
  { name: "PENDING", description: "Order is pending", value: "PENDING" },
  { name: "PLACED", description: "Order has been placed", value: "PLACED" },
  { name: "CONFIRMED", description: "Order has been confirmed", value: "CONFIRMED" },
  { name: "SHIPPED", description: "Order has been shipped", value: "SHIPPED" },
  { name: "DELIVERED", description: "Order has been delivered", value: "DELIVERED" },
  { name: "CANCELLED", description: "Order has been cancelled", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus }: any) => {
  const currentStep = steps.findIndex((step) => step.value === orderStatus);

  return (
    <div className="mx-auto my-10">
      {steps.map((step, index) => (
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

            {index < steps.length - 1 && (
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
