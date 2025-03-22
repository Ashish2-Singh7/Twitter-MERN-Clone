import React from 'react'
import Conversation from './components/Conversation'
import ConversationSkeleton from '../../components/skeletons/ConversationSkeleton';
import { IoSettingsOutline } from 'react-icons/io5';

const ConversationsContainer = () => {
    let loading = false;
    return (
        <div>
            <div className='flex justify-between items-center p-4 border-b border-gray-700'>
                <p className='text-lg'>Conversations</p>
                <div tabIndex={0} role='button' className='m-1'>
                    <IoSettingsOutline className='w-4 cursor-pointer' />
                </div>
            </div>
            {loading && (
                <div className='space-y-5 p-5'>
                    {[...Array(5)].map((_idx) => <ConversationSkeleton key={_idx} />)}
                </div>
            )}
            <div className="conversations">
                <Conversation />
                <Conversation />
                <Conversation />
            </div>
        </div>
    )
}

export default ConversationsContainer
