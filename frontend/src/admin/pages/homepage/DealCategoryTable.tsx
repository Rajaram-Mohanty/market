import { useFormik } from "formik";
import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../state/store";

const DealCategoryTable = () => {
  const { home } = useAppSelector((store) => store);

  return (
    <div>
      <HomeCategoryTable data={home.homePageData?.dealCategories || []} />
    </div>
  );
};

export default DealCategoryTable;
