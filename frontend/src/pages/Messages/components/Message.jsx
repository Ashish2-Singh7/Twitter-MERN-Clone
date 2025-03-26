import React from 'react';

import Markdown from 'markdown-to-jsx';
import { formatPostDate } from '../../../utils/date';

const Message = ({ messageType, msgElement, message, recieverUser, senderUser, shouldShake }) => {
    const fromMe = (messageType === "ai" ? (msgElement?.sender._id === 'ai' ? false : true) : (message.senderId === senderUser._id));
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? (messageType === "conversation" ? "bg-blue-500" : "bg-[#2a2d30]") : (messageType === "conversation" ? "" : "bg-[#2a2d30]");
    const shakeClass = (messageType === "conversation") ? (shouldShake ? "shake" : "") : null;

    return (
        <div className={`chat ${chatClassName}`}>
            {messageType === "conversation" && <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={(fromMe ? senderUser?.profileImg : recieverUser?.profileImg) || './avatar-placeholder.png'}
                    />
                </div>
            </div>}
            <div className={`chat-bubble ${messageType === "ai" ? "max-w-[450px]" : "max-w-[300px]"} text-white ${bubbleBgColor} ${shakeClass && shakeClass}`}>
                {messageType === "conversation" ? message.text : (msgElement?.sender._id === 'ai' ? <Markdown>{msgElement?.message}</Markdown> : msgElement?.message)}

            </div>

            {messageType === "conversation" && <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formatPostDate(message.createdAt)}</div>}
        </div>
    )
}

export default Message;
