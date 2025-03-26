import React, { useEffect, useRef } from 'react';

import Message from './Message';
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton';

import { useMessageContext } from '../../../context/MessageContext';

import useListenMessages from '../../../hooks/useListenMessages';
import { useConversationContext } from '../../../context/ConversationContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Messages = () => {
    const { showMessageContainer } = useConversationContext();
    const { AiMessages } = useMessageContext();
    const { messageType } = useMessageContext();

    const lastMessageRef = useRef();

    const { aiMessageLoading } = useListenMessages();

    const queryClient = useQueryClient();

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const { data: messages, isLoading } = useQuery({
        queryKey: ["fetchMessages"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/messages/${showMessageContainer?._id}`);
                const data = await res.json();
                if (!res.ok) { // or can write if(data.error)
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        retry: false,
        throwOnError: () => {
            queryClient.setQueryData(["fetchMessages"], null);
        }
    });

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }, [AiMessages, messages]);

    return (
        <>
            {messageType === "conversation" ? (
                <div className='p-5 flex-1 overflow-auto'>
                    {isLoading && [...Array(3)].map((_idx) => <MessageSkeleton key={_idx} />)}
                    {(!isLoading && !messages) && (
                        <p className='text-center'>💬 Say hello & start the conversation! 😊🚀</p>
                    )}
                    {(!isLoading && messages?.length !== 0 && messages) && messages.map((ele) => {
                        return (
                            <div
                                key={ele._id}
                                ref={lastMessageRef}
                            >
                                <Message messageType={messageType} recieverUser={showMessageContainer} senderUser={authUser} message={ele} />
                            </div>
                        );
                    })}
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
