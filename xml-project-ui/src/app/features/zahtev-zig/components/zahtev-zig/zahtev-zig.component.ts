import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zahtev-zig',
  templateUrl: './zahtev-zig.component.html',
  styleUrls: ['./zahtev-zig.component.css']
})
export class ZahtevZigComponent implements OnInit {

  form: FormGroup = this.createFormGroup();
  constructor() { }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      name:new FormControl(''),
      lastName: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      postalCode: new FormControl(''),
      country: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      fax:new FormControl(''),
    });
  }
}
