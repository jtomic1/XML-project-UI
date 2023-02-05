import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AutorskaPravaService } from '../../services/autorska-prava-service/autorska-prava.service';

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.css']
})
export class IzvestajComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  max = new Date();
  
  constructor(private autorskaService: AutorskaPravaService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  generateReport() {
    if (this.isRangeValid()) {
      this.autorskaService.getReport().subscribe(data => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = 'report.pdf';
        a.click();
      });
    } else {
      this.messageService.showMessage('Опсег датума није исправно унесен', MessageType.ERROR);
    }
  }

  isRangeValid(): boolean {
    if (this.range.controls['start'].value !== null && this.range.controls['end'].value !== null) {
      return true;
    }
    return false;
  }

}
