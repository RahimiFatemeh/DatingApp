import { Component, OnInit , Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model :any = {}
  registerForm! : FormGroup 

  constructor(public accountService : AccountService , private toastr : ToastrService , 
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.registerForm = this.fb.group ({
      username : ['', Validators.required ],
      password : ['',[Validators.required , Validators.maxLength(10)]] ,
      city : ['', Validators.required] ,
      country : ['', Validators.required] ,
      dateOfBirth : ['', Validators.required] ,
    })
  }


  register(){
    console.log(this.registerForm.value)
    // this.accountService.register(this.model).subscribe(res => {
    //   console.log(res)
    // } , error => {
    //   console.log(error)
    //   this.toastr.error(error.error)
    // })
  }
}
