import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = ({isEmployer}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth()
  const navigate = useNavigate();
  
  const handleSignUp = (event) => {
    event.preventDefault();
    
    signup(email, password)
    
    
      console.log(isEmployer);
        if (isEmployer) {
          navigate("/employer-home-page");
        } else {
          navigate("/employee-home-page");
        }
      
     
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
