import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Button } from "@mui/material";
import loginImage from "../../../assets/login.png";

const Auth = () => {

  const[isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex justify-center items-center h-[95vh] bg-gray-50">
      <div className="max-w-md w-full rounded-xl shadow-2xl overflow-hidden bg-white">
        <div className="h-64 relative">
          <img
            className="w-full h-full object-cover"
            src={loginImage}
            alt="Auth Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="px-10 py-10">
          <div>{isLogin ? <LoginForm /> : <RegisterForm />}</div>

          <div className="flex items-center gap-1 justify-center mt-6 border-t pt-6">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              size="small"
              onClick={() => setIsLogin(!isLogin)}
              sx={{ fontWeight: "600", textTransform: "none" }}
            >
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
