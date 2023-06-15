import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const { name, email } = this.loginForm.value;
    //   this.authservice.login(name, email).subscribe(
    //     response => {
    //       // Handle the response here
    //       console.log('response');
    //       console.log(response);
    //       this.router.navigate(['/userlogin']);
    //     },
    //     error => {
    //       // Handle error here
    //       console.error(error);
    //     });
    // } 
    console.log('not logged in');
    this.router.navigate(['/userlist']);

   }
}
