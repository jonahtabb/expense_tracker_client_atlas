import { useState } from "react";
import {LoginUser, RegisterUser} from "."
import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";


export default function Auth(props){
    const {token, updateToken} = props


    return (
        
            <Switch>
                {
                    token 
                    ?   <>
                            <Route path="/">
                                <Redirect to="/app" />
                            </Route>
                            <Route path="/app">
                                <h1>Logged in! Welcome to expense tracker</h1>
                            </Route>           
                        </>
                    :   <>
                        

                        <Route path="/register">
                            <RegisterUser />
                        </Route>

                        <Route path="/login">
                            <LoginUser
                                updateToken={updateToken}
                            />
                        </Route>

                        <Route path="/">
                            <Redirect to="/register" /> 
                        </Route>

                        </>
                }




            </Switch>
    )
}