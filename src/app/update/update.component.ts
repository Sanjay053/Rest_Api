import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updatedData: any = {}; 
  userData: any;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedData = { ...data }; // Copy the data to updatedData
  }

  ngOnInit() {
    const userId = this.data.userId;
    this.authService.getUser(userId).subscribe(
      (response: any) => {
        this.userData = response.data;
      },
      (error: any) => {
        console.log('Error fetching user data:', error);
      }
    );
  }

  // onSaveClick(): void {
  //   this.authService.updateUser(this.userData).subscribe(
  //     (response: any) => {
  //       console.log('User updated successfully:', response);
  //       this.dialogRef.close();
  //     },
  //     (error: any) => {
  //       console.log('Error updating user:', error);
  //     }
  //   );
  // }

  updateUser() {
    this.authService.updateUser(this.updatedData).subscribe(
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

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
