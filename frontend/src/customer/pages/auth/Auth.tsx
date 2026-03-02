import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Button } from "@mui/material";

const Auth = () => {

  const[isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="max-w-md h-[85vh] rounded-md shadow-lg">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <div className="mt-8 px-10">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

        
        <div className="flex items-center gap-1 justify-center mt-5">
          <p>{isLogin && "Dont"} have Account</p>
          <Button size="small" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Login"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
