import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course';

import { CourseDetailComponent } from './course-detail.component';

export class MockCourseService {
  course = [
    { 
      id: 'id-for-testing-number-one',
      title: 'CourseOne', 
      description: 'New course for testing' 
    }
  ];
}

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assert that the form has 2 fields', () => {
    component.ngOnInit();

    expect(Object.keys(component.form.controls).length).toBe(2);
  });

  it('shoud have false returned for title field with wrong credentials', () => {
    component.ngOnInit();
    expect(component.form.get('title')?.valid).toBeTrue();

    component.form.get('title')?.setValue('Te');

    expect(component.form.get('title')?.valid).toBeFalse();
  });

  it('shoud have false returned for description field with wrong credentials', () => {
    component.ngOnInit();
    expect(component.form.get('description')?.valid).toBeTrue();

    component.form.get('description')?.setValue('Tqwertyuiop[]asdfghjkl;zxcvbnm,./qazswsxdedcfrfvbgtghbnhyhjmjiuk,ol.qwertyuiopasdfghjklzxcvbnm,vaduyfveyvsevbysbvbsirvbsrbvisrbisbisurbirs');

    expect(component.form.get('description')?.valid).toBeFalse();
  });

  it('Should change the visibility of the form', () => {
    component.switchVisible();

    expect(component.isVisible).toBe(true);
  });

});
