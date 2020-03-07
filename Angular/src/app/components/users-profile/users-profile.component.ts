import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  users: any = [];

  constructor(private authService:AuthService, private router:Router) { }
  

  ngOnInit() {
    this.authService.getUsers().subscribe(allprofiles => {
      this.users = allprofiles;
    },
     err => {
       console.log(err);
       return false;
     });
  }

  getUsers() {
    this.authService.getUsers().subscribe(allprofiles => {
      this.users = allprofiles;
    },
     err => {
       console.log(err);
       return false;
     });
  }
}