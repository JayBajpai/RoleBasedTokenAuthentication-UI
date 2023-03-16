import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService:UserService,
    private userAuthService: UserAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
login(loginForm: NgForm){
 this.userService.login(loginForm.value).subscribe(
 (Response:any)=> {
  // console.log(Response.jwtToken);
  // console.log(Response.user.role);

  this.userAuthService.setRoles(Response.user.role);
  this.userAuthService.setToken(Response.jwtToken)

  const role = Response.user.role[0].roleName
  if(role === 'Admin'){
    this.router.navigate(['/admin'])
  }else{
    this.router.navigate(['/user'])
  }
},
 (Error)=>{
  console.log(Error);}
 );
}
}
