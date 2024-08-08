import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth.js";
import { logout } from "../../features/authSlice.js";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    navigate("/");
  };

  return (
    <button onClick={logoutHandler} className={`${className}`}>
      Logout
    </button>
  );
};

export default LogoutButton;
