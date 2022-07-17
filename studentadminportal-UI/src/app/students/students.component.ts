import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],

})
export class StudentsComponent implements OnInit {
  students:Student[] =[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','gender'];
  datasource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  //Pagination
  // @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  // @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  filterString='';

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    //fetch data Student
    this.studentService.getAllStudent()
      .subscribe(
        {
        next: (v) =>{
          this.students = v;
          this.datasource= new MatTableDataSource<Student>(this.students);
          if(this.matPaginator){
            this.datasource.paginator=this.matPaginator;
          }
          if(this.matSort){
            this.datasource.sort= this.matSort;
          }
        },
        error: (e) =>console.error(e),
        complete: ()=>console.info('complete')
      });
  }

  filterStudents(){
    this.datasource.filter = this.filterString.trim().toLowerCase();
  }

}
