import React, { createContext, useContext, useEffect, useState } from "react";

import io from 'socket.io-client';
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    useEffect(() => {
        if (authUser) {
            // const socket = io('http://localhost:8000', {
            const socket = io('https://twitter-mern-clone-rts8.onrender.com', {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);

            // performance reasons 
            return () => socket.close();
            // clean up function
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);


    return <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>{children}</SocketContext.Provider>;
}