import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MentorView
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
const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/users/:id/mentors/:mentor_id/sessions/:session_id"
          element={<Session />}
        />
        <Route path="/users/:id/sessions/" element={<Sessions />} />
        <Route path="/mentors/:id" element={<Mentor users={users} setUsers={setUsers}/>} />

        <Route
          path="/mentors"
          element={<Mentors />}
        />
        <Route
          path="/mentors/:id/admin"
          element={
            <MentorView />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
