import React, { useEffect } from 'react';

import Messages from '../Messages/components/Messages';
import MessageInputContainer from '../Messages/components/MessageInputContainer';

import { useMessageContext } from '../../context/MessageContext';

const AiPage = () => {

    const { setMessageType } = useMessageContext();

    useEffect(() => {
        setMessageType("ai");
    }, [setMessageType]);

    return (
        <div className='flex-[4_4_0] flex flex-col border-l border-r border-gray-700 relative h-screen overflow-y-auto aiLogoBg'>
            <Messages />
            <MessageInputContainer />
        </div>
    )
}

export default AiPage
