import { apiEndPoints } from "../config";
import User from "../types/user.type";

function login(email: string, password: string) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    } as RequestInit;

    return fetch(apiEndPoints.login, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 406) {
                return response.json().then(error => {throw new Error(error.message[Object.keys(error.message)[0]][0])})
            } else {
                return response.json().then(error => {throw new Error(error.message)})
            }
        })
        .then(result => (result as {
            message: string
            currentUser: User
        }))

}

const AS = { login }
export default AS