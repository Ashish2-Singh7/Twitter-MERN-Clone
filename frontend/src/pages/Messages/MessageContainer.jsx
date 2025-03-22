import React from 'react';

import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link } from 'react-router-dom';

import MessageInputContainer from './components/MessageInputContainer';
import Messages from './components/Messages';

import { useConversationContext } from '../../context/ConversationContext';


const MessageContainer = () => {
  let username = "Ashish";
  const { setShowMessageContainer } = useConversationContext();
  return (
    <div className='flex-[4_4_0] border-l h-screen border-r border-gray-700 min-h-screen'>
      <div className='header flex items-center justify-between p-4 border-b border-gray-700'>
        <div className='flex items-center space-x-5'>
          <div className="back-icon" onClick={() => { setShowMessageContainer(false) }}>
            <IoArrowBack className='w-6 h-6 cursor-pointer' />
          </div>
          <Link to={`/profile/${username}`}>
            <div className='flex space-x-3 items-center'>
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <p className='text-lg font-bold'>Ashish</p>
            </div>
          </Link>
        </div>
        <div>
          <BsThreeDotsVertical className='cursor-pointer' />
        </div>
      </div>
      <div className="message_body flex flex-col h-[90%] overflow-y-auto relative">
        <Messages />
        <MessageInputContainer />
      </div>
    </div>
  )
}

export default MessageContainer;
