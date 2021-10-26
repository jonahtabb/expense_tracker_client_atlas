import { loginUser } from "../helpers";
import { useState } from "react";

const loginFormFields = [
    {propName: "email", label: "Email", type: "text"},
    {propName: "password", label: "Password", type: "text"}
]

export default function Loginuser(){
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
        console.log(res)
    }

    return(
        <div className="auth">
            <h2>Login</h2>
            <form
                onSubmit={e => {e.preventDefault(); handleSubmit(e)}}
            >
                {
                    loginFormFields.map((field => (
                        <label key={field.propName}>
                            {field.label}
                            <input 
                                type={field.type}
                                name={field.propName}
                                value={state[field.propName]}
                                onChange={(e) => handleUpdateInput(e)}
                            />
                        </label>
                        
                    )))
                }
                <button type="submit">Login</button>

            </form>
        </div>
    )

}