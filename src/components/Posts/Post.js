import React from 'react';
import { Card, Skeleton } from 'antd';
import { Reactions } from '../../reusable/Reactions';

const { Meta } = Card;

const Post = ({
  id,
  title,
  img,
  description,
  content_id,
  reactionsWithUsers: { reactions = [], users = [] },
  loading,
  error,
  userReactedToContent,
  updateUserReactionOnEmoji,
  removeUserReactionOnEmoji,
  userHasReacted,
}) => {
  const isReactionsLoading = !(reactions.length && users.length && userReactedToContent[content_id]);

  return (
    <Card
    key={id}
    hoverable
    style={{ width: 350 }}
    cover={<img alt={title} width={300} height={300} src={img} />}
  >
    <Meta title={title} description={description} />
    <p>{error && 'Something went wrong!'}</p>
    <Skeleton loading={isReactionsLoading} paragraph={{ rows: 1 }}>
      <Reactions
        reactions={reactions}
        loading={loading}
        userReactedToContent={userReactedToContent}
        content_id={content_id}
        users={users}
        updateUserReactionOnEmoji={updateUserReactionOnEmoji}
        removeUserReactionOnEmoji={removeUserReactionOnEmoji}
        userHasReacted={userHasReacted}
        />
    </Skeleton>
  </Card>
  );
};

export default Post;