import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useMessageContext } from '../context/MessageContext';
import { useQueryClient } from '@tanstack/react-query';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { AiMessages, setAiMessages } = useMessageContext();
    const [aiMessageLoading, setAiMessageLoading] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        socket?.on('aiMessageLoading', (data) => {
            setAiMessageLoading(data);
        });
        socket?.on("ai-chat-message", (newMessage) => {
            setAiMessages([...AiMessages, newMessage]);
        });
        socket?.on("newMessage", (data) => {
            queryClient.setQueryData(["fetchMessages"], (oldData) => {
                if (oldData) {
                    data.shouldShake = true;
                    return [...oldData, data];
                }
                else {
                    data.shouldShake = true;
                    return [data];
                }
            });
        });

        return () => {
            socket?.off("ai-chat-message");
            socket?.off("aiMessageLoading");
            socket?.off("newMessage");
        };

    }, [AiMessages, setAiMessages, socket, aiMessageLoading, setAiMessageLoading, queryClient]);

    return { aiMessageLoading };
};

export default useListenMessages;
