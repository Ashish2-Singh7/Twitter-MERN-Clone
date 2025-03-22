import React from 'react'
import { Link } from 'react-router-dom'
import { useConversationContext } from '../../../context/ConversationContext';

const Conversation = () => {
    let username = "testUser";
    let profileImg = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    const { setShowMessageContainer } = useConversationContext();
    return (
        <div className='border-b border-gray-700 flex items-center justify-between p-5 cursor-pointer' onClick={()=>{setShowMessageContainer(true)}}>
            <div className="right-card flex items-center space-x-5">
                <Link to={`/profile/${username}`}>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={profileImg || "./avatar-placeholder.png"} />
                        </div>
                    </div>
                </Link>
                <div className="username flex flex-col items-start space-y-1 max-w-52">
                    <Link to={`/profile/${username}`}><h1 className='text-xl font-bold'>Samantha</h1></Link>
                    <p className='text-xs text-gray-500 select-none'>Last message that they did</p>
                </div>
            </div>
            <div className="left-card">
                <div className="formattedTime text-gray-500 select-none">7wk</div>
                {/* last time when you messaged */}
            </div>
        </div >
    )
}

export default Conversation;
