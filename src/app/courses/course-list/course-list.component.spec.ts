import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { CourseListComponent } from './course-list.component';
import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'mat-card',
  template: ''
})
export class MovieItemMockComponent {
  @Input() course: Course | undefined;
}

export class MockCourseService {
  course = [
    {
      id: 'id-for-testing-number-one',
      title: 'CourseOne',
      description: 'New course for testing'
    },
    {
      id: 'id-for-testing-number-two',
      title: 'CourseTwo',
      description: 'New course for testing'
    },
    {
      id: 'id-for-testing-number-three',
      title: 'CourseThree',
      description: 'New course for testing'
    },
    {
      id: 'id-for-testing-number-four',
      title: 'CourseFour',
      description: 'New course for testing'
    }
  ];

  deleteCourse(id: string): Observable<undefined> {
    this.course = this.course.filter(m => m.id !== id);

    return of(undefined);
  }

  getCourses(): Observable<Course[]> {
    return of([...this.course])
  }
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 movie-item components', () => {
    component.courses = [
      {
        id: 'id-for-testing-number-one',
        title: 'CourseOne',
        description: 'New course for testing'
      },
      {
        id: 'id-for-testing-number-two',
        title: 'CourseTwo',
        description: 'New course for testing'
      },
      {
        id: 'id-for-testing-number-three',
        title: 'CourseThree',
        description: 'New course for testing'
      },
      {
        id: 'id-for-testing-number-four',
        title: 'CourseFour',
        description: 'New course for testing'
      }
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const nodeList = fixture.nativeElement.querySelectorAll('mat-card');
    const elements = Array.from(nodeList);

    expect(elements.length).toBe(5);
  });

  it('should have defined empty courses array when component is created', () => {
    expect(component.courses).toBeDefined();
    expect(component.courses).toHaveSize(0);
  });

  it('should have defined corses array with 0 items', () => {
    component.ngOnInit();

    expect(component.courses).toHaveSize(0);
  });
});
