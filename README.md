## Get started

### install
1. `yarn` or `npm install` to install the packages from package.json
2. `yarn start` or `npm start` to start the project on local development server.

***

### Core Characteristics
1. Reusable Reactions component. (Can be used across various knowledge panes [posts/cards/comments])

***

#### required props
- **reactions** -> [] containing the reaction types
- **userReactedToContent** -> {} key => ID of the comment/post value => [] of object having reaction with respect to user IDs
- **content_id** -> current post/comment ID
- **users** -> [] containing all users data
- **updateUserReactionOnEmoji** -> Fn => callback for API for updating reaction on server
- **removeUserReactionOnEmoji** -> Fn => callback for API for removing reaction on server
- **userHasReacted** -> {} => ID of the comment/post value => [] of object having reactions for current post/comment