import React, { useEffect } from 'react'
import ConversationsContainer from './ConversationsContainer';
import { useConversationContext } from '../../context/ConversationContext';
import MessageContainer from './MessageContainer';
import { useLocation } from 'react-router-dom';

const Conversations = () => {
    const { showMessageContainer, setShowMessageContainer } = useConversationContext();
    const location = useLocation();

    useEffect(() => {

        // Check if user was passed from ProfilePage
        if (location.state?.user) {
            setShowMessageContainer(location.state.user);
        }

        
        return () => {
            setShowMessageContainer(null);
            localStorage.removeItem("messageUser"); // Remove after leaving
        }
    }, [location.state?.user, setShowMessageContainer]);

    return (
        <div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
            {!showMessageContainer ? <ConversationsContainer /> : <MessageContainer />}
        </div>
    )
}

export default Conversations;
