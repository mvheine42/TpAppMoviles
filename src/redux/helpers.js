import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reduxActionCreators from './actions/userActions'

function mapUserStateToProps(state){
    return {
        user: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(reduxActionCreators, dispatch)
    }
}

export function connectScreen(screenComponent){

    return connect(mapUserStateToProps, mapDispatchToProps)(screenComponent)
    
}