import React from "react";
import { Form, useNavigation } from "react-router-dom";
import { FormInput } from "../components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsMember, setUser } from "../features/user/userSlice";
import logo from "../assets/logo.svg";
import { customFetch } from "../utils/utils";
import {toast} from 'react-toastify';
import {redirect, useNavigate} from 'react-router-dom';
import { useEffect } from "react";


export const action =
  (store) =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      const { isMember } = store.getState().user;
      const response = isMember? await customFetch.post("/login", data) : await customFetch.post("/register", data);
      const {user, token} = await response.data;
      const {name} = user;
      store.dispatch(setUser({name, token}));
      toast.success(`Welcome ${name}`);
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred");
      return redirect('/register')
    }
    
  };

const RegisterPage = () => {
  console.log("RegisterPage");
  const { isMember, token} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const  navigate  = useNavigate();
  const navigation= useNavigation();
  const isSubmitting= navigation.state==='submitting';
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <Form
        className="w-1/2 py-16 px-8  rounded-md flex flex-col items-center justify-center"
        method="post"
      >
        <img src={logo} alt="logo" className=" mb-4" />
        <h2 className="text-2xl mb-2">{isMember ? "Login" : "Register"}</h2>
        {!isMember && (
          <FormInput label="Name" name="name" placeholder="Name" type="input" />
        )}
        <FormInput
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <FormInput
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <button type="submit" className="btn btn-active btn-primary mt-8 w-full" disabled={isSubmitting} >
          {isMember ? "Login" : "Register"} 
        </button>
        <p>
          {isMember ? "Not a member? " : "Already a member? "}
          <button
            type="button"
            className="text-secondary mt-1"
            onClick={() => dispatch(toggleIsMember())}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </Form>
    </section>
  );
};

export default RegisterPage;
