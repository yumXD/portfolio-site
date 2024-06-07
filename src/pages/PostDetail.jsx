import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { deletePost } from '../redux/modules/postReducer';

const PostDetail = () => {
    const {postId} = useParams();
    const post = useSelector(
        state => state.posts.find(p => p.id === parseInt(postId))
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!post) {
        return <p>해당 게시물을 찾을 수 없습니다.</p>;
    }

    const handleDelete = () => {
        dispatch(deletePost(post.id));
        navigate('/');
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={handleDelete}>삭제</button>
            <br/>
            <Link to={`/edit/${post.id}`}>게시물 수정하기</Link>
            <br/>
            <Link to="/">게시물 목록으로 돌아가기</Link>
        </div>
    );
};

export default PostDetail;
