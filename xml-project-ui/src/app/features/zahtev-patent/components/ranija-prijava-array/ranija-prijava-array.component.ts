import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PatentFormGeneratorService } from '../../services/patent-form-generator/patent-form-generator.service';

@Component({
  selector: 'app-ranija-prijava-array',
  templateUrl: './ranija-prijava-array.component.html',
  styleUrls: ['./ranija-prijava-array.component.css'],
})
export class RanijaPrijavaArrayComponent implements OnInit {
  @Input() formArray: FormArray = new FormArray([]);

  constructor(private formService: PatentFormGeneratorService) {}

  ngOnInit(): void {}

  getFormGroup(val: string) {
    return this.formArray.get(val) as FormGroup;
  }

  deletePrijava(index: number) {
    this.formArray.removeAt(index);
  }

  addPrijava() {
    this.formArray.push(this.formService.createDetaljiRanijePrijaveForm());
  }
}
