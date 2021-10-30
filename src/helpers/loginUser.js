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
        const json = await res.json()
        if (res.status === 200) {
            return await json
        } else {
            throw new Error(await json.message)
        }
        
    } catch (error) {
        return error
    }
}