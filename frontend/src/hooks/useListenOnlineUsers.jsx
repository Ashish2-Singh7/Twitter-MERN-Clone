import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useQueryClient } from '@tanstack/react-query';

const useListenOnlineUsers = () => {
    const { socket, onlineUsers, setOnlineUsers } = useSocketContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        socket?.on("getOnlineUsers", (data) => {
            setOnlineUsers(data);
        });
        return () => {
            socket?.off("getOnlineUsers");
        };

    }, [queryClient, setOnlineUsers, socket]);

    return { onlineUsers };
};

export default useListenOnlineUsers;
