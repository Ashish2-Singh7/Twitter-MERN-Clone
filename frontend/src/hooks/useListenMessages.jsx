import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useMessageContext } from '../context/MessageContext';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { AiMessages, setAiMessages } = useMessageContext();
    const [aiMessageLoading, setAiMessageLoading] = useState(false);

    useEffect(() => {
        socket?.on('aiMessageLoading', (data) => {
            setAiMessageLoading(data);
        })
        socket?.on("ai-chat-message", (newMessage) => {
            setAiMessages([...AiMessages, newMessage]);
        });

        return () => {
            socket?.off("ai-chat-message");
            socket?.off("aiMessageLoading");
        };

    }, [AiMessages, setAiMessages, socket, aiMessageLoading, setAiMessageLoading]);

    return { aiMessageLoading };
};

export default useListenMessages;
