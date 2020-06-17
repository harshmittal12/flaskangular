import { AttendanceService } from '../flaskapi.service'
import { Component, OnInit } from '@angular/core';
import { Attendance, Student } from '../models';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private attendanceService: AttendanceService, private router: Router) { }

  headers = ["attendance_date", "student_id", "status", "updated_by"];

  attendance: Attendance[]
  students: Student[]
  attendance_date: Date = new Date()

  public postForm = new FormGroup({
    student_name: new FormControl('', Validators.required),
    attendance_date: new FormControl('', Validators.required),
    status: new FormControl('',  Validators.required),
    updated_by: new FormControl('',  Validators.required),
  });

  getAttendances(): void {
    this.attendanceService.getAttendances().subscribe((attendances) => {
      this.attendance = attendances
      console.log(this.attendance)
    })
  }

  addAttendance(data): void {
    console.log(data)
    this.attendanceService.addAttendance(data).subscribe((result) => {
      console.log(result)
      this.getAttendances()
    })   
  }

  ngOnInit(): void {
    this.getAttendances()
  }

}
