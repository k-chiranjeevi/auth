import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  isOpen = false;
  userDetails: any;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.isOpen = false;
    }
  }

  ngOnInit() {
    this.userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.removeItem('isLogin');
    this.router.navigate(['signin']);
  }

}
