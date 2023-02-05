import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css'],
})
export class KontaktComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() showFaks: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
