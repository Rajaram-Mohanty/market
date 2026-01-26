import { Button } from "@mui/material";
import React from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

const tabs = ["Deals", "Category", "Create Deals"];

const Deal = () => {
  const [activeTab, setActiveTab] = React.useState("Deals");

  return (
    <div>
      <div className="flex gap-4">
        {tabs.map((item) => (
          <Button
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "contained" : "outlined"}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab == "Deals" ? (
          <DealTable />
        ) : activeTab == "Category" ? (
          <DealCategoryTable />
        ) : activeTab == "Create Deals" ? (
          <div className="mt-5 flex flex-col justify-center items-center"><CreateDealForm /></div>
        ) : null}
      </div>
    </div>
  );
};

export default Deal;
