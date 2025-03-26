const useLatestMessage = () => {

    const getLatestMessage = (conversations) => {
        if (!Array.isArray(conversations) || conversations.length === 0) return null;

        let latestMessage = [];

        conversations.forEach(conversation => {
            let refLatestMessage = null;
            conversation.messages.forEach(message => {
                if (!refLatestMessage || new Date(message.createdAt) > new Date(refLatestMessage.createdAt)) {
                    refLatestMessage = message;
                }
            });
            latestMessage.push(refLatestMessage);
        });

        return latestMessage;
    };

    return { getLatestMessage };
}

export default useLatestMessage;