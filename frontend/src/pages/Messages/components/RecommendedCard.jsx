import React from 'react'
import Conversation from './Conversation';

const RecommendedCard = ({ conversations, loading }) => {
    return (
        <div className='py-4 sm:px-10 px-4 text-center mt-10'>
            <h1 className='font-bold'>🌟 Meet New People!</h1>
            {(conversations?.recommendedUsers || !loading) && <div>
                {conversations?.recommendedUsers.map((ele) => {
                    return (
                        <div key={ele._id}>
                            <Conversation profileImg={ele.profileImg} fullName={ele.fullName} recomend={true} username={ele.username} user={ele} />
                        </div>
                    );
                })}
            </div>}
            {loading && (
                <div className='space-y-5 p-4'>
                    {[...Array(3)].map((_idx) => <ConversationSkeleton key={_idx} />)}
                </div>
            )}
        </div>
    )
}

export default RecommendedCard;
