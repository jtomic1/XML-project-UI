import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zig-description',
  templateUrl: './zig-description.component.html',
  styleUrls: ['./zig-description.component.css']
})
export class ZigDescriptionComponent implements OnInit {
  @Input() form = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }

  getFormGroup(name : string ): FormGroup{
    return this.form.get(name) as FormGroup;
  }
}
