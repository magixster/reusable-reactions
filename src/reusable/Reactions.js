import React, { useState } from 'react';
import { Tooltip, Popover, Tabs, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Reactions.module.scss';
import { getUsersWithContentIdAndReaction } from './utils';

const { TabPane } = Tabs;

export const Reactions = ({
  reactions,
  userReactedToContent,
  content_id,
  users,
  updateUserReactionOnEmoji,
  removeUserReactionOnEmoji,
  userHasReacted,
}) => {
  const [clicked, handleClickChange] = useState(false);
  const userHasReactedOnContent = userHasReacted[content_id].hasReacted;

  const getContentViewForEmoji = (id) => {
    const usersData = getUsersWithContentIdAndReaction(users, userReactedToContent, content_id, id);

    return usersData.map(({ id, avatar, first_name }) => (
      <div key={id} className={styles.container__userListItem}>
        <div>
          <img style={{ borderRadius: '50%', height: '35px', width: '35px' }} src={avatar} alt={first_name} />
          <span className={styles.container__userListItem_name}>{first_name}</span>
        </div>
        <div>
        <Button type="primary" icon={<UserAddOutlined />}> Add Friend </Button>
        </div>
      </div>));
  };

  const allReactionsByUsers = () => (
    <div>
      <Tabs size={'small'} defaultActiveKey={reactions[0].id} onChange={() => {}}>
      {reactions.map(({ id, emoji }) => {
        const usersData = getUsersWithContentIdAndReaction(users, userReactedToContent, content_id, id);

        return (
          <TabPane disabled={!usersData.length} tab={`${emoji} ${usersData.length}`} key={id}>
            {getContentViewForEmoji(id)}
          </TabPane>
      );
      })}
      <TabPane>
        <span tab={'x'} onClick={() => handleClickChange(false)}></span>
      </TabPane>
      </Tabs>
    </div>
  );

  return (
    <div>
      <div className={styles.container}>
      <div className={styles.reactionsContainer}>
      {reactions.map(({ id, name, emoji }) => (
        <Tooltip overlayClassName={styles.reactionsContainer__tooltip} color={'#161616'} placement="top" title={name} key={id}>
          <div
            key={id}
            onClick={() => {
              if(!userHasReacted[content_id].hasReacted) {
                updateUserReactionOnEmoji(id, content_id);
              } else {
                removeUserReactionOnEmoji(content_id);
              }
            }
            }
            className={styles.reactionsContainer__emoji}
          >{emoji}</div>
        </Tooltip>
    ))}
      </div>
      {userHasReactedOnContent &&
      <span className={styles.container__userReaction}>
      <Tooltip overlayClassName={styles.reactionsContainer__tooltip} color={'#161616'} placement="top" title={'You reacted'}>
        {reactions.find(reaction => reaction.id === userHasReacted[content_id].reaction_id).emoji}
        </Tooltip>
      </span>
    }
      </div>
      <Popover
        key={content_id}
        content={allReactionsByUsers}
        trigger="click"
        placement="bottom"
        visible={clicked}
        onVisibleChange={(visible) => handleClickChange(visible) }
      >
      <span className={styles.container__userReactedTabsClick}>
        {userReactedToContent[content_id].length} others reacted
      </span>
      </Popover>
    </div>);
};

