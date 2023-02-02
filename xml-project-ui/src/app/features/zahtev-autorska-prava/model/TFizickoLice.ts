import { TAdresa } from "./TAdresa";
import { TLice } from "./TLice";

export interface TFizickoLice extends TLice {
    ime: string,
    prezime: string,
    adresa: TAdresa,
    drzavljanstvo: string
}