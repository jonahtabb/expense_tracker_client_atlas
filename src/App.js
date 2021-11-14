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
    const [userId, setUserId] = useState(null)
    const [user, setUser] = useState(null);

    const { pathname, search } = useLocation();
    let history = useHistory();

    const updateUser = (userData) => {
        if (userData) {
            setUser(userData)
            setUserId(userData.id)
        }
    }

    const updateUserId = (userId) => {
        setUserId(userId)
    }

    const updateToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
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

        const userId = localStorage.getItem("userId")
        if (userId) {
            setUserId(userId)
        }
    }, []);

    return (
        <div className="App">
            <Header token={token} updateToken={updateToken} />

            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route path="/">
                    <Auth token={token} updateToken={updateToken} updateUser={updateUser} userId={userId} user={user} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
