import React, { useState } from "react";
import { loginUser } from "../services/index";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const loginResult = await loginUser(formData);
      console.log(loginResult?.userData?.status === 200)
      if (loginResult?.userData?.status === 200) {
        console.log("Login successful!");
        navigate("/game");
      } else {
        alert(loginResult?.userData?.message)
      }
    } else {
      setFormErrors(errors);
    }
  };
  const validateForm = (data) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email.trim() || !emailPattern.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="error-message">{formErrors.email}</div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <div className="error-message">{formErrors.password}</div>
        <button className="primary-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
