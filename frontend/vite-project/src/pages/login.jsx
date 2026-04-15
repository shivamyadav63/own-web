import React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";


const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ PRODUCTION API URL (Render backend)
      const url = `${import.meta.env.VITE_API_URL}/api/users/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response:", result);

      // ❌ Error handling
      if (!response.ok || !result.success) {
        toast.error(result.message || "Login failed ⚠️");
        return;
      }

      // ✅ Save token + user info
      localStorage.setItem("token", result.token);
      localStorage.setItem("loggedInUser", result.user.name);

      toast.success("Login successful 🎉");

      // ✅ Redirect to home
      navigate("/home");

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error ⚠️");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>

          <span className="login-link">
            Don’t have an account? <Link to="/signup">Signup</Link>
          </span>

        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;