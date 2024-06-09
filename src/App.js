// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from './pages/BoardList';
import AddPostForm from './pages/AddPostForm';
import EditPostForm from './pages/EditPostForm';
import PostDetail from './pages/PostDetail';
import Header from './pages/Header';
import Footer from './pages/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Content = styled.main`
    flex: 1;
    padding: 20px;
    /* overflow-y: hidden; */ // 안해도 되네
`;


// App 컴포넌트에서 라우팅 설정
const App = () => {
  return (
      <BrowserRouter>
      <AppContainer>
                <Header />
                <Content>
            <Routes>
                <Route index element={<BoardList />} /> {/* element={<BoardList />} :해당 URL로 접근할 때 렌더링할 컴포넌트를 지정 */}
                <Route path="/post" element={<AddPostForm />} />
                {/* 동적 라우팅 설정 */}
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/post/:postId/edit" element={<EditPostForm />} />
            </Routes>
                </Content>
                <Footer />
            </AppContainer>

        </BrowserRouter>
  );
};

export default App;
