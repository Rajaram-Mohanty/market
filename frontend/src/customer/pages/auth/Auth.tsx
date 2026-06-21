import React, { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Button } from "@mui/material";
import loginImage from "../../../assets/login.png";
import { useAppDispatch } from "../../../state/store";
import { clearOtpSent } from "../../../state/authSlice";

type AuthView = "login" | "register" | "forgot";

const Auth = () => {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<AuthView>("login");

  // Clean up forgot-password state whenever the view changes away from it
  useEffect(() => {
    if (view !== "forgot") {
      dispatch(clearOtpSent());
    }
  }, [view]);

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
          {/* Main form area */}
          <div>
            {view === "login" && (
              <LoginForm onForgotPassword={() => setView("forgot")} />
            )}
            {view === "register" && <RegisterForm />}
            {view === "forgot" && (
              <ForgotPasswordForm onBackToLogin={() => setView("login")} />
            )}
          </div>

          {/* Footer toggle — only show when not in forgot-password flow */}
          {view !== "forgot" && (
            <div className="flex items-center gap-1 justify-center mt-6 border-t pt-6">
              <p className="text-gray-600 text-sm">
                {view === "login" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                size="small"
                onClick={() => setView(view === "login" ? "register" : "login")}
                sx={{ fontWeight: "600", textTransform: "none" }}
              >
                {view === "login" ? "Create Account" : "Login"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
