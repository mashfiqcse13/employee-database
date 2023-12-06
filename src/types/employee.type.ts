
type Employee = {
    id:number
    f_name: string
    l_name: string
    dob: string
    phone: string
    gender: string
    skill_name: string
    experience_in_years: number
    skill_level: "Beginner" | "Intermediate" | "Advanced"
}
export type ApiEmployeeListResponse = {
    current_page:number
    data:Employee[]
    last_page:number
    per_page:number
    total:number
}
export default Employee