import React, { useEffect, useRef } from 'react';

import Message from './Message';
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton';

import { useMessageContext } from '../../../context/MessageContext';

import useListenMessages from '../../../hooks/useListenMessages';

const Messages = () => {
    const { AiMessages } = useMessageContext();
    const { messageType } = useMessageContext();

    const lastMessageRef = useRef();

    let loading = false;
    let messages = [];

    const { aiMessageLoading } = useListenMessages();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }, [AiMessages]);

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
                        {!aiMessageLoading && AiMessages.length === 0 && (
                            <p className='text-center'>🚀 Ready to dive into an epic conversation? Let’s spark some AI magic! ✨🤖</p>
                        )}
                        {AiMessages.map((ele, index) => {
                            return (
                                <div
                                    key={index}
                                    ref={lastMessageRef}
                                >
                                    <Message msgElement={ele} messageType={messageType} />
                                </div>
                            );
                        })}
                        {aiMessageLoading && <div className='bg-[#2a2d30] w-fit px-3 py-1 rounded-xl'><span className="loading loading-dots loading-lg"></span></div>}
                    </div>
                )}
        </>
    )
}

export default Messages
