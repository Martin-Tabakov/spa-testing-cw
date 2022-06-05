import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';

import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];
  constructor(private courseService:CourseService) {
    this.courses = [];
   }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      result => this.courses = result
    );
  }

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== id);
       } 
      }
    );
  }

}
