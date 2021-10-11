import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  admin = false;

  constructor(
    private as: AuthService
  ) { }


  ngOnInit(): void {
    this.admin = this.as.isAdmin();
  }

  logout() {
    this.as.logout();
  }

}
