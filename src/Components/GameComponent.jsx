import React from "react";
import { useNavigate } from "react-router-dom";

const GameComponent = () => {
  const navigate  =  useNavigate()
  const onStartGameClickHandler = ()=>{
    navigate('/startGame')
  }
  return (
    <>
    <div className="home-container">
      <div className="button-container">
        <button className="primary-button"onClick={onStartGameClickHandler}>Start Game</button>
      </div>
    </div>
    </>
  );
};

export default GameComponent;
