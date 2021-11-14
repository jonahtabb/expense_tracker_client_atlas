import { useState, useEffect } from "react";
import { LoginUser, RegisterUser } from ".";
import { getUser } from "../helpers";
import {Box} from '@mui/material';

import {
    Route,
    Switch,
    Redirect,
    useLocation,
    useHistory,
} from "react-router-dom";

export default function Auth(props) {
    const { token, updateToken, updateUser, userId, user } = props;

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        const localUserId = localStorage.getItem("userId");
        if (localToken && localUserId) {
            console.log(userId, token)
            getUser(localUserId, localToken)
        }
    }, [userId, token]);
    
    const {firstName, lastName, email } = user || ''

    return (
        <Switch>
            {token ? (
                <>
                    <Route path="/">
                        <Redirect to="/app" />
                    </Route>
                    <Route path="/app">
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}} >
                            <h1>Welcome {firstName || ''}!</h1>
                        </Box>
                        
                    </Route>
                </>
            ) : (
                <>
                    <Route path="/register">
                        <RegisterUser />
                    </Route>

                    <Route path="/login">
                        <LoginUser updateToken={updateToken} updateUser={updateUser} />
                    </Route>

                    <Route path="/">
                        <Redirect to="/register" />
                    </Route>
                </>
            )}
        </Switch>
    );
}
