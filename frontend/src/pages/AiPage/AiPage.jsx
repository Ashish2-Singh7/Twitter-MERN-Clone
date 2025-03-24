import React from 'react'
import Messages from '../Messages/components/Messages';
import MessageInputContainer from '../Messages/components/MessageInputContainer';

const AiPage = () => {

    return (
        <div className='flex-[4_4_0] flex flex-col border-l border-r border-gray-700 relative h-screen overflow-y-auto aiLogoBg'>
            <Messages />
            <MessageInputContainer />
        </div>
    )
}

export default AiPage
