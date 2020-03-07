import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable()
export class BlogService {

  options;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken(); 
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', 
        'authorization': this.authService.authToken 
      })
    });
  }

  newBlog(blog) {
    this.createAuthenticationHeaders(); 
    return this.http.post('http://localhost:3000/blogs/newBlog', blog, this.options)
    .pipe(map((response: any) => response.json()));

  }

  getAllBlogs() {
    this.createAuthenticationHeaders(); 
    return this.http.get('http://localhost:3000/blogs/allBlogs', this.options)
    .pipe(map((response: any) => response.json()));

  } 


    getSingleBlog(id) {
      this.createAuthenticationHeaders(); 
      return this.http.get('http://localhost:3000/blogs/singleBlog/' + id, this.options)
      .pipe(map((response: any) => response.json()));

    }
  
    editBlog(blog) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.put('http://localhost:3000/blogs/updateBlog/', blog, this.options)
      .pipe(map((response: any) => response.json()));

    }

    deleteBlog(id) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.delete('http://localhost:3000/blogs/deleteBlog/' + id, this.options)
      .pipe(map((response: any) => response.json()));  
      }

      likeBlog(id) {
        const blogData = { id: id };
        return this.http.put('http://localhost:3000/blogs/likeBlog/' , blogData, this.options)
        .pipe(map((response: any) => response.json()));     
        }
    
      dislikeBlog(id) {
        const blogData = { id: id };
        return this.http.put('http://localhost:3000/blogs/dislikeBlog/' , blogData, this.options)
        .pipe(map((response: any) => response.json()));       
          }


          postComment(id, comment) {
            this.createAuthenticationHeaders(); 
            const blogData = {
              id: id,
              comment: comment
            }
            return this.http.post('http://localhost:3000/blogs/comment' , blogData, this.options)
            .pipe(map((response: any) => response.json()));  
          }
}
