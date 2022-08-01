import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
              private snackBar:MatSnackBar,
              private router:Router) { }

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
  onUpdate():void{
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe({
      next: (successResponse) =>{
        this.snackBar.open("Update successfully ",undefined, {
          duration:2000
        });
      },
      error: (errorResponse) =>{
        this.snackBar.open("Failed to Update",undefined,{
          duration: 2000
        });
      },
      complete: () =>{
        console.info('complete')
      }
    })
  }
  onDelete():void{
    this.studentService.deleteStudent(this.student.id)
    .subscribe({
      next:(successResponse)=>{
        this.snackBar.open("Delete Successfully",undefined,{
          duration: 2000
        })
        setTimeout(()=>{
          this.router.navigateByUrl('students');
        },2000)
      },
      error:(errorResponse)=>{
        this.snackBar.open("Failed to Delete",undefined,{
          duration:2000
        })
      }
    })
  }

}
