import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Login} from './modules/Login';
import {Logout} from './modules/Logout';
import {Messages} from './modules/Messages'
import {ProtectedRoute} from './modules/ProtectedRoute'

export const App = () => {
  const [isLogged, SetIsLogged] = useState(false);
  const [isLogged2, SetIsLogged2] = useState(false);

  const loginHandler = (flag : boolean) => {
    SetIsLogged(flag);

    if(flag) {SetIsLogged2(flag)}
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {(isLogged || localStorage.getItem('UserID')) ?
            <Redirect to='/messages' />:
            <Login loginHandler={loginHandler} />}
        </Route>

        <ProtectedRoute exact path="/messages" flag = {isLogged || localStorage.getItem('UserID') || isLogged2} >
          <Messages />
          <Logout loginHandler={loginHandler} />
        </ProtectedRoute>

        <Route>
          <Redirect to='/404' />
          404 not found 
        </Route> 

      </Switch>
    </Router>
  );
}
