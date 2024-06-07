// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from './pages/BoardList';
import AddPostForm from './pages/AddPostForm';
import EditPostForm from './pages/EditPostForm';
import PostDetail from './pages/PostDetail';

const App = () => {
  return (
      <BrowserRouter>
            <Routes>
                <Route index element={<BoardList />} />
                <Route path="/add" element={<AddPostForm />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/edit/:postId" element={<EditPostForm />} />
            </Routes>
        </BrowserRouter>
  );
};

export default App;
