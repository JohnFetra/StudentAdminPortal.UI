import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId : string | null | undefined;
  student : Student={
    id:'',
    firstName :'',
    lastName: '',
    dateOfBirth : '',
    email: '',
    mobile: '',
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id: '',
      physicalAdress:'',
      postalAdress:''
    }
  }

  constructor(private readonly studentService:StudentService,
              private readonly route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (successResponse) =>{
        this.studentId=successResponse.get('id');
        if(this.studentId){
          this.studentService.getStudent(this.studentId).subscribe({
            next: (successResponse) =>{
              this.student = successResponse;
            }
          });
        }
      },
      error: (errorResponse) =>
        console.error(errorResponse),
      complete: ()=>
        console.info('complete')
    });
  }

}
