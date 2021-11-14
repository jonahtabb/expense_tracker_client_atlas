export default async function verifyEmail(token) {
    try {
        console.log(token);
        let res = await fetch(
            `${process.env.REACT_APP_API_URL}/Accounts/verify-email`,
            {
                method: "POST",
                body: JSON.stringify({
                    token,
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            }
        );
        console.log(await res);
        return await res.json();
    } catch (error) {
        console.log("CATCH");
        console.error(await error);
        return await error;
    }
}
