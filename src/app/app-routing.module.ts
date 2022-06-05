import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';

const routes: Routes = [
  {path:'course-new',component:CourseNewComponent},
  {path:'course/:id',component:CourseDetailComponent},
  {path:'**', component:CourseListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
