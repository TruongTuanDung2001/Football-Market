import { getApi } from "../../api/api.js";

const apiUsers = await getApi('users')

export async function getAllUsers(){
    console.log(apiUsers);
    
}
