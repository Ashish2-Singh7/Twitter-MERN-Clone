import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';

const MessageInputContainer = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const loading = false;
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-[#2a2d30] border-[#2a2d30] text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                />
                <div className='absolute inset-y-0 end-0 flex items-center pe-3 space-x-3'>
                    <button type='submit' className='cursor-pointer'>
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                    </button>
                    <button className='cursor-pointer' type='button'>
                        {loading ? <div className='loading loading-spinner'></div> : <FaPlus />}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MessageInputContainer;
