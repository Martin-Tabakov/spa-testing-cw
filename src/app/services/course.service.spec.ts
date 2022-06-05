import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const expectedResponse = [
    {
      id: '123215316357-215135136',
      title: 'Course One',
      description: 'Course for beginers'
    },
    {
      id: '123215316357-215135135',
      title: 'Course Two',
      description: 'Course for intermediets'
    },
    {
      id: '123215316357-215135134',
      title: 'Course Three',
      description: 'Course for experts'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCourses() should return data', () => {
    service.getCourses().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(response.length).toEqual(expectedResponse.length);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('getCourse() should return single item if id exists in the list', () => {
    const expectedCourse = expectedResponse[0];

    service.getCourse(expectedCourse.id).subscribe((response) => {
      expect(response.id).toEqual(expectedCourse.id);
      expect(response.title).toEqual(expectedCourse.title);
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${expectedCourse.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedCourse);
  });

  it('getCourse() should return undefined if id does not exist', () => {
    service.getCourse('1000000000').subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1000000000');
    expect(req.request.method).toBe('GET');
  });

  it('deleteCourse() should send DELETE as response', () => {
    service.deleteCourse('123215316357-215135136').subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses/123215316357-215135136');
    expect(req.request.method).toBe('DELETE');
  });

  it('updateCourse() should send PUT as a response', () => {
    const courseToUpdate = {
      id: '1',
      title: 'Course to be update',
      description: 'Description for the course'
    };

    service.updateCourse(courseToUpdate).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('PUT');
  });

  it('updateCourse() should send POST as a response', () => {
    const movieToUpdate = {
      id: '1',
      title: 'Course to be posted',
      description: 'Description for the course'
    };

    service.newCourse(movieToUpdate).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
  });
});
