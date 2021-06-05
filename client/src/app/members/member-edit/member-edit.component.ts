import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member! : Member
  user!  : User | null
  constructor(private accountService : AccountService , private memberService:MemberService , 
    private toast : ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {this.user = user})
    this.loadMember()
  }

  loadMember()
  {
    if(this.user){
       const username = this.user.username
       this.memberService.getMember(username).subscribe(member => this.member = member)
       this.editForm.reset(this.member);
    }
  }

  updateMember()
  {
    if(this.member){
    this.memberService.updateMember(this.member).subscribe( ()=>{
      this.toast.success("Profile Updated successfully!")
      this.editForm.reset(this.member);
    })
    }
  }
}
