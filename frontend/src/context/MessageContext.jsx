import React, { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const MessageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMessageContext = () => {
    return useContext(MessageContext);
};

export const MessageContextProvider = ({ children }) => {
    const [messageType, setMessageType] = useState("conversation"); // conversation or ai
    const [AiMessages, setAiMessages] = useState([]);

    return <MessageContext.Provider value={{ messageType, setMessageType, AiMessages, setAiMessages }}>
        {children}
    </MessageContext.Provider>
}
