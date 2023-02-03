import { TVrstaZnaka } from "./TVrstaZnaka";

export interface Znak {

  izgled_znaka:String;
  vrsta_znaka:TVrstaZnaka;
  boje_znaka: String[];
  transliteracija:String;
  prevod:String;
  opis_znaka:String;

}