import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-ts';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiEdnpoint = "http://localhost:3000/courses";
  course: any;

  constructor(private http: HttpClient) {

   }

  getCourses(): Observable< Course[]> {
    return this.http.get<Course[]>(this.apiEdnpoint);
  }

  newCourse(course: Course): Observable<Course> {
    course.id = Guid.newGuid().toString();
    console.log(course);
    return this.http.post<Course>(this.apiEdnpoint,course);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiEdnpoint}/${id}`);
  }

  deleteCourse(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.apiEdnpoint}/${id}`);
  }
  
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiEdnpoint}/${course.id}`, course);
  }

}
