import { Adresa } from './Adresa';
import { FizickoLice } from './FizickoLice';
import { Kontakt } from './Kontakt';

export interface Zahtev {
  podaciZavod?: {
    brojPrijave: string;
    datumPodnosenja: string;
    datumPrijema: string;
    obrazlozenje: string;
    sluzbenik: string;
    statusZahteva: string;
  };
  nazivPronalaska: {
    nazivSrpski: string;
    nazivEngleski: string;
  };
  podnosilacPrijave: {
    tipPodnosioca: string;
    fizickoLice: FizickoLice;
    poslovnoIme: string;
    lokacija: Adresa;
    kontakt: Kontakt;
    podnosilacPronalazac: boolean;
  };
  podaciOPronalazacu: any;
  punomocnik: any;
  adresaZaDostavljanje: Adresa | '';
  nacinDostavljanja: {
    elektronski: boolean | string;
    papirno: boolean | string;
  };
  dopuna: {
    dopunskaPrijava: boolean | string;
    izdvojenaPrijava: boolean | string;
    brojOsnovnePrijave: string;
    datumOsnovnePrijave: string;
  };
  priznanjePravaPrvenstva?: any;
}

export interface PravaPrvenstva {}
