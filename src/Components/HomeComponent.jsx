import React from "react";
import { useNavigate } from "react-router-dom";
const HomeComponent = () => {
  const navigate  =  useNavigate()
  return (
    <div className="home-container">
      <div className="button-container">
        <button className="primary-button" onClick={()=>navigate('/register')}>Register</button>
        <button className="primary-button"  onClick={()=>navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default HomeComponent;
