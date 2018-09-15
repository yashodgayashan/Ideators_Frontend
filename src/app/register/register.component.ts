import { Router } from '@angular/router';
import { AuthService } from './../Services/auth.service';
import { ValidateService } from './../Services/validate.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(
    private validateService:ValidateService, 
    private toastr: ToastrService,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      //console.log('Please fill in all fields');
     this.toastr.error('Please fill in all fields');
      return false;
    }

    // validate email

    if (!this.validateService.validateEmail(user.email)) {
      //console.log('Please use valid email');
      this.toastr.error('Please use valid email');
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        //console.log("your now registerd");
        this.toastr.success('Your now registerd');
        this.router.navigate(['/login']);
      }
      else{
        //console.log("Something went wrong");
        this.toastr.error(data.msg);
        this.router.navigate(['/register']);
      }
    });
  }
  
  
}
