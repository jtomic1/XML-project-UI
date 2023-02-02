import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-naziv-pronalaska',
  templateUrl: './naziv-pronalaska.component.html',
  styleUrls: ['./naziv-pronalaska.component.css'],
})
export class NazivPronalaskaComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  constructor() {}

  ngOnInit(): void {}
}
