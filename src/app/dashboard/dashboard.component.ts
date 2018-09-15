import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../Services/auth.service';
import { ValidateService } from './../Services/validate.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name:String;
  address:String;
  email:String;
  fname:String;
  lname:String;
  phonenumber:String;
  employeeid:String;

  constructor(
    private validateService:ValidateService, 
    private toastr: ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const company = {
      name: this.name,
      address: this.address,
      email: this.email
    }

    // validate email

    if (!this.validateService.validateEmail(company.email)) {
      //console.log('Please use valid email');
      this.toastr.error('Please use valid email');
      return false;
    }

    //Register User
    this.authService.registerCompany(company).subscribe(data =>{
      if(data.success){
        //console.log("your now registerd");
        this.toastr.success('Your now registerd');
      }
      else{
        //console.log("Something went wrong");
        this.toastr.error(data.msg);
      }
    });
  }

  onRegisterSubmitParticipant() {
    const participant = {
      fname: this.fname,
      lname: this.lname,
      address: this.address,
      email: this.email,
      phonenumber:this.phonenumber,
      employeeid :this.employeeid
    }

    // validate email

    if (!this.validateService.validateEmail(participant.email)) {
      //console.log('Please use valid email');
      this.toastr.error('Please use valid email');
      return false;
    }

    //Register User
    this.authService.registerParticipant(participant).subscribe(data =>{
      if(data.success){
        //console.log("your now registerd");
        this.toastr.success('Your now registerd');
      }
      else{
        //console.log("Something went wrong");
        this.toastr.error(data.msg);
      }
    });
  }

}
