import {Auth} from './auth'
import './App.css';
import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import { verifyEmail } from './helpers';
import { useHistory } from "react-router-dom";


function App() {

  const [token, setToken] = useState(null)
  const { pathname, search } = useLocation()
  let history = useHistory()
  console.log(useLocation())
  console.log(history)

  const updateToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      setToken(token)
    }
  }

  useEffect(() => {

    const { token: emailVerifyToken } = queryString.parse(search);
    console.log(search)
    if (emailVerifyToken) {

      verifyEmail(emailVerifyToken)

      history.replace(pathname)
    }

  }, [search, history, pathname])

  //Add token to state on load
  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if(localToken){
      setToken(localToken)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      <h1>Expense Tracker</h1>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route path="/"> 
          <Auth updateToken={updateToken}/>
        </Route>
      </Switch>
     
      </header>
    </div>
  );
}

export default App;
