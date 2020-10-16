import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const ProtectedRoute = ({children, ...rest}) => {
    if (rest.flag) {
        return (
        <Route {...rest.path} >
            {children}
        </Route>
        )
    }
    else {
        console.log(children);
        return (
            <Redirect to='/404' />
        )
    }
}