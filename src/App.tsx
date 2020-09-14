import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import {Login} from './modules/Login'

export const App = () => {
  const [logged, setLogged] = useState(false);

  const GetMsg = gql`
    query {
      messages {
        id
        text
        author {
          login
        }
      }
    }
  `;

  const logInHandler = (flag): void => {
    setLogged(flag);
  }

  const {loading, error, data} = useQuery(GetMsg);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {() => {if(!localStorage.getItem('User') && !logged)
            return <Login logInHandler = {logInHandler}/>
          else return <Redirect to='/messages' />}}
        </Route>
        <Route exact path="/messages">
          {()  => {
            if (error) return <p>error</p>
            if (loading) return <p>loading</p>
            
            return <ul>{data.messages.map((message) : any => {
              return <li key={message?.id}>{message?.text + " " + message?.author?.login}</li>
            })}</ul>
          }}
        </Route>
      </Switch>
    </Router>
  );
}
