import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// import postReducer from '../redux/modules/postReducer';

const BoardList = () => {
    const posts = useSelector(state => state.posts); // 단일 리듀서
    // const posts = useSelector(state => state.postReducer.posts); // 여러 개의 리듀서를 사용

    return (
        <div>
            <h2>게시물 목록</h2>
            <Link to="/add">게시물 추가</Link>
            {
                posts.length === 0
                    ? (<p>게시물이 존재하지 않습니다.</p>)
                    : (
                        <ul>
                            {
                                posts.map(post => (
                                    <li key={post.id}>
                                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </div>
    );
};

export default BoardList;
