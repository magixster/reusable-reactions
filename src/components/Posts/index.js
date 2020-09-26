import React from 'react'
import Post from './Post'

const Posts = ({ posts, ...rest }) => (
    posts.map((post) => <Post {...post} {...rest} />)
  );

export default Posts;