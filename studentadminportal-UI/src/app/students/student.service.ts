import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 private baseApiUrl='https://localhost:44353';
  constructor(private HttpClient: HttpClient) { }

  getAllStudent(): Observable<Student[]>{
    return this.HttpClient.get<Student[]>(this.baseApiUrl + '/Student');
  }
  getStudent(studentId:string) : Observable<Student>{
    return this.HttpClient.get<Student>(this.baseApiUrl+ "/student/" + studentId)
  }
}
