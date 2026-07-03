// Get api
// user
export async function getApi(name) {
    try {
        console.log("name: ", name);
        
        let response = await fetch(`http://localhost:3000/${name}`);
        if (response.ok) {
            let data = await response.json();
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
}
// getApi('users');


