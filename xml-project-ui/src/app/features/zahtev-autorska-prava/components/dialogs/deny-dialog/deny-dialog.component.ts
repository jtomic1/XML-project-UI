import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Resenje } from '../../../model/Resenje';
import { AutorskaPravaService } from '../../../services/autorska-prava-service/autorska-prava.service';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-deny-dialog',
  templateUrl: './deny-dialog.component.html',
  styleUrls: ['./deny-dialog.component.css']
})
export class DenyDialogComponent implements OnInit {

  form: FormGroup = this.generateFormGroup();

  constructor(public dialogRef: MatDialogRef<DenyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private autorskaPravaService: AutorskaPravaService,
              private messageService: MessageService,
              private loginService: LoggedUserService) { }

  ngOnInit(): void {
  }

  generateFormGroup(): FormGroup {
    return new FormGroup({
      reason: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deny() {
    if (this.form.valid) {
      var date = new Date(); 
      var datum: string = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + '.';
      var resenje: Resenje = {
        id: this.data.id,
        ime: '', //this.loginService.user?.name,
        prezime: '', //this.loginService.user?.surname,
        status: 'DENIED',
        datum: datum,
        obrazlozenje: this.form.controls['reason'].value
      };
      this.autorskaPravaService.deny(resenje).subscribe((res: any) => {
        this.messageService.showMessage('Захтев са бројем ' + this.data.id + ' је одбијен', MessageType.SUCCESS);
        this.dialogRef.close(true);
      })
    }
  }

}
