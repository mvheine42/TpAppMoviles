import { legacy_createStore as createStore } from "redux";
import rootReducer from './reducers'
import thunk from "redux-thunk";


const middleware = [thunk]
const store = createStore(rootReducer, ...middleware)
export default store


/// si hacemos de la forma de la clase nos tira error del middleware

//import { applyMiddleware, legacy_createStore as createStore } from "redux";
//import rootReducer from './reducers'
//import thunk from "redux-thunk";

//const store = createStore(rootReducer, applyMiddleware(thunk)) //lo q se definio dentro del state de los reducers

//export default store
