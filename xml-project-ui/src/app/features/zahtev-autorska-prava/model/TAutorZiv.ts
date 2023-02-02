import { TAdresa } from "./TAdresa";
import { TAutor } from "./TAutor";

export interface TAutorZiv extends TAutor {
    adresa: TAdresa;
    drzavljanstvo: string
}