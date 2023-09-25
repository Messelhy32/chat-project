import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [signup, setSignUp] = useState(false);
  const [pass, setPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showSignUp = () => {
    setSignUp(!signup);
  };
  const showPassword = () => {
    setPass(!pass);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const userData = { username, password };

    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful response (e.g., show a success message)
        console.log("User created successfully");
      } else {
        // Handle error response (e.g., show an error message)
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-[#7E78D2]/50'>
      <div className='border border-none rounded-md w-[40%]  bg-[#6F58C9] p-5 flex flex-col justify-center items-center'>
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
          <button className='m-auto mb-2 px-4 py-1 bg-white text-xl font-medium rounded-sm text-[#6F58C9] hover:scale-110 transition-all duration-300 ease-in-out' onClick={handleSubmit}>
            {signup ? "Sign up" : "Sign in"}
          </button>
          <p
            className='text-white underline cursor-pointer'
            onClick={showSignUp}>
            Don&apos;t have an account? Sign up
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
