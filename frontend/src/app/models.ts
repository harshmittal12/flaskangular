export interface Student {
    student_id: number
    student_fname: string
    student_lname: string
    gender: string
    class: string
    dob: Date
}

export interface Attendance {
    id?: number 
    attendance_date?: Date
    student_name: string
    status: string
    remarks?: string
    updated_by: string
}