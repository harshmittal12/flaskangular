import { AttendanceService } from '../flaskapi.service'
import { Component, OnInit } from '@angular/core';
import { Attendance, Student } from '../models';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [ ]
})
export class AttendanceComponent implements OnInit {

  constructor(private attendanceService: AttendanceService, private router: Router) { }

  headers = ["attendance_date", "student_id", "status", "updated_by"];

  attendance: Attendance[]
  students: Student[]
  attendance_date: Date = new Date()

  public searchForm = new FormGroup({
    date: new FormControl('', Validators.required),
    class_name: new FormControl('',  Validators.required),
  });

  getStudents(data: Object): void {
    this.attendanceService.getStudents(data).subscribe((students) => (this.students = students))
  }

  getAttendances(): void {
    this.attendanceService.getAttendances().subscribe((attendances) => {
      this.attendance = attendances
      console.log(this.attendance)
    })
  }

  getAttendancesBy(data): void {
    console.log(data)
    this.attendanceService.getAttendancesBy(data).subscribe((attendances) => {
      this.attendance = attendances
      console.log(this.attendance)
    })
  }

  //update (attendance: Attendance) {
  //  this.attendanceService.updateAttendance(attendance).subscribe()
  //}

  ngOnInit() {
    this.getAttendances()
  }


}
