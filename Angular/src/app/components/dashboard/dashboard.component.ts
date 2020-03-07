import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  post:Object;
  message: String;
  
  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,

    private router:Router) { }

  ngOnInit() {

  }

  onPostSubmit(){
    const post = {
    }

    // Register user
    this.authService.registerPost(post).subscribe(data => {
      if(data._id){
        this.flashMessage.show('Data posted', {cssClass: 'alert-success', timeout: 300});
        this.router.navigate(['/message']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 300});
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
