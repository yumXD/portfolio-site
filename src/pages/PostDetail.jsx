import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { deletePost } from '../redux/modules/postReducer';
import styled from 'styled-components';

const DetailContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    min-height: 600px;
    margin: 0 auto;
    background-color: #cac3c3;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

const Content = styled.p`
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
    min-height: 450px;
    max-height: 450px;
    overflow-y: auto;
    word-wrap: break-word; /* Prevent overflow */
    white-space: pre-wrap; /* Preserve whitespace and line breaks */
    padding: 20px;
    background-color: #f8f4f4;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;


const DeleteButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #e37883;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        background-color: #ae6169;
    }
`;

const EditLink = styled(Link)`
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #8bae69;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    &:hover {
        background-color: #667f4c;
    }
`;

const BackLink = styled(Link)`
    display: block;
    margin-top: 10px;
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

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
        <DetailContainer>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            <EditLink to={`/edit/${post.id}`}>게시물 수정하기</EditLink>
            <BackLink to="/">게시물 목록으로 돌아가기</BackLink>
        </DetailContainer>
    );
};

export default PostDetail;
