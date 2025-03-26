import React, { useState } from 'react'

import { useMessageContext } from '../../../context/MessageContext';

import { BsSend } from 'react-icons/bs';

import toast from 'react-hot-toast';

import useSendAiMessage from '../../../hooks/useSendAiMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConversationContext } from '../../../context/ConversationContext';

const MessageInputContainer = () => {
    const [message, setMessage] = useState("");

    const queryClient = useQueryClient();

    const { setAiMessages, messageType } = useMessageContext();
    const { showMessageContainer } = useConversationContext();

    const { sendAiMessage } = useSendAiMessage();

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/messages/send/${showMessageContainer._id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: message })
                });
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || 'Failed to send the message');
                }
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        onSuccess: (data) => {
            setMessage("");
            queryClient.setQueryData(["fetchMessages"], (oldData) => {
                if (oldData) {
                    return [...oldData, data];
                }
                else {
                    return [data];
                }
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.length === 0) {
            toast.error("Field can't be empty");
            return;
        }
        if (messageType === "ai") {
            sendAiMessage('ai-chat-message', {
                message,
                sender: "user"
            })
            setAiMessages(prevState => [...prevState, { sender: "user", message }])
            setMessage("");
        }
        if (messageType === "conversation") {
            sendMessage();
        }
    }

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
                    {messageType === "ai" && <button type='submit' className='cursor-pointer'>
                        <BsSend />
                    </button>}
                    {messageType === "conversation" && <button type='submit' className='cursor-pointer'>
                        {isSending ? <div className='loading loading-spinner'></div> : <BsSend />}
                    </button>}
                </div>
            </div>
        </form>
    )
}

export default MessageInputContainer;
