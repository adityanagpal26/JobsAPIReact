import React from "react";
import logo from "../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { LiaUserCircleSolid } from "react-icons/lia";
import { logoutUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { name, token:user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient= useQueryClient();  
  const logout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/");
      toast.success("Logout successful");
      await queryClient.removeQueries();
    } catch (error) {
      toast.error(error?.error?.message || "An error occurred");
    }
  };
  return (
    <div className="navbar bg-base-100 mt-6">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" />
        </a>
      </div>
      {user && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1  ">
            <li>
              <details>
                <summary className="bg-primary text-primary-content font-semibold hover:text-primary flex items-center">
                  <LiaUserCircleSolid className="text-2xl" />
                  <span>{name.split(" ")[0]}</span>
                </summary>
                <ul className="py-2  bg-base-100 rounded-t-none flex items-center justify-center w-full">
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
