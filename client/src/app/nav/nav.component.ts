import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  // currentUser$!: Observable<User | null>; 
  

  constructor(public accountService : AccountService , private router: Router) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/NameOfComponent")
      console.log(response); 
    }, error => {
      console.log(error);
    })
  }


  logout() {
    this.accountService.logout();
  }
  //we dont need this anymore becuase we get directly from account services
  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user ; // double exclamation marks turn our object into a boolean.
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
