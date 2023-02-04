import { BrojeviKlasaRobeUsluga } from "./BrojeviKlasaRobeUsluga";
import { OpisZiga } from "./Opis";
import { Prilozi } from "./Pirlozi";
import { Placanje } from "./Placanje";
import { TLice } from "./TLice";
import { ZatrazenoPravoPrvenstva } from "./ZatrazenoPravoPrvenstva";

export interface ZahtevZaPriznanjeZiga {

    podnosilac:TLice;
    punomocnik:TLice;
    zajednicki_posrednik:TLice | undefined;
    opis_ziga:OpisZiga;
    brojevi_klasa_robe_usluga:BrojeviKlasaRobeUsluga;
    zatrazeno_pravo_prvenstva:ZatrazenoPravoPrvenstva;
    placanje:Placanje;
    prilozi:Prilozi;
    broj_zahteva:String | undefined;

}