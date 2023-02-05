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

  // name na cirilici ako cemo tako ceo projekat
  patentOptions: MenuItem[] = [];

  zigOptions: MenuItem[] = [
    { name: 'zigOption 1', link: 'dummyLink1' },
    { name: 'zigOption 2', link: 'dummyLink2' },
    { name: 'zigOption 3', link: 'dummyLink3' },
  ];
  autorskaOptions: MenuItem[] = [
    { name: 'autorskaOption 1', link: 'dummyLink1' },
    { name: 'autorskaOption 2', link: 'dummyLink2' },
    { name: 'autorskaOption 3', link: 'dummyLink3' },
  ];

  constructor(
    public loggedService: LoggedUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patentOptions = [{ name: 'Преглед захтева', link: '/allPatents' }];
    if (this.loggedService.user?.role === 'client')
      this.patentOptions.push({
        name: 'Поднеси захтев',
        link: '/patentRequest',
      });
    else {
      this.patentOptions.push({ name: 'Увид у извештаје', link: '/report' });
    }
  }

  logout(): void {
    this.loggedService.logout();
    this.router.navigateByUrl('login');
  }
}
