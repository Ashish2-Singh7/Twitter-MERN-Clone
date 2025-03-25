import { useSocketContext } from '../context/SocketContext';

const useSendAiMessage = () => {
    const { socket } = useSocketContext();

    const sendAiMessage = (eventName, data) => {
        socket?.emit(eventName, data);
    };

    return { sendAiMessage };
};

export default useSendAiMessage;
