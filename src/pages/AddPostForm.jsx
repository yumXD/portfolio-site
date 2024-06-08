import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {addPost} from '../redux/modules/postReducer';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태

    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        // 제목이 10글자 이상이고, 내용이 비어있지 않으면 폼이 유효하다고 설정
        // setIsFormValid(title.length >= 10 && content.trim().length > 0);

        setIsFormValid(title.trim().length > 0 && content.trim().length > 0);
    }, [title, content]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.length < 10) {
            alert('제목은 10글자 이상이어야 합니다.');
            return;
        }

        const newPost = {
            title: title,
            content: content
        };

        dispatch(addPost(newPost));

        setTitle('');
        setContent('');
        navigate('/');
    };

    return (
        <div>
            <Link to="/">게시물 목록으로 돌아가기</Link>
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
                <button type="submit" disabled={!isFormValid}>추가</button>
            </form>
        </div>

    );
};

export default AddPostForm;
