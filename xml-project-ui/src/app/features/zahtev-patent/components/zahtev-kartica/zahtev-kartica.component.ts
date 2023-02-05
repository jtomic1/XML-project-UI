import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { Zahtev } from '../../model/Zahtev';
import { PatentService } from '../../services/patent-service/patent.service';
import { ResenjeDialogComponent } from '../resenje-dialog/resenje-dialog.component';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-zahtev-kartica',
  templateUrl: './zahtev-kartica.component.html',
  styleUrls: ['./zahtev-kartica.component.css'],
})
export class ZahtevKarticaComponent implements OnInit {
  @Input() zahtev!: Zahtev;
  @Input() backgroundColor!: 'light' | 'dark';

  constructor(
    private loggedService: LoggedUserService,
    private patentService: PatentService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  convertTimestampToDate(timestamp: any) {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  get showActionBar() {
    return this.loggedService.user?.role !== 'citizen';
  }

  showPunomocnik(): boolean {
    return (
      this.zahtev.punomocnik.funkcija.punomocnikZastupanje === 'true' ||
      this.zahtev.punomocnik.funkcija.punomocnikPrijemPismena === 'true' ||
      this.zahtev.punomocnik.funkcija.zajednickiPredstavnik === 'true'
    );
  }

  getAdresaTitle(): string {
    if (this.zahtev.adresaZaDostavljanje === '') return 'Начин Доставе';
    else return 'Адреса За Доставу';
  }

  getNacinDostave(): string {
    let ret = 'Доставу је потребно вршити ';
    if (
      this.zahtev.nacinDostavljanja.elektronski === 'true' &&
      this.zahtev.nacinDostavljanja.papirno === 'true'
    )
      ret += 'електронски и папирно';
    else if (this.zahtev.nacinDostavljanja.elektronski === 'true')
      ret += 'електронски';
    else if (this.zahtev.nacinDostavljanja.papirno === 'true') ret += 'папирно';
    ret += '.';
    return ret;
  }

  getTipDopune(): string {
    let ret = 'Допуна је ';
    if (
      this.zahtev.dopuna.dopunskaPrijava === 'true' &&
      this.zahtev.dopuna.izdvojenaPrijava === 'true'
    )
      ret += 'допунска и издвојена';
    else if (this.zahtev.dopuna.dopunskaPrijava === 'true') ret += 'допунска';
    else if (this.zahtev.dopuna.izdvojenaPrijava === 'true') ret += 'издвојена';
    return ret;
  }

  getStyleFromInput(): string {
    if (this.backgroundColor === 'light') return 'white';
    return '#673ab7';
  }

  downloadPDF(id: string) {
    this.patentService.downloadPDF(id).subscribe((data) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.pdf';
      a.click();
      this.messageService.showMessage(
        'Преузимање успешно!',
        MessageType.SUCCESS
      );
    });
  }

  downloadXHTML(id: string) {
    this.patentService.downloadXHTML(id).subscribe((data) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.html';
      a.click();
      this.messageService.showMessage(
        'Преузимање успешно!',
        MessageType.SUCCESS
      );
    });
  }

  downloadRDF(id: string) {
    this.patentService.downloadRDF(id).subscribe((data) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.rdf';
      a.click();
      this.messageService.showMessage(
        'Преузимање успешно!',
        MessageType.SUCCESS
      );
      console.log(data);
    });
  }

  downloadJSON(id: string) {
    this.patentService.downloadJSON(id).subscribe((data) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.json';
      a.click();
      this.messageService.showMessage(
        'Преузимање успешно!',
        MessageType.SUCCESS
      );
    });
  }

  showResenjeDialog() {
    const dialogRef = this.dialog.open(ResenjeDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.sluzbenik =
          this.loggedService.user!.name +
          ' ' +
          this.loggedService.user!.surname;
        res.patent = this.zahtev.podaciZavod!.brojPrijave;
        this.patentService.sendResenjeZahtev(res).subscribe((res2) => {
          console.log(res2);
          const parser = new xml2js.Parser({
            strict: true,
            trim: true,
            explicitArray: false,
          });
          parser.parseString(res2, (error, result) => {
            let patenti = this.patentService.convertPatentListToObjects([
              result.ZahtevZaPriznanjePatenta,
            ]);
            this.zahtev = patenti[0];
          });
          this.messageService.showMessage(
            'Захтев успешно разрешен!',
            MessageType.SUCCESS
          );
        });
      }
    });
  }
}
