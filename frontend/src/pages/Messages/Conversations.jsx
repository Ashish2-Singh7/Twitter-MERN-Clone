import React, { useEffect } from 'react'
import ConversationsContainer from './ConversationsContainer';
import { useConversationContext } from '../../context/ConversationContext';
import MessageContainer from './MessageContainer';

const Conversations = () => {
    const { showMessageContainer, setShowMessageContainer } = useConversationContext();
    useEffect(() => {

        return () => {
            setShowMessageContainer(false);
        }
    }, [setShowMessageContainer]);
    
    return (
        <div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
            {!showMessageContainer ? <ConversationsContainer /> : <MessageContainer />}
        </div>
    )
}

export default Conversations;
