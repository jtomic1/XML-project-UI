import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ranija-prijava',
  templateUrl: './ranija-prijava.component.html',
  styleUrls: ['./ranija-prijava.component.css'],
})
export class RanijaPrijavaComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});

  maxDate: Date;
  constructor() {
    this.maxDate = new Date();
  }

  ngOnInit(): void {}
}
