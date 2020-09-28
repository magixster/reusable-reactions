export const defaultReactionState = (posts) =>
  posts.reduce((acc, { content_id }) => (
    { ...acc,
      [content_id]: { hasReached: false }
    }),
  {});