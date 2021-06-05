import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';

@Component({
  selector: 'app-member-cart',
  templateUrl: './member-cart.component.html',
  styleUrls: ['./member-cart.component.css']
})
export class MemberCartComponent implements OnInit {
  @Input() member!: Member;

  constructor() {}


  ngOnInit(): void {
  }

}
