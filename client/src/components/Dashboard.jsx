/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {Navigate } from 'react-router-dom';

const Dashboard = ({isLogged}) => {
    if(!isLogged){
        return <Navigate to="/" replace />;
    }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-[#7E78D2]">
      <motion.h1 className="text-white text-2xl font-bold">Welcome</motion.h1>
    </motion.div>
  );
};

export default Dashboard;
