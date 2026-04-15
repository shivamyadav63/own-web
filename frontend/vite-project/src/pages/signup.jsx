import React from 'react';
import './signup.css';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = "https://own-web-axon.onrender.com/api/users";

const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {

      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Signup failed ⚠️");
        return;
      }

      toast.success("Signup successful ✅");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signup-container">
          <div className="signup-box">
            <h1 className="signup-title">Signup</h1>

            <label>Name:</label>
            <input {...register("name", { required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            <label>Email:</label>
            <input {...register("email", { required: true })} />
            {errors.email && <span className="error">Email is required</span>}

            <label>Password:</label>
            <input type="password" {...register("password", { required: true })} />
            {errors.password && <span className="error">Password is required</span>}

            <button type="submit" className="signup-btn">Signup</button>

            <span className="signup-link">
              Already have an account? <a href="/login">Login</a>
            </span>
          </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default Signup;