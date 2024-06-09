import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editPost} from '../redux/modules/postReducer';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    min-height: 600px; // !
    margin: 0 auto;
    background-color: #cac3c3;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 3rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #555;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none;
    }
`;

const Textarea = styled.textarea`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    height: 250px;
    resize: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #8bae69;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    &:hover:not(:disabled) {
        background-color: #667f4c;
    }
`;

const CancelLink = styled(Link)`
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

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
         <FormContainer>
            <Title>게시물 수정</Title>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">제목:</Label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        placeholder="제목을 입력해주세요."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">내용:</Label>
                    <Textarea
                        id="content"
                        value={content}
                        placeholder="내용을 입력해주세요."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormGroup>
                <ButtonGroup>
                <SubmitButton type="submit" disabled={!isFormValid}>
                    수정
                </SubmitButton>
                <CancelLink to={`/post/${post.id}`}>취소</CancelLink>
                </ButtonGroup>            
            </StyledForm>
        </FormContainer>
    );
};

export default EditPostForm;
