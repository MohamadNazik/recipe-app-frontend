import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const baseUrl = import.meta.env.VITE_BACKEND_URI;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [checkEmptyField, setCheckEmptyField] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      return;
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") {
      setCheckEmptyField("email");
      emailRef.current.focus();
      return;
    } else if (password === "") {
      setCheckEmptyField("password");
      passwordRef.current.focus();
      return;
    }

    setCheckEmptyField("");

    setIsLoading(true);

    await axios
      .post(`${baseUrl}/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/home");
          localStorage.setItem("token", res.data.token);
          setError("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        navigate("/");
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[30rem] p-10 flex flex-col items-center rounded-2xl">
        <img src={logo} alt="Logo" className="w-[8rem] mt-10" />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-medium">Login</h1>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                ref={emailRef}
                id="email-input"
                className={`block px-2.5 pb-2.5 pt-4 w-[22rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400 ${
                  checkEmptyField === "email"
                    ? "focus:outline-red-500 outline-red-500 text-red-500"
                    : ""
                }`}
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email-input"
                className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
              >
                Email Address
              </label>
            </div>
            {checkEmptyField && checkEmptyField === "email" ? (
              <span className="text-[0.65rem] -mt-3 text-red-500 font-semibold">
                Please enter a email
              </span>
            ) : null}
            <div className="relative">
              <input
                type="password"
                ref={passwordRef}
                id="password-input"
                className={`block px-2.5 pb-2.5 pt-4 w-[22rem] text-sm text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-gray-400 ${
                  checkEmptyField === "password"
                    ? "focus:outline-red-500 outline-red-500 text-red-500"
                    : ""
                }`}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password-input"
                className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text"
              >
                Password
              </label>
            </div>

            {checkEmptyField && checkEmptyField === "password" ? (
              <span className="text-[0.65rem] -mt-3 text-red-500 font-semibold">
                Please enter a password
              </span>
            ) : null}

            <button
              type="submit"
              className="bg-red-400 text-white font-medium p-2 rounded-md mt-4 w-[22rem] shadow-md"
            >
              SIGN IN
            </button>
          </form>

          {error ? (
            <span className="text-[0.65rem] text-center text-red-500 font-semibold">
              Your password or username is incorrect
            </span>
          ) : null}

          <p className="text-xs text-center mt-8 mb-10">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-red-500 cursor-pointer">
                Create an account
              </span>
            </Link>
          </p>
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default LoginPage;
