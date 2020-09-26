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

  const getContentViewForEmoji = (id) => {
    const usersData = getUsersWithContentIdAndReaction(users, userReactedToContent, content_id, id);

    return usersData.map(({ id, avatar, first_name }) => (
      <div key={id} className={styles.reactionsContainer__userListItem}>
        <div>
          <img style={{ borderRadius: '50%', height: '35px', width: '35px' }} src={avatar} alt={first_name} />
          <span>{first_name}</span>
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
    <div className={styles.reactionsContainer}>
      {reactions.map(({ id, name, emoji }) => (
          <Tooltip overlayClassName={styles.reactionsContainer__tooltip} color={'#161616'} placement="top" title={name} key={id}>
            <div
              key={id}
              onClick={() => {
                if(userHasReacted) {
                  updateUserReactionOnEmoji(id, content_id);
                } else {
                  removeUserReactionOnEmoji();
                }
              }
              }
              className={styles.reactionsContainer__emoji}
            >{emoji}</div>
          </Tooltip>
      ))}
      <Popover
        key={content_id}
        content={allReactionsByUsers}
        trigger="click"
        placement="bottom"
        visible={clicked}
        onVisibleChange={(visible) => handleClickChange(visible) }
      >
        <span>{userReactedToContent[content_id].length}</span>
      </Popover>
    </div>);
};

