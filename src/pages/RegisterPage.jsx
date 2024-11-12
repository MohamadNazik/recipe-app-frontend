import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const baseUrl = import.meta.env.VITE_BACKEND_URI;

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      return;
    }
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      confirmPasswordRef.current.focus();
      return;
    }

    setError(false);

    setIsLoading(true);

    await axios
      .post(`${baseUrl}/user/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/");
          document.querySelector("form").reset();
          setErrMsg("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrMsg(err.response.data.errors[0].msg);
          setIsLoading(false);
        } else {
          setErrMsg(err.response.data.message);
          navigate("/register");
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[50rem] p-10 flex flex-col items-center rounded-2xl">
        <img src={logo} alt="Logo" className="w-[8rem] mt-10" />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-medium">Register</h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="relative">
                <input
                  type="text"
                  id="firstName-input"
                  className="block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                  htmlFor="firstName-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Your Name*
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="lastName-input"
                  className="block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  htmlFor="lastName-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="relative">
                <input
                  type="email"
                  id="email-input"
                  className="block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Email*
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="phoneNumber-input"
                  className="block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400"
                  placeholder=" "
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label
                  htmlFor="phoneNumber-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Phone Number*
                </label>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="relative">
                <input
                  type="password"
                  id="password-input"
                  className="block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Password*
                </label>
              </div>
              <div className="relative flex flex-col">
                <input
                  type="password"
                  ref={confirmPasswordRef}
                  id="confirmPassword-input"
                  className={`block px-2.5 pb-2.5 pt-4 w-[16rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400 ${
                    error
                      ? "focus:outline-red-500 outline-red-500 text-red-500"
                      : ""
                  }`}
                  placeholder=" "
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  htmlFor="confirmPassword-input"
                  className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
                >
                  Confirm Password*
                </label>
                {error ? (
                  <span className="text-[0.65rem] mt-3 text-red-500 font-semibold">
                    The password does not match
                  </span>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-400 text-white font-medium p-2 rounded-md mt-4 w-[10rem] shadow-md"
            >
              Create Account
            </button>
          </form>

          {errMsg ? (
            <span className="text-[0.65rem] text-center text-red-500 font-semibold">
              {errMsg}
            </span>
          ) : null}

          <p className="text-xs text-center mt-8 mb-10">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-red-500 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default RegisterPage;
