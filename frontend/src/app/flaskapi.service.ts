import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Attendance, Student } from './models'

@Injectable({providedIn: 'root'})
export class AttendanceService {
    constructor(private http: HttpClient) { }

    public server:string = "http://localhost:5000/api/"

    getStudents (data: Object): Observable<Student[]> {
        return this.http.get<Student[]>(this.server + 'students', data)
    }

    public getAttendances() {
        return this.http.get<Attendance[]>(this.server + 'attendances')
    }

    public getAttendancesBy (data) {
        const {date, class_name} = data
        const formData: FormData = new FormData()
        formData.append("date", date)
        formData.append("class_name", class_name)
        return this.http.post<Attendance[]>(this.server + 'attendances/by', formData)
    }

    public addAttendance (data) {
        const {student_name, attendance_date,status, updated_by} = data
        const formData: FormData = new FormData()
        formData.append("student_name", student_name)
        formData.append("attendance_date", attendance_date)
        formData.append("status", status)
        formData.append("updated_by", updated_by)
        console.log(formData)
        return this.http.post<Attendance>(this.server + 'attendance/new', formData)
    }

    //updateAttendance (attendance: Attendance): Observable<{}> {
    //    const url = `api/attendance/${attendance.id}`
    //    return this.http.put<Attendance>(url, attendance)
    //}
}