import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import Posts from './components/Posts';
import { POST_LIST } from './Mock/Cards';
import { BASE_URL } from './Constants';

import styles from './App.module.scss';
import { defaultReactionState } from './utils';


function App() {
  const { get, post, del, loading, error } = useFetch(`${BASE_URL}`);
  const [reactionsWithUsers, setReactionsWithUsers] = useState({});
  const [userReactedToContent, setUserReactedToContent] = useState(null);
  const [updatedUserReaction, setUpdatedUserReaction] = useState(defaultReactionState(POST_LIST));

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
    const newUserReaction = await post(`/user_content_reactions`, {
      user_id: 4,
      reaction_id: reaction_id,
      content_id: content_id,
    });
    setUpdatedUserReaction({ ...updatedUserReaction, [newUserReaction.content_id]: { ...newUserReaction, hasReacted: true } });
    getReactionsForContentId();
  }

  const removeUserReactionOnEmoji = async (content_id) => {
    const reactedContentId = updatedUserReaction[content_id].id;
    await del(`/user_content_reactions/${reactedContentId}`);
    setUpdatedUserReaction({ ...updatedUserReaction, [content_id]: { ...updatedUserReaction[content_id], hasReacted: false } });
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
        userHasReacted={updatedUserReaction}
      />
    </div>
  );
}

export default App;
