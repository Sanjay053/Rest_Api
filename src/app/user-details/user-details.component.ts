import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  editdata:any;
  constructor(@Inject(MAT_DIALOG_DATA) public userData: any,
  private authService: AuthService
  ) { }

  ngOnInit(): void { 
   
    }
  }
