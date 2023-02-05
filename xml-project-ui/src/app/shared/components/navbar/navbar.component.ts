import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../../models/MenuItem';
import { LoggedUserService } from '../../services/logged-user-service/logged-user.service';
import {
  MessageService,
  MessageType,
} from '../../services/message-service/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logoutIcon = faRightFromBracket;

  zigOptions: MenuItem[] = [
    { name: 'Pregled zahteva', link: 'b' },
    { name: 'Pregled izvestaja', link: 'c' },
  ];  

  constructor(
    public loggedService: LoggedUserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.loggedService.logout();
    this.router.navigateByUrl('login');
  }
}
