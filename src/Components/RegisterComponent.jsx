import React, { useState } from "react";
import { registerUser } from "../services/index";
import { useNavigate } from "react-router-dom";
const RegisterComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: null,
    birthdate: "",
    phoneNumber: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    phoneNumber: "",
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
    const registrationResult = await registerUser(formData);
    if (registrationResult.success) {
      console.log("Registration successful!");
      alert("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        profilePicture: null,
        birthdate: "",
        phoneNumber: "",
        password: "",
      });
      setFormErrors({});
      navigate('/login')
    } else {
      alert(registrationResult.error);
      console.error("Registration failed:", registrationResult.message);
    }
  } else {
    setFormErrors(errors);
  }
};
   const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profilePicture: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = (data) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!data.email.trim() || !emailPattern.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (data.birthdate && new Date(data.birthdate) >= new Date()) {
      errors.birthdate = "Birthdate must be in the past";
    }
    if (data.phoneNumber && !/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }
    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Registration</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <div className="error-message">{formErrors.firstName}</div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <div className="error-message">{formErrors.lastName}</div>
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
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <input
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          value={formData.birthdate}
          onChange={handleInputChange}
        />
        <div className="error-message">{formErrors.birthdate}</div>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <div className="error-message">{formErrors.phoneNumber}</div>
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
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterComponent;
