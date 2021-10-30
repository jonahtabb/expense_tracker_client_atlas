import {registerUser} from '../helpers'
import { useState } from "react"
import { FormGroup, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'

const registrationFormFields = [
    {propName: "firstName", label: "First Name", type: "text"},
    {propName: "lastName", label: "Last Name", type: "text"},
    {propName: "email", label: "Email", type: "text"},
    {propName: "password", label: "Password", type: "text"},
    {propName: "confirmPassword", label: "Confirm Password", type:"text"},
    {propName: "acceptTerms", label: "Accept Terms", type:"checkbox" }
]
    
export default function RegisterUser(){

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: true
    })

    const handleUpdateInput = (e) => {
        const target = e.target ;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value ;
        const fieldName = target.name ;
        
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

        setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false
        })
    }

    return(
        <div className="auth">
            <h2>Register</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit(e)} }>
                {
                    registrationFormFields.map((field => 
                    {
                        if(field.type === "text") {
                            return(
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
                            )
                        } else {
                            return(
                                <FormGroup key={field.propName}>
                                    <FormControlLabel 
                                        control={<Checkbox defaultChecked onClick={(e) => handleUpdateInput(e)}/>} 
                                        label={field.label}
                                    />
                                </FormGroup>
                            )
                        }

                    }

                       
                    
                    ))
                }         
                <Button type="submit" variant="contained">Register</Button>
            </form>
        </div>
    )
}