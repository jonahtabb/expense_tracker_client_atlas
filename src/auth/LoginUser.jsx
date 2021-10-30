import { loginUser } from "../helpers";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

const loginFormFields = [
    {propName: "email", label: "Email", type: "text"},
    {propName: "password", label: "Password", type: "text"}
]

export default function LoginUser(props){
    const {updateToken} = props;
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleUpdateInput = (e) => {
        const target = e.target;
        const fieldValue = target.value;
        const fieldName = target.name;

        setState((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }))
    }

    const handleSubmit = async () => {
        const {email, password} = state

        let res = await loginUser(email, password)

        if (res instanceof Error){
            console.error(res)
        } else {
            console.log(await res)
            const token = await res.jwtToken;
            console.log(token)
            localStorage.setItem("token", token)
            updateToken(token)
            setState({
                email: '',
                password:''
            })
        }

        
        
    }

    return(
        <div className="auth">
            <h2>Login</h2>
            <form
                onSubmit={e => {e.preventDefault(); handleSubmit(e)}}
            >
                {
                    loginFormFields.map((field => (

                        <TextField
                        key={field.propName}
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        margin="normal"
                        type={field.type}
                        name={field.propName}
                        value={state[field.propName]}
                        onChange={(e) => handleUpdateInput(e)}
                        required
                    />

                        
                    )))
                }
                <Button type="submit" variant="contained">Login</Button>

            </form>
        </div>
    )

}