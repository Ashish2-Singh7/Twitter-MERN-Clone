import React from 'react';

import Conversation from './components/Conversation'
import ConversationSkeleton from '../../components/skeletons/ConversationSkeleton';

import { IoSettingsOutline } from 'react-icons/io5';

import { useQuery } from '@tanstack/react-query';
import RecommendedCard from './components/RecommendedCard';
import useLatestMessage from '../../hooks/useLatestMessage';
import useListenOnlineUsers from '../../hooks/useListenOnlineUsers';

const ConversationsContainer = () => {

    const { getLatestMessage } = useLatestMessage();

    useListenOnlineUsers();

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const { data: conversations, isLoading: loading } = useQuery({
        // we use queryKey to give a unique name to our query and refer to it later
        queryKey: ["fetchConversations"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/users/getConversations");
                const data = await res.json();
                if (!res.ok) { // or can write if(data.error)
                    throw new Error(data.error || "Something went wrong");
                };
                if (!data.recommendedUsers) {
                    let latestMessage = getLatestMessage(data);
                    let conversation_array = [];
                    for (let i = 0; i < data.length; i++) {
                        const participant = data[i].participants.find(user => user._id !== authUser._id);
                        if (participant) {
                            participant.latestMessage = {
                                message: latestMessage[i].text,
                                time: latestMessage[i].createdAt
                            }
                            conversation_array.push(participant);
                        }
                    }
                    return conversation_array;
                }
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        retry: false,
    });

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
            {(!conversations || conversations.length === 0 || conversations?.recommendedUsers) && !loading && <div className='p-4 text-center'>
                <h1 className='font-bold'>🚀 No Conversations Yet! 💬</h1>
                <p className='text-gray-500'>Looks like you haven’t started a chat yet. Why not reach out and start a conversation with someone? 😊✨</p>
            </div>}
            {conversations?.recommendedUsers && <RecommendedCard conversations={conversations} loading={loading} />}
            {!loading && (conversations && !conversations.recommendedUsers) && (
                <div>
                    {conversations.map((ele) => (
                        <Conversation key={ele._id} profileImg={ele.profileImg} fullName={ele.fullName} recomend={false} username={ele.username} user={ele} latestMessage={ele.latestMessage} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ConversationsContainer
