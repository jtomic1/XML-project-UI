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

  get patentOptions(): MenuItem[] {
    let ret = [{ name: 'Преглед захтева', link: '/allPatents' }];
    if (this.loggedService.user?.role === 'citizen')
      ret.push({
        name: 'Поднеси захтев',
        link: '/patentRequest',
      });
    else {
      ret.push({
        name: 'Увид у извештаје',
        link: '/allPatents',
      });
    }
    return ret;
  }
  
  // name na cirilici ako cemo tako ceo projekat

  zigOptions: MenuItem[] = [
    { name: 'zigOption 1', link: 'dummyLink1' },
    { name: 'zigOption 2', link: 'dummyLink2' },
    { name: 'zigOption 3', link: 'dummyLink3' },
  ];  

  constructor(
    public loggedService: LoggedUserService,
    private router: Router
  ) {}

  ngOnInit(): void { }

  logout(): void {
    this.loggedService.logout();
    this.router.navigateByUrl('login');
  }
}
