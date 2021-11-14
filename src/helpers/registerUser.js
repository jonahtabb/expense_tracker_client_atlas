export default async function registerUser(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    acceptTerms
) {
    try {
        console.log("REGISTER USER FIRED!");
        let res = await fetch(
            `${process.env.REACT_APP_API_URL}/Accounts/register`,
            {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    acceptTerms,
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            }
        );

        return await res.json();
    } catch (error) {
        return await error;
    }
}
