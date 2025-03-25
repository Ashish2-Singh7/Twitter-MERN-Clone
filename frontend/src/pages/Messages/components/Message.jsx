import React from 'react';

import Markdown from 'markdown-to-jsx';

const Message = ({ messageType, msgElement }) => {
    let profilePic = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    const fromMe = msgElement?.sender._id === 'ai' ? false : true;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? (messageType === "conversation" ? "bg-blue-500" : "bg-[#2a2d30]") : (messageType === "conversation" ? "" : "bg-[#2a2d30]");
    const formattedTime = "17:25";
    return (
        <div className={`chat ${chatClassName}`}>
            {messageType === "conversation" && <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={profilePic}
                    />
                </div>
            </div>}
            {/* <div className={`chat-bubble max-w-[250px] text-white ${bubbleBgColor}`}> */}
            <div className={`chat-bubble max-w-[450px] text-white ${bubbleBgColor}`}>
                {messageType === "conversation" ? "This is conversation" : (msgElement?.sender._id === 'ai' ? <Markdown>{msgElement?.message}</Markdown> : msgElement?.message)}

            </div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
        </div>
    )
}

export default Message;
