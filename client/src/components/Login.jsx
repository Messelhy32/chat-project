/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [signup, setSignUp] = useState(false);
  const [pass, setPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const showSignUp = () => {
    setSignUp(!signup);
    setUsername("");
    setPassword("");
  };
  const showPassword = () => {
    setPass(!pass);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (username == "" && password == "") {
      setMessage("Please enter a username and a password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (username == "") {
      setMessage("Please enter a username");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (password == "") {
      setMessage("Please enter a password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      const userData = { username, password };

      try {
        const response = await fetch("http://localhost:8080/user/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          console.log(response.status, responseBody.message);
          setMessage("Account created successfully");
          handleLogin(userData.username);
          setTimeout(() => {
            navigate("/welcome");
          }, 3000);
        } else if (response.status === 409) {
          const responseBody = await response.json();
          console.log(response.status, responseBody.message);
        } else {
          const responseBody = await response.json();
          console.error(response.status, responseBody.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (username == "" && password == "") {
      setMessage("Please enter your username and password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (username == "") {
      setMessage("Please enter your username");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (password == "") {
      setMessage("Please enter your password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      const userData = { username, password };

      try {
        const response = await fetch("http://localhost:8080/user/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          console.log(response.status, responseBody.message);
          setMessage("Logged in Successfully");
          handleLogin(userData.username);
          setTimeout(() => {
            navigate("/welcome");
          }, 3000);
        } else if (response.status === 404) {
          const responseBody = await response.json();
          setMessage(responseBody.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
          console.log(response.status, responseBody.message);
        } else {
          console.error("Error creating user");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='min-h-screen flex flex-col justify-center items-center bg-[#2f2fa1]'>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{
            duration: 0.6,
          }}
          className='border border-none rounded-md w-[40%] bg-gradient-to-r from-[#f04977] to-[#fc624f] px-5 py-7 flex flex-col justify-center items-center'>
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
                className='border border-none bg-white rounded-md mb-5 text-black px-2'
                required
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
                className='border border-none bg-white rounded-md mb-7 px-2 text-black'
                required
              />
              {pass ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className='absolute top-2 right-2 cursor-pointer text-[15px] text-black'
                  onMouseUp={showPassword}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className='absolute top-2 right-2 cursor-pointer text-[15px] text-black'
                  onMouseDown={showPassword}
                />
              )}
            </label>
            {message != "" ? (
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className='text-white font-medium txl mb-7'>
                {message}
              </motion.p>
            ) : (
              ""
            )}
            {signup ? (
              <button
                className='m-auto mb-3 px-4 py-1 border border-white text-xl font-medium rounded-sm text-white hover:scale-110 transition-all duration-300 ease-in-out'
                onClick={handleSignUp}>
                Sign up
              </button>
            ) : (
              <button
                className='m-auto mb-3 px-4 py-1 border border-white text-xl font-medium rounded-sm text-white hover:scale-110 transition-all duration-300 ease-in-out'
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
      </motion.div>
    </>
  );
}

export default Login;
