import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  userdetails: any;
  ngOnInit() {
    this.userdetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  }

}
