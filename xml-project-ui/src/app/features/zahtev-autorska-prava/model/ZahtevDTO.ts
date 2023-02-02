import { NaslovAutorskogDela } from "./NaslovAutorskogDela";
import { NaslovDeloPrerade } from "./NaslovDeloPrerade";
import { Prilozi } from "./Prilozi";
import { Punomocnik } from "./Punomocnik";
import { TAutor } from "./TAutor";
import { TLice } from "./TLice";

export interface ZahtevDTO {
    podnosilac: TLice,
    pseudonim_znak_autora: string,
    punomocnik: Punomocnik,
    naslov_autorskog_dela: NaslovAutorskogDela,
    naslov_delo_prerade: NaslovDeloPrerade,
    vrsta_autorskog_dela: string,
    forma_zapisa_autorskog_dela: string,
    autor: TAutor,
    autorsko_delo_stvoreno_radnim_odnosom: string,
    nacin_koriscenja: string,
    prilozi: Prilozi,
    broj_prijave: string,
    datum_podnosenja: string,
    status: string
}