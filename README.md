## Get started woman_teacher

### install
1. run `yarn` or `npm install` to install the packages from package.json
2. run `yarn start` or `npm start` to start the project on local development server.

### Core Characteristics
1. Reusable Reactions component. (Can be used across various knowledge panes [posts/cards/comments])

#### required props
  [x] reactions -> [] containing the reaction types,
  [x] userReactedToContent -> {} key => ID of the comment/post value => [] of object having reaction with respect to user IDs,
  [x] content_id -> current post/comment ID,
  [x] users -> [] containing all users data,
  [x] updateUserReactionOnEmoji -> Fn => callback for API for updating reaction on server,
  [x] removeUserReactionOnEmoji -> Fn => callback for API for removing reaction on server,
  [x] userHasReacted -> {} => ID of the comment/post value => [] of object having reactions for current post/comment,