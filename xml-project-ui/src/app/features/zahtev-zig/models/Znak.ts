import { BojeZnaka } from "./BojeZnaka";
import { TVrstaZnaka } from "./TVrstaZnaka";

export interface Znak {

  izgledZnaka:String;
  vrstaZnaka:TVrstaZnaka;
  bojeZnaka: BojeZnaka;
  transliteracija:String;
  prevod:String;
  opisZnaka:String;

}