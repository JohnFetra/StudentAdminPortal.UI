import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-resuest.model';

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
  updateStudent(studentId:string, studentRequest:Student):Observable<Student>{

    const updateStudentRequest:UpdateStudentRequest = {
      firstName : studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      PhysicalAddress: studentRequest.address.physicalAddress,
      PostalAddress: studentRequest.address.postalAddress

    }
    return this.HttpClient.put<Student>(this.baseApiUrl+ "/student/" + studentId,updateStudentRequest);
  }
}
