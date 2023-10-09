import "./assets/tailwindcss";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
function App() {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = (username) => {
    setIsLogged(true);
    sessionStorage.setItem('username',username);
  };
  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Login handleLogin={handleLogin} />} />
        <Route path='/welcome' element={<Dashboard isLogged={isLogged} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
