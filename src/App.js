import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import Posts from './components/Posts';
import { POST_LIST } from './Mock/Cards';
import { BASE_URL } from './Constants';

import styles from './App.module.scss';


function App() {
  const { get, post, del, loading, error } = useFetch(`${BASE_URL}`);
  const [reactionsWithUsers, setReactionsWithUsers] = useState({});
  const [userReactedToContent, setUserReactedToContent] = useState({});
  const [updatedUserReaction, setUpdatedUserReaction] = useState(null);

  useEffect(() => {
    async function loadReactionsAndUsers(){
      const reactions = await get(`/reactions`);
      const users = await get(`/users`);

      setReactionsWithUsers({ reactions, users });
    }
    loadReactionsAndUsers();
    getReactionsForContentId();
  }, [])

  const getReactionsForContentId = async () => {
    const data = await get(`/user_content_reactions`);
    setUserReactedToContent(data.reduce((acc, val) =>
      ({ ...acc, [val.content_id]: [...data.filter(d => d.content_id === val.content_id)]}),
    {}));
  }

  const updateUserReactionOnEmoji = async (reaction_id, content_id) => {
    const updatedUserReaction = await post(`/user_content_reactions`, {
      user_id: 4,
      reaction_id: reaction_id,
      content_id: content_id,
    });
    setUpdatedUserReaction(updatedUserReaction);
    getReactionsForContentId();
  }

  const removeUserReactionOnEmoji = async () => {
    await del(`/user_content_reactions/${updatedUserReaction.id}`);
    setUpdatedUserReaction(null);
    getReactionsForContentId();
  }

  return (
    <div className={styles.app}>
      <Posts
        posts={POST_LIST}
        reactionsWithUsers={reactionsWithUsers}
        loading={loading}
        error={error}
        getReactionsForContentId={getReactionsForContentId}
        userReactedToContent={userReactedToContent}
        updateUserReactionOnEmoji={updateUserReactionOnEmoji}
        removeUserReactionOnEmoji={removeUserReactionOnEmoji}
        userHasReacted={!!updatedUserReaction}
      />
    </div>
  );
}

export default App;
