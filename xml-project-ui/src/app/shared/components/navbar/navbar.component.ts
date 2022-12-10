import { Component, OnInit } from '@angular/core';
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
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
}
