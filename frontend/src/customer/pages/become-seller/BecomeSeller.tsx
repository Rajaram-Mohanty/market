import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 lg:rounded-b-md">
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </h1>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleShowPage}
            sx={{ py: "11px" }}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:flex md:col-span-1 lg:col-span-2 justify-center items-center p-5 space-y-1">
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <h1 className="text-large lg:text-4xl text-primary-color">
              Join the Marketplace Revolution
            </h1>
            <p className="text-lg">Boost your sales today</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            alt="Seller Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
