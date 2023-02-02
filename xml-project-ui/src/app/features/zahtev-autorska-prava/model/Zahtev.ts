import { NaslovAutorskogDela } from "./NaslovAutorskogDela";
import { NaslovDeloPrerade } from "./NaslovDeloPrerade";
import { Prilozi } from "./Prilozi";
import { Punomocnik } from "./Punomocnik";
import { TAutor } from "./TAutor";
import { TAutorPreminuo } from "./TAutorPreminuo";
import { TAutorZiv } from "./TAutorZiv";
import { TFizickoLice } from "./TFizickoLice";
import { TPravnoLice } from "./TPravnoLice";

export interface Zahtev {
    //podnosilac: Podnosilac,
    fizicko_lice: TFizickoLice,
    pravno_lice: TPravnoLice,
    pseudonim_znak_autora: string,
    punomocnik: Punomocnik,
    naslov_autorskog_dela: NaslovAutorskogDela,
    naslov_delo_prerade: NaslovDeloPrerade,
    vrsta_autorskog_dela: string,
    forma_zapisa_autorskog_dela: string,
    //podaci_o_autoru_nepodnosilac: PodaciOAutoruNepodnosilac,
    podnosilac_autor: TAutor,
    autor_anoniman: TAutor,
    autor_ziv: TAutorZiv,
    autor_preminuo: TAutorPreminuo,
    autorsko_delo_stvoreno_radnim_odnosom: string,
    nacin_koriscenja: string,
    prilozi: Prilozi,
    broj_prijave: string,
    datum_podnosenja: string,    
}