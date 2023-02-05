import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adresa',
  templateUrl: './adresa.component.html',
  styleUrls: ['./adresa.component.css'],
})
export class AdresaComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() showDrzava: boolean = false;
  @Input() clearValidators: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.clearValidators) {
      this.form.controls['ulica'].clearValidators();
      this.form.controls['ulica'].updateValueAndValidity();
      this.form.controls['broj'].clearValidators();
      this.form.controls['broj'].updateValueAndValidity();
      this.form.controls['postanskiBroj'].clearValidators();
      this.form.controls['postanskiBroj'].updateValueAndValidity();
      this.form.controls['mesto'].clearValidators();
      this.form.controls['mesto'].updateValueAndValidity();
    }
  }
}
