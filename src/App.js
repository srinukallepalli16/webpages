import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";
import { v4 as uuidv4 } from 'uuid';
import "./styles.css";

function App() {
  const [user, setUser] = useState(null); // Store user data

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
      </Routes>
    </Router>
  );
}
function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      alert("Invalid credentials or user not found!");
    } else {
      alert("Login successful!");
      setUser(data);
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}
function Register({ setUser }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    const { data, error } = await supabase
      .from("users")
      .insert([{ 
        id: uuidv4(),  
        full_name: fullName,
        email: email,
        password: password
      }])
      .select()
      .single();
    // console.log("Supabase Response:", { data, error }); 
  
    if (error) {
      alert("Registration failed! " + error.message);
    } else {
      alert("Registration successful!");
      setUser(data);
      navigate("/home");
    }
  };
  return (
    <div className="container">
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Full Name" 
        value={fullName} 
        onChange={(e) => setFullName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}
function Home({ user }) {
  return (
    <div className="container">
      <h2>Welcome to Home Page</h2>
      {user ? (
        <>
          <p>Hello, {user.full_name}!</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}
export default App;
