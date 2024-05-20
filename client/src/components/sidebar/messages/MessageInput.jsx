import React from "react";
import { BiSolidSend } from "react-icons/bi";

const MessageInput = () => {
  return (
    <form action='' className='px-4 my-3 relative'>
      <input
        type='text'
        className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pe-10'
        placeholder='Send a message'
      />
      <button
        type='submit'
        className='absolute inset-y-0 end-0 flex items-center pe-6 text-white'>
        <BiSolidSend />
      </button>
    </form>
  );
};

export default MessageInput;
