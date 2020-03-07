import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';



@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  users: any;


  post: any;
  options;


  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
    .pipe(map((response: any) => response.json()));
  }
  registerPost(post){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/dashboard', post,{headers: headers})
    .pipe(map((response: any) => response.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
    .pipe(map((response: any) => response.json()));
  }
  authenticatePost(post){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/dashboard', post,{headers: headers})
    .pipe(map((response: any) => response.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .pipe(map((response: any) => response.json()));
  }

   getUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/users', {headers: headers})
    .pipe(map((response: any) => response.json()));
  }
 
  // public getUsers() {
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get('http://localhost:3000/users/users', {headers: headers})
  //   .pipe(map((response: any) => response.json()));
  // }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  storePostData(token, post){
    localStorage.setItem('id_token', token);
    localStorage.setItem('post', JSON.stringify(post));
    this.authToken = token;
    this.post = post;
  }

  getMsg() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/dashboard', {headers: headers})
    .pipe(map((response: any) => response.json()));
  }

  getAllProfiles() {
    this.authenticateUser(this.user); // Create headers
    return this.http.get('http://localhost:3000/blogs/allProfiles', this.options)
    .pipe(map((response: any) => response.json()));

  } 

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token; 
}

loggedIn() {
  return tokenNotExpired('id_token');
}

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}

