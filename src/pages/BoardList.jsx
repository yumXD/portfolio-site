import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// import postReducer from '../redux/modules/postReducer';

import styled from 'styled-components';

const BoardContainer = styled.div `
    display: block ; // 기본값
    padding: 5px; // 글자와 테두리의 간격을 위행
    max-width: 800px; // width: 800px; 비슷?
    margin: 0px auto; // 가로 중앙에 배치
`;

const AddPostButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold; // 700
    color: #f2e0e0;
    background-color: #8bae69;
    border: none;
    border-radius: 5px;
    text-decoration: none; // a 태그에 밑줄 지우기
    text-align: center;

    &:hover { // 사용자의 커서(마우스의 포인터)가 요소에 올라가 있을 때 적용
        background-color: #667f4c;
    }
`;

const PostList = styled.ul`
    background-color: #cac3c3;
    list-style: none; // 불릿 지우기
    padding: 40px; // 들여쓰기 없애기
    min-height: 55vh; // 최소 크기
    max-height: 55vh; // 최대 크기
    overflow-y: auto; // max-height 필수...
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

const PostItem = styled.li`
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;

    a {
        color: #0b3e75;
        text-decoration: none;

        &:hover { // 사용자의 커서(마우스의 포인터)가 요소에 올라가 있을 때 적용
            text-decoration: underline;
        }
    }
`;

const NoPostsMessage = styled.p`
    font-size: 1rem;
    color: #999;
    text-align: center;
`;

const Count = styled.p`
    display: inline-block;
    margin: 0 20px;
    font-size: 1.2rem;
    color: #666;
`;

const BoardList = () => {
    const posts = useSelector(state => state.posts); // 단일 리듀서
    // const posts = useSelector(state => state.postReducer.posts); // 여러 개의 리듀서를 사용

    return (
        <BoardContainer>
            <Count>총 게시글 수: {posts.length}</Count>
            <AddPostButton to="/post">게시물 추가</AddPostButton>
            {
                posts.length === 0
                    ? (<NoPostsMessage>게시물이 존재하지 않습니다.</NoPostsMessage>)
                    : (
                        <PostList>
                            {
                                posts.map(post => (
                                    <PostItem key={post.id}>
                                        <Link to={`/post/${post.id}`}>{"✔️ "+post.title}</Link>
                                    </PostItem>
                                ))
                            }
                        </PostList>
                    )
            }
        </BoardContainer>
    );
};

export default BoardList;
