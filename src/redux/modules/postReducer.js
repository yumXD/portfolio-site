export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

// 게시물 추가 액션 생성자
export const addPost = (post) => ({type: ADD_POST, post});

// 게시물 수정 액션 생성자
export const editPost = (postId, updatedPost) => (
    {type: EDIT_POST, postId, updatedPost}
);

// 게시물 삭제 액션 생성자
export const deletePost = (postId) => ({type: DELETE_POST, postId});

// 초기 상태 설정
const initialState = {
  posts: [
    { id: 1, title: '첫 번째 게시물입니다.ㅎㅎ', content: '내용 1' },
    { id: 2, title: '두 번째 게시물입니다.ㅎㅎ', content: '내용 2' },
    { id: 3, title: '세 번째 게시물입니다.ㅎㅎ', content: '내용 3' }
  ]
};

// 리듀서 함수
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      /**
       * action.post를 기반으로 newPost 객체를 생성한다. 
       * 여기서 id는 현재 posts 배열의 마지막 게시물의 id에 1을 더한 값. 
       * 만약 배열이 비어있으면 id는 1이 된다.
       */
      const newPost = {
        ...action.post,
        id: state.posts.length ? state.posts[state.posts.length - 1].id + 1 : 1
      };
      /**
       * 새로운 posts 배열을 반환. 
       * 기존 posts 배열에 newPost를 추가한다.
       */
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    case EDIT_POST:
      /**
       * posts 배열을 map 함수로 순회한다.
       * 각 게시물의 id가 action.postId와 일치하면 해당 게시물을 action.updatedPost로 업데이트한다.
       * 일치하지 않는 게시물은 변경하지 않고 그대로 반환한다.
       */
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId ? { ...post, ...action.updatedPost } : post
        )
      };
    case DELETE_POST:
      /**
       * posts 배열을 filter 함수로 순회한다.
       * post.id가 action.postId와 일치하지 않는 게시물만 남긴다.
       */
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      };
      /**
       * switch문에서 정의된 액션 타입에 해당하지 않는 경우, 현재 상태를 그대로 반환한다.
       */
    default:
      return state;
  }
};

export default postReducer;
