import React from "react";

const Login = () => {
  return (
    <div className='felx flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
          <span className='text-[#3C5B6F]'> ChitChat</span>
        </h1>
        <form action=''>
          <div className='my-2'>
            <label htmlFor='' className=' label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
            />
          </div>
          <div className='my-2'>
            <label htmlFor='' className=' label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='w-full input input-bordered h-10'
            />
          </div>
          <a
            href='#'
            className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Dont't"} have an account?
          </a>
          <div>
            <button className='btn btn-block btn-sm mt-2 text-white'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
