import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender.models';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl='https://localhost:44353';
  constructor( private httpClient: HttpClient) { }

  getAllGender():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/gender')
  }
}
