import { Auth } from "./auth";
import "./App.css";
import React, { useState, useEffect } from "react";
import {
    Route,
    Switch,
    Redirect,
    useLocation,
    useHistory,
} from "react-router-dom";
import queryString from "query-string";
import { verifyEmail } from "./helpers";
import { Header } from "./common";

function App() {
    const [token, setToken] = useState(null);
    const { pathname, search } = useLocation();
    let history = useHistory();

    const updateToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        } else {
          setToken(null)
        }
    };

    //When arriving via the verify email link, remove the token from the url
    useEffect(() => {
        const { token: emailVerifyToken } = queryString.parse(search);
        
        if (emailVerifyToken) {
            verifyEmail(emailVerifyToken);

            history.replace(pathname);
        }
    }, [search, history, pathname]);

    //Add token to state on load
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    return (
        <div className="App">
            <Header token={token} updateToken={updateToken} />

            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route path="/">
                    <Auth token={token} updateToken={updateToken} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
