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
  success:boolean = false
  failed:boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.authService.addUser(formData).subscribe(
        (response) => {
          console.log(response);
          this.success = true
        },
        (error) => {
          // Handle the error
          console.log(error);
          this.failed = true
        }        
      );
    }
    this.success = false;
        this.failed = false;
  }

  goback(){
    this.router.navigate(['/userlist'])
  }
}
