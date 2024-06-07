import {createStore} from "redux";
// import {combineReducers} from "redux";
import postReducer from '../modules/postReducer';

// const rootReducer = combineReducers({postReducer}); // 여러 개의 리듀서를 사용
// const store = createStore(rootReducer);
const store = createStore(postReducer); // 단일 리듀서
export default store;