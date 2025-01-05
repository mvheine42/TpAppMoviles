import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    users: userReducer, //objeto
})
export default rootReducer