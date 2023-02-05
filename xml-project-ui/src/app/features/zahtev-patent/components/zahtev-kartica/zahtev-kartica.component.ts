import { Component, Input, OnInit } from '@angular/core';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import { Zahtev } from '../../model/Zahtev';

@Component({
  selector: 'app-zahtev-kartica',
  templateUrl: './zahtev-kartica.component.html',
  styleUrls: ['./zahtev-kartica.component.css'],
})
export class ZahtevKarticaComponent implements OnInit {
  @Input() zahtev!: Zahtev;
  @Input() backgroundColor!: 'light' | 'dark';

  constructor(private loggedService: LoggedUserService) {}

  ngOnInit(): void {}
  convertTimestampToDate(timestamp: any) {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  get showActionBar() {
    return this.loggedService.user?.role !== 'ROLE_USER';
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
}
