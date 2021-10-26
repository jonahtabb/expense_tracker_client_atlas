export default async function loginUser(
    email,
    password
) {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/Accounts/authenticate`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        return await res.json()
    } catch (error) {
        return await error
    }
}