import { Component, OnInit , Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model :any = {}
  constructor(public accountService : AccountService , private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(res => {
      console.log(res)
    } , error => {
      console.log(error)
      this.toastr.error(error.error)
    })
  }
}
