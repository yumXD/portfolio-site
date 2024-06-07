import {createStore} from "redux";
// import {combineReducers} from "redux";
import postReducer from '../modules/postReducer';

// 여러 개의 리듀서를 사용
// const rootReducer = combineReducers({postReducer}); 
// const store = createStore(rootReducer);

// 단일 리듀서
const store = createStore(postReducer); 
export default store;