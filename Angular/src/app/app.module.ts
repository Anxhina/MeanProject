import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';



import {RouterModule, Routes} from '@angular/router'; 



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FirstPageComponent } from './components/first-page/first-page.component';


import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';



import { FlashMessagesModule } from 'angular2-flash-messages';
import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { BlogComponent } from './components/blog/blog.component';

import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';


const appRoutes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'', component: FirstPageComponent},
  {path:'users', component: UsersProfileComponent, canActivate: [AuthGuard]},
  {path:'blog', component: BlogComponent, canActivate: [AuthGuard]},

  {path:'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard]},
  {path:'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard]},

]

 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FirstPageComponent,
    UsersProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,

  ],
  imports: [
    ReactiveFormsModule, // -> this registers the formbuilder service for your module
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, BlogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
