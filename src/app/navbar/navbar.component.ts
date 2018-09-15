import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    
    private authService:AuthService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    
    this.authService.logout();
    console.log("you are logout");
    this.toastr.info('you are logout');
    this.router.navigate(['/login']);
  }

}
