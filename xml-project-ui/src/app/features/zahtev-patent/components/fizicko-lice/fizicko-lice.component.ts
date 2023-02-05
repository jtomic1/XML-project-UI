import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fizicko-lice',
  templateUrl: './fizicko-lice.component.html',
  styleUrls: ['./fizicko-lice.component.css'],
})
export class FizickoLiceComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() form: FormGroup = new FormGroup({});
  @Input() showDrzavljanstvo: boolean = false;
  @Input() showFizickoLice: boolean = true;
  @Input() showDrzava: boolean = true;
  @Input() showFaks: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.form.controls['tipPodnosioca'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res === 'fizicko-lice') {
          this.form.controls['poslovnoIme'].removeValidators(
            Validators.required
          );
          this.form.controls['poslovnoIme'].updateValueAndValidity();
          this.form.get('fizickoLice.ime')!.addValidators(Validators.required);
          this.form.get('fizickoLice.ime')!.updateValueAndValidity();
          this.form
            .get('fizickoLice.prezime')!
            .addValidators(Validators.required);
          this.form.get('fizickoLice.prezime')!.updateValueAndValidity();
          if (
            (this.form.get('fizickoLice') as FormGroup)!.contains(
              'drzavljanstvo'
            )
          ) {
            this.form
              .get('fizickoLice.drzavljanstvo')!
              .addValidators(Validators.required);
            this.form
              .get('fizickoLice.drzavljanstvo')!
              .updateValueAndValidity();
          }
        } else if (res === 'poslovni-subjekat') {
          this.form.controls['poslovnoIme'].addValidators(Validators.required);
          this.form.controls['poslovnoIme'].updateValueAndValidity();
          this.form
            .get('fizickoLice.ime')!
            .removeValidators(Validators.required);
          this.form.get('fizickoLice.ime')!.updateValueAndValidity();
          this.form
            .get('fizickoLice.prezime')!
            .removeValidators(Validators.required);
          this.form.get('fizickoLice.prezime')!.updateValueAndValidity();
          if (
            (this.form.get('fizickoLice') as FormGroup)!.contains(
              'drzavljanstvo'
            )
          ) {
            this.form
              .get('fizickoLice.drzavljanstvo')!
              .removeValidators(Validators.required);
            this.form
              .get('fizickoLice.drzavljanstvo')!
              .updateValueAndValidity();
          }
        }
      });
  }

  getFormGroup(formGroupName: string): FormGroup {
    return this.form.get(formGroupName) as FormGroup;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
