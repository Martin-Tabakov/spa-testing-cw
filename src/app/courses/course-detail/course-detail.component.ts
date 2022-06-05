import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course!: Course;
  id :string | null = "";

  isVisible:boolean = false;

  form!:FormGroup;

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private service: CourseService) {
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id) this.service.getCourse(this.id).subscribe(next => this.course = next);

    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: [this.course?.title, [ Validators.minLength(3)]],
      description: [this.course?.description, [Validators.maxLength(50)]]
    });
  }

  switchVisible(): void {
    this.isVisible = !this.isVisible;
  }

  submit(): void {
    if(this.form.get("title")) this.course.title = this.form.get("title")?.value;
    if(this.form.get("description")) this.course.description = this.form.get("description")?.value;

    this.service.updateCourse(this.course).subscribe();
  }

}
