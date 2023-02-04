import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zig-pavo-i-osnov',
  templateUrl: './zig-pavo-i-osnov.component.html',
  styleUrls: ['./zig-pavo-i-osnov.component.css']
})
export class ZigPavoIOsnovComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  getFormGroup(name : string ): FormGroup{
    return this.form.get(name) as FormGroup;
  }
}
