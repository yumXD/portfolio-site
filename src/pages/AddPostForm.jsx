import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { addPost } from '../redux/modules/postReducer';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();  // useNavigate 훅 사용

    const handleSubmit = (e) => {
        e.preventDefault();

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
                <button type="submit">추가</button>
            </form>
        </div>

    );
};

export default AddPostForm;
