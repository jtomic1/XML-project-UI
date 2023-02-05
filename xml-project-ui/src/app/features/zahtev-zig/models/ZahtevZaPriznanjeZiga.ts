import { BrojeviKlasaRobeUsluga } from "./BrojeviKlasaRobeUsluga";
import { OpisZiga } from "./Opis";
import { Prilozi } from "./Pirlozi";
import { Placanje } from "./Placanje";
import { TLice } from "./TLice";
import { ZatrazenoPravoPrvenstva } from "./ZatrazenoPravoPrvenstva";

export interface ZahtevZaPriznanjeZiga {

    podnosilac:TLice;
    punomocnik:TLice;
    // zajednickiPosrednik:TLice | undefined;
    opisZiga:OpisZiga;
    brojeviKlasaRobeUsluga:BrojeviKlasaRobeUsluga;
    zatrazenoPravoPrvenstva:ZatrazenoPravoPrvenstva;
    placanje:Placanje;
    prilozi:Prilozi;
    brojZahteva:string | undefined;

}