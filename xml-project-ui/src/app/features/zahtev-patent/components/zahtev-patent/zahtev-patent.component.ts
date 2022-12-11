import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatentFormGeneratorService } from '../../services/patent-form-generator/patent-form-generator.service';

@Component({
  selector: 'app-zahtev-patent',
  templateUrl: './zahtev-patent.component.html',
  styleUrls: ['./zahtev-patent.component.css'],
})
export class ZahtevPatentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private patentFormService: PatentFormGeneratorService) {
    this.form = patentFormService.createPatentForm();
  }

  ngOnInit(): void {}

  getFormGroup(formGroupName: string): FormGroup {
    return this.form.get(formGroupName) as FormGroup;
  }
}
