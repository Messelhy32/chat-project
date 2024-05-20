import GenderCheckbox from "./GenderCheckBox";

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Signup <span className='text-[#3C5B6F]'> ChitChat</span>
        </h1>

        <form>
          <div className='my-2'>
            <label className='label p-2'>
              <span className='text-base label-text text-white '>
                Full Name
              </span>
            </label>
            <input
              type='text'
              placeholder='John Doe'
              className='w-full input input-bordered  h-10'
            />
          </div>

          <div className='my-2'>
            <label className='label p-2 '>
              <span className='text-base label-text text-white '>Username</span>
            </label>
            <input
              type='text'
              placeholder='johndoe'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div className='my-2'>
            <label className='label'>
              <span className='text-base label-text text-white '>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <div className='my-2'>
            <label className='label'>
              <span className='text-base label-text text-white '>
                Confirm Password
              </span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>

          <GenderCheckbox />

          <a
            className=' text-white text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
            href='#'>
            Already have an account?
          </a>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700 text-white '>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
