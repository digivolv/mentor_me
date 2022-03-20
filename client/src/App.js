import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Search from "./components/Search";
import Mentors from "./components/Mentors";
import Mentor from "./components/Mentor";
import MentorView from "./components/MentorView";

function App() {
  const [selectedUser, setSelectedUser] = useState()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mentors" element={<Mentors onMentorSelect={(user) => setSelectedUser(user)}/>} />
        <Route path="/mentors/:id" element={<Mentor mentor={selectedUser}/>} />
        <Route path="/mentors/:id/view" element={<MentorView mentor={selectedUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
