import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from './reducers'
import thunk from "redux-thunk";
import { useLinkProps } from "@react-navigation/native";

const store = createStore(rootReducer, applyMiddleware(thunk)) //lo q se definio dentro del state de los reducers

export default store
