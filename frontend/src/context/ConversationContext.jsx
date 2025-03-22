import React, { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ConversationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConversationContext = () => {
    return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
    const [showMessageContainer, setShowMessageContainer] = useState(false);

    return <ConversationContext.Provider value={{ showMessageContainer, setShowMessageContainer }}>
        {children}
    </ConversationContext.Provider>
}
