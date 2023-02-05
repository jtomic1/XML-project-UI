import {  BrojeviKlasaRobeUslugaSEND } from "./BrojeviKlasaRobeUsluga";
import { OpisZiga, OpisZigaSEND } from "./Opis";
import { Prilozi } from "./Pirlozi";
import { Placanje } from "./Placanje";
import { TLice } from "./TLice";
import { ZatrazenoPravoPrvenstva } from "./ZatrazenoPravoPrvenstva";

export interface ZahtevZaPriznanjeZigaSEND{
    

    podnosilac:TLice;
    punomocnik:TLice;
    // zajednickiPosrednik:TLice | undefined;
    opisZiga:OpisZigaSEND;
    brojeviKlasaRobeUsluga:BrojeviKlasaRobeUslugaSEND;
    zatrazenoPravoPrvenstva:ZatrazenoPravoPrvenstva;
    placanje:Placanje;
    prilozi:Prilozi;
    brojZahteva:String | undefined;
}