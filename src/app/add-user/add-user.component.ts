import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser: any = {};
  userForm: FormGroup;
  success: boolean = false;
  failed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the userForm FormGroup with form controls and validators
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    // Check if the userForm is valid
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // Call the addUser method of the authService to add the user
      this.authService.addUser(formData).subscribe(
        (response) => {
          console.log(response);
          this.success = true;
        },
        (error) => {
          // Handle the error
          console.log(error);
          this.failed = true;
        }
      );
    }
    // Reset the success and failed flags
    this.success = false;
    this.failed = false;
  }

  goback() {
    // Navigate back to the userlist route
    this.router.navigate(['/userlist']);
  }
}
