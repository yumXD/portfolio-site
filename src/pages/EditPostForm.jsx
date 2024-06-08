import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editPost} from '../redux/modules/postReducer';
import {Link, useNavigate, useParams} from 'react-router-dom';

const EditPostForm = () => {
    const {postId} = useParams(); // 동적 파라미터 사용
    const post = useSelector(
        state => state.posts.find(p => p.id === parseInt(postId))
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태

    // 게시물 정보를 상태에 설정
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    useEffect(() => {
        // 제목이 10글자 이상이고, 내용이 비어있지 않으면 폼이 유효하다고 설정
        // setIsFormValid(title.length >= 10 && content.length > 0);

        setIsFormValid(title.trim().length > 0 && content.trim().length > 0);
    }, [title, content]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!post) 
            return; // If post is not found, do nothing

        if (title.length < 10) {
            alert('제목은 10글자 이상이어야 합니다.');
            return;
        }

        const updatedPost = {
            title: title,
            content: content
        };
        
        dispatch(editPost(post.id, updatedPost));
        navigate(`/post/${post.id}`);
    };

    if (!post) {
        return <p>해당 게시물을 찾을 수 없습니다.</p>;
    }

    return (
        <div>
            <h2>게시물 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                </div>
                <button type="submit" disabled={!isFormValid}>수정</button>
                <Link to={`/post/${post.id}`}>취소</Link>
            </form>
        </div>
    );
};

export default EditPostForm;
