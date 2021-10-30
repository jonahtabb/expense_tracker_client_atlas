import { useState } from "react";
import {LoginUser, RegisterUser} from "."


export default function Auth(props){
    const {updateToken} = props
    const [authType, setAuthType] = useState("register")

    return (
        <div>
            {
                authType === "register" ?
                <>
                    <button onClick={() => setAuthType("login")}>Already Registered? Login.</button>
                    <RegisterUser
                        authType={authType}
                        setAuthType={setAuthType}
                    />
                </>

                :
                <>
                    <button onClick={() => setAuthType("register")}>Not Registered? Register</button>
                    <LoginUser 
                        authType={authType}
                        setAuthType={setAuthType}
                        updateToken={updateToken}
                    />

                </>

            }
            
        </div>
    )
}