import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  updatedData: any = {}; 
  view:any ={};
  userData: any;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.email],
      gender: [''],
      status: ['']
    });
    this.updatedData = { ...data }; // Copy the data to updatedData
  }

  ngOnInit() {
    const userId = this.data.userId;
    const dataWithId = { ...this.updatedData };
    const idValue = dataWithId.id;
    this.authService.getUser(idValue).subscribe(
      (response: any) => {
        this.view = response
        this.userData = response.id;
        console.log(this.view);
        console.log("works ",this.userData)
      },
      (error: any) => {
        console.log('Error fetching user data:', error);
      }
    );
  }

  updateUser() {
    const dataWithId = { ...this.updatedData };
  // delete dataWithoutId.id;
  const idValue = dataWithId.id;
  console.log('id : ',idValue);

    this.authService.putUser(idValue,this.updateForm.value).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.log('Error updating user:', error);
        // Handle the error
      }
    );
  }  
}
