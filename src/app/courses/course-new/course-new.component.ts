import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.css']
})
export class CourseNewComponent implements OnInit {

  formGroup!: FormGroup;

  destroy$ = new Subject<boolean>();

  course?: Course;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      title: [this.course?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.course?.description, [Validators.maxLength(50)]]
    });
  }

  submit(): void {
    if (this.formGroup.invalid) {
      console.log(this.formGroup.errors);
      return;
    }

     this.courseService.newCourse(this.formGroup.value).subscribe({
       next: () => {
         this.router.navigate(['/']);
       }
      });
  }

}
