export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const addPost = (post) => ({type: ADD_POST, post});

export const editPost = (postId, updatedPost) => (
    {type: EDIT_POST, postId, updatedPost}
);

export const deletePost = (postId) => ({type: DELETE_POST, postId});

const initialState = {
  posts: [
    { id: 1, title: '첫 번째 게시물', content: '내용 1' },
    { id: 2, title: '두 번째 게시물', content: '내용 2' },
    { id: 3, title: '세 번째 게시물', content: '내용 3' }
  ]
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        ...action.post,
        id: state.posts.length ? state.posts[state.posts.length - 1].id + 1 : 1
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId ? { ...post, ...action.updatedPost } : post
        )
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      };
    default:
      return state;
  }
};

export default postReducer;
