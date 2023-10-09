/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Friends from "./Friends";
import { io } from "socket.io-client";
import { useEffect } from "react";

const Dashboard = ({ isLogged }) => {
    useEffect(() => {
        const socket = io("http://localhost:80");
        socket.on("connect", () => {
          console.log("Connected to server");
        });
      
        // Rest of your code...
      
        return () => {
          socket.disconnect();
        };
      }, []);
      
  if (!isLogged && sessionStorage.getItem("username") === undefined) {
    return <Navigate to='/' replace />;
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='min-h-screen bg-[#7E78D2]'>
        {/* <Friends /> */}
        {/* <button onClick={sendMessage}>Send Message</button> */}
      </motion.div>
    </>
  );
};

export default Dashboard;
