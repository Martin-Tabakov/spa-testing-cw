import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CourseNewComponent } from './course-new.component';

describe('CourseNewComponent', () => {
  let component: CourseNewComponent;
  let fixture: ComponentFixture<CourseNewComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CourseNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assert that the form has only 2 fields', () => {
    component.ngOnInit();

    expect(Object.keys(component.formGroup.controls).length).toBe(2);
  });

  it('shoud have false returned for title field with wrong credentials', () => {
    component.ngOnInit();
    expect(component.formGroup.get('title')?.valid).toBeFalse();

    component.formGroup.get('title')?.setValue('Te');

    expect(component.formGroup.get('title')?.valid).toBeFalse();
  });

  it('shoud have false returned for description field with wrong credentials', () => {
    component.ngOnInit();
    expect(component.formGroup.get('description')?.valid).toBeTrue();

    component.formGroup.get('description')?.setValue('Tqwertyuiop[]asdfghjkl;zxcvbnm,./qazswsxdedcfrfvbgtghbnhyhjmjiuk,ol.qwertyuiopasdfghjklzxcvbnm,vaduyfveyvsevbysbvbsirvbsrbvisrbisbisurbirs');

    expect(component.formGroup.get('description')?.valid).toBeFalse();
  });
});
