import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { adminPostLogin } from "../../utils/Constants";
import Swal from "sweetalert2";

import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleadminLogin = async (e) => {
    const body = {
      email,
      password,
    };
    e.preventDefault();

    if (email === "" || password === "") {
      Swal.fire(
        "Please Fill the components?",
        "That thing is still around?",
        "question"
      );
    } else {
      try {
        let admin = await axios.post(adminPostLogin, body, {
          headers: { "Content-Type": "application/json" },
        });
        if (admin.data.status === "ok") {
          console.log(admin);
          console.log(admin["data"].token);
          localStorage.setItem("admin", admin["data"].token);
          navigate("/adminHome");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Credintaials!",
          });
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="loginpage">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="loginForm" onSubmit={(e) => handleadminLogin(e)}>
        <h3 className="tag1">Admin Login</h3>

        <label className="label1" for="username">
          Admin Id
        </label>
        <input
          className="input1"
          type="email"
          placeholder="Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="username"
        />

        <label className="label1" for="password">
          Password
        </label>
        <input
          className="input1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <button className="loginButton" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
