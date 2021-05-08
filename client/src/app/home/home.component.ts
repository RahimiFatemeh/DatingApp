import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false
  users : any

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  registerToggle(){
    return this.registerMode = !this.registerMode
  }

}
