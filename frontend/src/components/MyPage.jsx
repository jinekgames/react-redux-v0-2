import React from 'react';
import User from "./User";
import userActionsCreators from "../actions/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router'

class MyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            (this.props.user.isLoggedIn) ?
            <User { ...{
                name: this.props.user.userName,
                email: this.props.user.userLogin,
            }}/>
            :
            <Redirect to='/'/>
        );
    }
}

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        userActionsCreators,
        dispatch,
    )
});

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(MyPage);

export default Wrapped;