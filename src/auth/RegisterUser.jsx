import {registerUser} from '../helpers'
import { useState } from "react"

const registrationFormFields = [
    {propName: "firstName", label: "First Name", type: "text"},
    {propName: "lastName", label: "Last Name", type: "text"},
    {propName: "email", label: "Email", type: "text"},
    {propName: "password", label: "Password", type: "text"},
    {propName: "confirmPassword", label: "Confirm Password", type:"text"},
    {propName: "acceptTerms", label: "Accept Terms", type:"checkbox" }
]
    
export default function TestComp1(){

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    })

    const handleUpdateInput = (e) => {
        const target = e.target ;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value ;
        const fieldName = e.target.name ;
        
        setState((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }))
    }

    const handleSubmit = async () => {
        const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                acceptTerms
        } = state

        let res = await registerUser(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            acceptTerms
        )
        console.log(res)
    }

    return(
        <div className="test-comp-1">
            <h2>Register</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit()} }>
                {
                    registrationFormFields.map((field => (
                        <label key={field.propName}>
                            {field.label}
                            <input 
                                type={field.type}
                                name={field.propName}
                                value={state[field.propName]}
                                onChange={(e) => handleUpdateInput(e)}
                                required
                            />
                        </label>
                    )))
                }         
                <button type="submit">Register</button>
            </form>
        </div>
    )
}