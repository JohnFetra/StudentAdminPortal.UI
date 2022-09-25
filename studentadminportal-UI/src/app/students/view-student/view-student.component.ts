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

  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';

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

          if(this.studentId.toLowerCase() === 'Add'.toLowerCase()){
            this.isNewStudent = true;
            this.header = "Add New Student";
            this.setImage();
          }else{
            this.isNewStudent = false;
            this.header = "Edit Student";
            this.studentService.getStudent(this.studentId)
            .subscribe({
              next: (successResponse) =>{
                this.student = successResponse;
                this.setImage();
              },
              error:()=>{
                this.setImage();
              }
            });
          }
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
      next: () =>{
        this.snackBar.open("Update successfully ",undefined, {
          duration:2000
        });
      },
      error: () =>{
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
      next:()=>{
        this.snackBar.open("Delete Successfully",undefined,{
          duration: 2000
        })
        setTimeout(()=>{
          this.router.navigateByUrl('students');
        },2000)
      },
      error:()=>{
        this.snackBar.open("Failed to Delete",undefined,{
          duration:2000
        })
      }
    })
  }
  onAdd():void{
    this.studentService.addStudent(this.student)
    .subscribe({
      next: (successResponse)=>{
        this.snackBar.open("Add successfully ",undefined, {
          duration:2000
        });
        setTimeout(()=>{
          this.router.navigateByUrl(`students/ ${successResponse.id}`);
        },2000)
      },
      error: (errorResponse) =>{
        this.snackBar.open("Add Failed",undefined,{
          duration: 2000
        });
      },
      complete: () =>{
        console.info('complete')
      }
    })
  }

  uploadImage(event:any):void{
    if(this.studentId){
      const file:File = event.target.files[0];
      this.studentService.uploadImage(this.student.id,file)
      .subscribe({
        next: (succesResponse)=>{
          console.log("ito",succesResponse)
            this.student.profileImageUrl= succesResponse;
            this.setImage();

            this.snackBar.open("Image Updated",undefined, {
              duration:2000
            });
        },
        error:(errorResponse)=>{

          this.snackBar.open("Failed to Update ",undefined, {
            duration:2000
          });
        }

      })
    }

  }

  private setImage():void{
    if(this.student.profileImageUrl){
      this.displayProfileImageUrl=this.studentService.getImagePath(this.student.profileImageUrl);
    }else{
      this.displayProfileImageUrl='/assets/images.png';
    }
  }

}
