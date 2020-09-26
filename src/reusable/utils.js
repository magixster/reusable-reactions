export const getUsersWithContentIdAndReaction = (allusers, userReactedToContent, content_id, id) => {
  const userIdListByReactions = userReactedToContent[content_id].filter(({ reaction_id }) => reaction_id === id);
    return userIdListByReactions.map(({ user_id}) => allusers.find(({ id }) => id === user_id ))
};
