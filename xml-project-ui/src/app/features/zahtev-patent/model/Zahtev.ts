import { Adresa } from './Adresa';
import { FizickoLice } from './FizickoLice';
import { Kontakt } from './Kontakt';

export interface Zahtev {
  sender: string;
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
  podaciOPronalazacu: {
    pronalazacNaveden: boolean;
    pronalazac: {
      fizickoLice: FizickoLice;
      lokacija: Adresa;
      kontakt: Kontakt;
    };
  };
  punomocnik: {
    punomocnikSeNavodi: boolean;
    funkcija: {
      punomocnikZastupanje: boolean;
      punomocnikPrijemPismena: boolean;
      zajednickiPredstavnik: boolean;
    };
    tipPodnosioca: string;
    fizickoLice: FizickoLice;
    poslovnoIme: string;
    lokacija: Adresa;
    kontakt: Kontakt;
  };
  adresaZaDostavljanje: Adresa;
  nacinDostavljanja: {
    elektronski: boolean;
    papirno: boolean;
  };
  dopuna: {
    dopunskaPrijava: boolean;
    izdvojenaPrijava: boolean;
    brojOsnovnePrijave: string;
    datumOsnovnePrijave: string;
  };
  priznanjePravaPrvenstva?: PravaPrvenstva[];
}

export interface PravaPrvenstva {}
