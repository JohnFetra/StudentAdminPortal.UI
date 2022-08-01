import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/service/gender.service';
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
    mobile: 0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id: '',
      physicalAddress:'',
      postalAddress:''
    }
  }
  genderList : Gender[] = [];

  constructor(private readonly studentService:StudentService,
              private readonly route : ActivatedRoute,
              private readonly genderService:GenderService,
              private snackBar:MatSnackBar) { }

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

          this.genderService.getAllGender().subscribe({
            next : (successResponseGender) =>{
              this.genderList= successResponseGender;
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
  UpdateStudent():void{
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe({
      next: (successResponse) =>{
        this.snackBar.open("Update successfully ",undefined, {
          duration:2000
        });
      },
      error: (errorResponse) =>{
        this.snackBar.open("Failed to Update");
      },
      complete: () =>{
        console.info('complete')
      }
    })
  }

}
