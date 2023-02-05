import { BojeZnaka, BojeZnakaSend } from "./BojeZnaka";
import { TVrstaZnaka } from "./TVrstaZnaka";

export interface Znak {

  izgledZnaka:String;
  vrstaZnaka:TVrstaZnaka;
  bojeZnaka: BojeZnaka;
  transliteracija:String;
  prevod:String;
  opisZnaka:String;

}

export interface ZnakSEND {

  izgledZnaka:String;
  vrstaZnaka:TVrstaZnaka;
  bojeZnaka: BojeZnakaSend;
  transliteracija:String;
  prevod:String;
  opisZnaka:String;

}
