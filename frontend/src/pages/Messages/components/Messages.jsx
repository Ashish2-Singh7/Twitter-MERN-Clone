import React from 'react'
import Message from './Message'
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton';

const Messages = () => {
    let loading = false;
    let messages = [];
    return (
        <div className='p-5 flex-1 overflow-auto'>
            {loading && [...Array(3)].map((_idx) => <MessageSkeleton key={_idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages
