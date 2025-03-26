import React from 'react';

import { Link } from 'react-router-dom';

import { BsThreeDotsVertical } from "react-icons/bs";

import { useConversationContext } from '../../../context/ConversationContext';
import { formatPostDate } from '../../../utils/date';

const Conversation = ({ profileImg, fullName, recomend, username, user, latestMessage }) => {
    const { setShowMessageContainer } = useConversationContext();

    return (
        <div className='border-b border-gray-700 flex items-center justify-between p-5 cursor-pointer text-left' onClick={() => { setShowMessageContainer(user) }}>
            <div className="right-card flex items-center space-x-5">
                <Link to={`/profile/${username}`}>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={profileImg || "./avatar-placeholder.png"} />
                        </div>
                    </div>
                </Link>
                <div className="username flex flex-col items-start space-y-1 max-w-52">
                    <Link to={`/profile/${username}`}><h1 className='text-xl font-bold'>{fullName}</h1></Link>
                    <p className='text-xs text-gray-500 select-none'>{recomend ? `@${username}` : (latestMessage.message.length > 26 ? latestMessage.message.slice(0, 26) + "..." : latestMessage.message)}</p>
                </div>
            </div>
            <div className="left-card">
                {!recomend ? <div className="formattedTime text-gray-500 select-none">{formatPostDate(latestMessage.time)}</div> : <BsThreeDotsVertical className='cursor-pointer' />}
                {/* last time when you messaged */}
            </div>
        </div >
    )
}

export default Conversation;
