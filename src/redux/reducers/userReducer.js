import { LOG_USER_FAILURE, LOG_OUT, LOG_USER_SUCCESS, LOG_USER_PENDING } from "../actionTypes/userActionTypes"

const initialState = {
    user: {},
    isFetching: false,
    error: false,
    isLoggedIn: false,
    currentTrip: 0,
    }
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_USER_PENDING:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: true,
                error: false,
                }
        case LOG_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                isLoggedIn: true,
                user: action.payload,
                }
        case LOG_USER_FAILURE:
        return {
            ...state,
            isFetching: false,
            error: action.payload,
            isLoggedIn: false,
            }
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                }
        default:
            return state;

    }
}