import { Adresa } from './Adresa';
import { FizickoLice } from './FizickoLice';
import { Kontakt } from './Kontakt';

export interface Pronalazac {
  pronalazacNaveden: boolean;
  pronalazac: {
    fizickoLice: FizickoLice;
    kontakt: Kontakt;
    lokacija: Adresa;
  };
}
