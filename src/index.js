import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from "./redux/config/configStore";
import {Provider} from "react-redux";

// 리액트DOM에서 root를 가져와서 root 변수에 할당
const root = ReactDOM.createRoot(document.getElementById('root'));

// Provider를 통해 Redux 스토어를 리액트 애플리케이션에 연결
root.render(<Provider store={store}>
    <App/>
</Provider>);

// 성능 측정을 위한 코드
reportWebVitals();
