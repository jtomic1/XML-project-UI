import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { PatentService } from '../../services/patent-service/patent.service';

@Component({
  selector: 'app-resenje-dialog',
  templateUrl: './resenje-dialog.component.html',
  styleUrls: ['./resenje-dialog.component.css'],
})
export class ResenjeDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({
    obrazlozenje: new FormControl('', Validators.required),
    status: new FormControl('accepted'),
    sifra: new FormControl('', Validators.required),
  });
  constructor(public dialogRef: MatDialogRef<ResenjeDialogComponent>) {}

  ngOnInit(): void {
    this.form.controls['status'].valueChanges.subscribe((res) => {
      if (res === 'declined') this.form.controls['sifra'].disable();
      else this.form.controls['sifra'].enable();
    });
  }

  onConfirmClick(): void {
    this.sendRequest();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  sendRequest() {
    this.dialogRef.close(this.form.getRawValue());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
