import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-input',
  templateUrl: './contact-input.component.html',
  styleUrls: ['./contact-input.component.css']
})
export class ContactInputComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }

  getFormGroup(name : string ): FormGroup{
    return this.form.get(name) as FormGroup;
  }
}
