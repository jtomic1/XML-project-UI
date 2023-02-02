import { Sediste } from "./Sediste";
import { TLice } from "./TLice";

export interface TPravnoLice extends TLice {
    poslovno_ime: string,
    sediste: Sediste
}