export default async function getUsers(token) {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/Accounts`, {
            method: "GET",

            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
        });
        console.log(await res.json())
        return await res.json();
    } catch (error) {
        return await error;
    }
}
