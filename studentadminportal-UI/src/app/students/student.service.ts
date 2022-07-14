import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 private baseApiUrl='https://localhost:44353';
  constructor(private HttpClient: HttpClient) { }

  getAllStudent(): Observable<any>{
    return this.HttpClient.get<any>(this.baseApiUrl + '/Student');
  }
}
