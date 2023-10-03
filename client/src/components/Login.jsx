/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login({handleLogin}) {
  const navigate = useNavigate();
  const [signup, setSignUp] = useState(false);
  const [pass, setPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [isLogged, setIsLogged] = useState(false)
  // const [first, setfirst] = useState(second)
  const showSignUp = () => {
    setSignUp(!signup);
    setUsername("");
    setPassword("");
  };
  const showPassword = () => {
    setPass(!pass);
  };
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:8080/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status == 200) {
        // Handle successful response (e.g., show a success message)
        // Parse the response body as JSON
        const responseBody = await response.json();

        // Access the message property
        console.log(response.status, responseBody.message);
        setMessage("Account created successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else if (response.status == 409) {
        const responseBody = await response.json();

        // Access the message property
        console.log(response.status, responseBody.message);
      } else {
        // Handle error response (e.g., show an error message)
        const responseBody = await response.json();
        console.error(response.status, responseBody.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:8080/user/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status == 200) {
        // Handle successful response (e.g., show a success message)

        // Parse the response body as JSON
        const responseBody = await response.json();

        // Access the message property
        console.log(response.status, responseBody.message);
        handleLogin();
        navigate("/welcome");
      } else if (response.status == 404) {
        const responseBody = await response.json();
        console.log(response.status, responseBody.message);
      } else {
        // Handle error response (e.g., show an error message)
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className='min-h-screen flex flex-col justify-center items-center bg-[#7E78D2]/50'>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{
          duration: 0.6,
        }}
        className='border border-none rounded-md w-[40%]  bg-[#6F58C9] px-5 py-7  flex flex-col justify-center items-center'>
        <h1 className='text-white font-bold text-3xl mb-5'>
          {signup ? "Create Account" : "Login"}
        </h1>
        <form className='text-center'>
          <label htmlFor='username' className='text-white text-xl'>
            Username:{" "}
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border border-none bg-gray-100/50 rounded-md mb-5'
            />
          </label>
          <label
            htmlFor='password'
            className='text-white text-xl block relative'>
            Password:{" "}
            <input
              type={pass ? "text" : "password"}
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-none bg-gray-100/50 rounded-md mb-7'
            />
            {pass ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className='absolute top-2 right-2 cursor-pointer text-[15px]'
                onMouseUp={showPassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className='absolute top-2 right-2 cursor-pointer text-[15px]'
                onMouseDown={showPassword}
              />
            )}
          </label>
          {signup ? (
            <button
              className='m-auto mb-3 px-4 py-1 bg-white text-xl font-medium rounded-sm text-[#6F58C9] hover:scale-110 transition-all duration-300 ease-in-out'
              onClick={handleSignUp}>
              Sign up
            </button>
          ) : (
            <button
              className='m-auto mb-3 px-4 py-1 bg-white text-xl font-medium rounded-sm text-[#6F58C9] hover:scale-110 transition-all duration-300 ease-in-out'
              onClick={handleSignIn}>
              Sign in
            </button>
          )}

          {!signup ? (
            <p
              className='text-white underline cursor-pointer'
              onClick={showSignUp}>
              Don&apos;t have an account? Sign up
            </p>
          ) : (
            <p
              className='text-white underline cursor-pointer'
              onClick={showSignUp}>
              Already have an account? Sign in
            </p>
          )}
        </form>
      </motion.div>
      <p>{message}</p>
    </motion.div>
  );
}

export default Login;
