import React from "react";
import { Radio } from "@mui/material";
import type { Address } from "../../types/userTypes";

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selected,
  onSelect,
}) => {
  const { name, address: line1, city, state, pinCode, locality, mobile } =
    address as any;

  return (
    <div className="p-5 border rounded-md flex">
      <div className="flex items-center gap-3">
        <Radio checked={selected} onChange={onSelect} />
      </div>

      <div className="space-y-3 pt-3">
        <h1>{name}</h1>
        <p className="w[320px]">
          {[line1, locality, city, state].filter(Boolean).join(", ")}{" "}
          {pinCode}
        </p>
        <p>
          <strong>Mobile Number: </strong>
          {mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;