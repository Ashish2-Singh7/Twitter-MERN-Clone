import React from 'react'

const Message = () => {
    let profilePic = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    const fromMe = true;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const formattedTime = "17:25";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={profilePic}
                    />
                </div>
            </div>
            <div className={`chat-bubble max-w-[250px] text-white ${bubbleBgColor}`}>
                It's over Anakin,
                <br />
                I have the high ground.
            </div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
        </div>
    )
}

export default Message;
