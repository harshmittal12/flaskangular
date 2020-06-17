import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AttendanceComponent],  
  imports: [
    AttendanceRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AttendanceModule { }