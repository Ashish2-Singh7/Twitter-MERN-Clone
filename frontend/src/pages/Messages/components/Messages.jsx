import React from 'react'
import Message from './Message'
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton';
import { useMessageContext } from '../../../context/MessageContext';

const Messages = () => {
    let loading = false;
    let messages = [];
    const { messageType } = useMessageContext();
    return (
        <>
            {messageType === "conversation" ? (
                <div className='p-5 flex-1 overflow-auto'>
                    {loading && [...Array(3)].map((_idx) => <MessageSkeleton key={_idx} />)}
                    {!loading && messages.length === 0 && (
                        <p className='text-center'>Send a message to start the conversation</p>
                    )}
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                    <Message messageType={messageType} />
                </div>
            )
                : (
                    <div className='p-5 flex-1 overflow-auto'>
                        {loading && [...Array(5)].map((_idx) => <MessageSkeleton key={_idx} />)}
                        {!loading && messages.length === 0 && (
                            <p className='text-center'>🚀 Ready to dive into an epic conversation? Let’s spark some AI magic! ✨🤖</p>
                        )}
                        <Message messageType={messageType} />
                        <Message messageType={messageType} />
                        <Message messageType={messageType} />
                        <Message messageType={messageType} />
                    </div>
                )}
        </>
    )
}

export default Messages
