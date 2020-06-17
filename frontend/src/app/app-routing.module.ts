import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "teacher", loadChildren: () => import("./attendance/attendance.module").then(m => m.AttendanceModule)},
  {path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
