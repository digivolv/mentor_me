import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Search from "./components/Search";
import Session from "./components/Session/Session";
import Sessions from "./components/Session/Sessions";
import Mentors from "./components/Mentors/Mentors";
import Mentor from "./components/Mentors/Mentor";
import MentorView from "./components/Mentors/MentorView";

function App() {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users/:id/sessions/:session_id" element={<Session />} />
        <Route path="/users/:id/sessions/" element={<Sessions />} />
        <Route path="/mentors/:id" element={<Mentor mentor={selectedUser} />} />
        
        <Route
          path="/mentors"
          element={<Mentors onMentorSelect={(user) => setSelectedUser(user)} />}
        />
        <Route
          path="/mentors/:id/admin"
          element={
            <MentorView onMentorSelect={(user) => setSelectedUser(user)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
