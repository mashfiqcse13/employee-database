import { apiEndPoints } from "../config";
import Employee, { ApiEmployeeListResponse } from "../types/employee.type";

const endPoint = apiEndPoints.employees
export function list(token: string, page = 1) {
    if(token){
        console.log("Token Missing")
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    } as RequestInit;
    const url = endPoint + (page > 1 ? `?page=${page}` : "")

    return fetch(url, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return response.json().then(error => { throw new Error(error.message) })
            }
        })
        .then(response => response as ApiEmployeeListResponse)

}
export function create(employee: Employee, token: string) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("f_name", employee.f_name);
    formdata.append("l_name", employee.l_name);
    formdata.append("dob", employee.dob);
    formdata.append("phone", employee.phone);
    formdata.append("gender", employee.gender);
    formdata.append("skill_name", employee.skill_name);
    formdata.append("experience_in_years", employee.experience_in_years);
    formdata.append("skill_level", employee.skill_level);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    } as RequestInit;

    return fetch(endPoint, requestOptions)
        .then(response => response.json())
        .then(response => response as Employee)
}
export function update(employee: Employee, token: string) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("f_name", employee.f_name);
    formdata.append("l_name", employee.l_name);
    formdata.append("dob", employee.dob);
    formdata.append("phone", employee.phone);
    formdata.append("gender", employee.gender);
    formdata.append("skill_name", employee.skill_name);
    formdata.append("experience_in_years", employee.experience_in_years);
    formdata.append("skill_level", employee.skill_level);

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    } as RequestInit;

    return fetch(endPoint + "/" + employee.id, requestOptions)
        .then(response => response.json())
        .then(response => response as Employee)

}
export function view(id: Employee, token: string) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    } as RequestInit;

    return fetch(endPoint + "/" + id, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return response.json().then(error => { throw new Error(error.message) })
            }
        })
        .then(response => response as Employee)
}