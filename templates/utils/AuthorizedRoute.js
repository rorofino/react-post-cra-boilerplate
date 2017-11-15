import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const renderedContent = (props) => {
    const {component : Component, isAuthenticated, location } = props;
    if (isAuthenticated) {
        return <Component {...props}  />;
    } else {
        return <Redirect to={{pathname: '/login', state: { from: location }}} />;
    }
}

const RequireLoginRoute = (props) => {
    return <Route path={props.path} render={() => renderedContent(props)} /> 
};

export default connect(state => ({isAuthenticated: state.auth.loggedUser != null}))(RequireLoginRoute);