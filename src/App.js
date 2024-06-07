// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from './pages/BoardList';
import AddPostForm from './pages/AddPostForm';
import EditPostForm from './pages/EditPostForm';
import PostDetail from './pages/PostDetail';

// App 컴포넌트에서 라우팅 설정
const App = () => {
  return (
      <BrowserRouter>
            <Routes>
                <Route index element={<BoardList />} /> {/* element={<BoardList />} :해당 URL로 접근할 때 렌더링할 컴포넌트를 지정 */}
                <Route path="/add" element={<AddPostForm />} />
                {/* 동적 라우팅 설정 */}
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/edit/:postId" element={<EditPostForm />} />
            </Routes>
        </BrowserRouter>
  );
};

export default App;
