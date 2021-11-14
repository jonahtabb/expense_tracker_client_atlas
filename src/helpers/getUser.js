export default async function getUser(
    userId,
    token
) {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/Accounts/${userId}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            })
        })
        const json = await res.json()
        if (res.status === 200) {
            console.log(await json)
            return await json
        } else {
            throw json
        }
        
    } catch (error) {
        return error
    }
}