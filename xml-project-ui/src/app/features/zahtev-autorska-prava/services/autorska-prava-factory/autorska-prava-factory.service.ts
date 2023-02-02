import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NaslovAutorskogDela } from '../../model/NaslovAutorskogDela';
import { NaslovDeloPrerade } from '../../model/NaslovDeloPrerade';
import { Podnosilac } from '../../model/Podnosilac';
import { Prilozi } from '../../model/Prilozi';
import { Punomocnik } from '../../model/Punomocnik';
import { TAutor } from '../../model/TAutor';
import { TAutorPreminuo } from '../../model/TAutorPreminuo';
import { TAutorZiv } from '../../model/TAutorZiv';
import { TFizickoLice } from '../../model/TFizickoLice';
import { TLice } from '../../model/TLice';
import { TPravnoLice } from '../../model/TPravnoLice';
import { Zavod } from '../../model/Zavod';
import { ZahtevDTO} from '../../model/ZahtevDTO';

@Injectable({
  providedIn: 'root'
})
export class AutorskaPravaFactoryService {

  constructor() { }

  generateZavod(): Zavod {
    var zavod: Zavod = {
      naziv: 'Zavod za intelektualnu svojinu',
      adresa: {
        ulica: 'Kneginje Ljubice',
        broj: 5,
        grad: 'Beograd',
        postanski_kod: 11000
      }
    };
    return zavod;
  }

  getPodnosilac(selectedPodnosilac: number, individualForm: FormGroup, legalEntityForm: FormGroup): Podnosilac {
    var lice: TLice;
    if (selectedPodnosilac == 1) {
      var fizickoLice: TFizickoLice = {
        ime: individualForm.controls['name'].value,
        prezime: individualForm.controls['surname'].value,
        drzavljanstvo: individualForm.controls['citizenship'].value,
        telefon: individualForm.controls['phoneNumber'].value,
        email: individualForm.controls['email'].value,
        adresa: {
          ulica: individualForm.controls['street'].value,
          broj: individualForm.controls['streetNumber'].value,
          grad: individualForm.controls['city'].value,
          postanski_kod: individualForm.controls['zipCode'].value
        }
      };
      lice = fizickoLice;
    } else {
      var pravnoLice: TPravnoLice = {
        poslovno_ime: legalEntityForm.controls['businessName'].value,
        telefon: legalEntityForm.controls['phoneNumber'].value,
        email: legalEntityForm.controls['email'].value,
        sediste: {
          adresa: {
            ulica: legalEntityForm.controls['street'].value,
            broj: legalEntityForm.controls['streetNumber'].value,
            grad: legalEntityForm.controls['city'].value,
            postanski_kod: legalEntityForm.controls['zipCode'].value
          }
        }
      };
      lice = pravnoLice;
    }
    var podnosilac: Podnosilac = {
      lice: lice,      
    };
    return podnosilac;
  }

  getFizickoLice(individualForm: FormGroup): TFizickoLice {
    var fizickoLice: TFizickoLice = {
      ime: individualForm.controls['name'].value,
      prezime: individualForm.controls['surname'].value,
      drzavljanstvo: individualForm.controls['citizenship'].value,
      telefon: individualForm.controls['phoneNumber'].value,
      email: individualForm.controls['email'].value,
      adresa: {
        ulica: individualForm.controls['street'].value,
        broj: individualForm.controls['streetNumber'].value,
        grad: individualForm.controls['city'].value,
        postanski_kod: individualForm.controls['zipCode'].value
      }
    };
    return fizickoLice;
  }

  getPravnoLice(legalEntityForm: FormGroup): TPravnoLice {
    var pravnoLice: TPravnoLice = {
      poslovno_ime: legalEntityForm.controls['businessName'].value,
      telefon: legalEntityForm.controls['phoneNumber'].value,
      email: legalEntityForm.controls['email'].value,
      sediste: {
        adresa: {
          ulica: legalEntityForm.controls['street'].value,
          broj: legalEntityForm.controls['streetNumber'].value,
          grad: legalEntityForm.controls['city'].value,
          postanski_kod: legalEntityForm.controls['zipCode'].value
        }
      }
    };
    return pravnoLice;
  }

  getPunomocnik(punomocnikForm: FormGroup): Punomocnik {
    var punomocnik: Punomocnik = {
      ime: punomocnikForm.controls['name'].value,
      prezime: punomocnikForm.controls['surname'].value,
      adresa: {
        ulica: punomocnikForm.controls['street'].value,
        broj: punomocnikForm.controls['streetNumber'].value,
        grad: punomocnikForm.controls['city'].value,
        postanski_kod: punomocnikForm.controls['zipCode'].value
      },      
    };
    return punomocnik;
  }

  getNaslovDela(titleForm: FormGroup): NaslovAutorskogDela {
    var naslovDela: NaslovAutorskogDela = {
      naslov: titleForm.controls['title'].value,        
      alternativni_naslov: titleForm.controls['altTitle'].value,
    };
    return naslovDela;
  }

  getDeloPrerade(selectedPrerada: number, adaptationForm: FormGroup): NaslovDeloPrerade {
    var deloPrerade: NaslovDeloPrerade;
    if (selectedPrerada == 1) {
      deloPrerade = {
        naslov: '',
        autor: {
          ime: '',
          prezime: '',          
        },        
      };
    } else {
      deloPrerade = {
        naslov: adaptationForm.controls['title'].value,
        autor: {
          ime: adaptationForm.controls['name'].value,
          prezime: adaptationForm.controls['surname'].value,          
        },        
      };
    }
    return deloPrerade;
  }

  getVrstaDela(selectedType: number): string {
    if (selectedType == 1) {
      return 'Књижевно дело';
    } else if (selectedType == 2) {
      return 'Музичко дело';
    } else if (selectedType == 3) {
      return 'Ликовно дело';
    } else if (selectedType == 4) {
      return 'Рачунарски програм';
    } else {
      return 'Друга врста ауторског дела';
    }
  }

  getFormaZapisa(selectedForma: number): string {
    if (selectedForma == 1) {
      return 'Штампани текст';
    } else if (selectedForma == 2) {
      return 'Оптички диск';
    } else if (selectedForma == 3) {
      return 'Писано';
    } else if (selectedForma == 4) {
      return 'Осликано';
    } else {
      return 'Друга форма записа ауторског дела';
    }
  }

  getPodnosilacAutor(isPodnosilacAutor: boolean): TAutor {
    var autor: TAutor;
    if (isPodnosilacAutor) {
      autor = {
        ime: 'Подносилац је аутор',
        prezime: 'овог дела',        
      } 
    } else {
      autor = {
        ime: '',
        prezime: '',        
      }
    }
         
    return autor;
  }

  getAutorZiv(selectedAutorType: number, autorAliveForm: FormGroup): TAutorZiv {
    var autor: TAutorZiv;
    if (selectedAutorType == 1) {
      autor = {
        ime: autorAliveForm.controls['name'].value,
        prezime: autorAliveForm.controls['surname'].value,
        drzavljanstvo: autorAliveForm.controls['citizenship'].value,
        adresa: {
          ulica: autorAliveForm.controls['street'].value,
          broj: autorAliveForm.controls['streetNumber'].value,
          grad: autorAliveForm.controls['city'].value,
          postanski_kod: autorAliveForm.controls['zipCode'].value
        },
      };  
    } else {
      autor = {
        ime: '',
        prezime: '',
        drzavljanstvo: '',
        adresa: {
          ulica: '',
          broj: 0,
          grad: '',
          postanski_kod: 0
        },
      };  
    }
      
    return autor;
  }

  getAutorPreminuo(selectedAutorType: number, autorDeadForm: FormGroup): TAutorPreminuo {
    var autor: TAutorPreminuo;
    if (selectedAutorType == 2) {
      autor = {
        ime: autorDeadForm.controls['name'].value,
        prezime: autorDeadForm.controls['surname'].value,      
        godina_smrti: autorDeadForm.controls['deathYear'].value,      
      };
    } else {
      autor = {
        ime: '',
        prezime: '',      
        godina_smrti: 0      
      };
    }    
    return autor;
  }

  getAutorAnoniman(selectedAutorType: number): TAutor {
    var autor: TAutor;
    if (selectedAutorType == 3) {
      autor = {
        ime: 'Аутор овог дела',
        prezime: 'је анониман',        
      } 
    } else {
      autor = {
        ime: '',
        prezime: '',        
      }
    }
         
    return autor;
  }

  getRadniOdnos(selectedRadniOdnos: number): string {    
    if (selectedRadniOdnos == 1) {
      return 'Ауторско дело није створено у радном односу';
    } else {
      return 'Ауторско дело јесте створено у радном односу';
    }
  }

  getPrilozi(selectedForma: number, descriptionForm: FormGroup, file: any): Prilozi {
    var prilozi: Prilozi;
    if (selectedForma == 2) {
      prilozi = {
        opis_autorskog_dela: descriptionForm.controls['description'].value,        
        primer_autorskog_dela: ''
      };
    } else {
      prilozi = {
        opis_autorskog_dela: '',        
        primer_autorskog_dela: file.name
      };
    }
    return prilozi;
  }

  getDatumPodnosenja(): string {
    var date = new Date(); 
    var datum: string = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + '.';      
    return datum;
  }

  getZahtevDTO(response: any): ZahtevDTO {    
    var zahtev: ZahtevDTO;
    zahtev = {
      pseudonim_znak_autora: response.pseudonimZnakAutora[0].value[0],
      punomocnik: {
        ime: response.punomocnik[0].ime[0],
        prezime: response.punomocnik[0].prezime[0],
        adresa: {
          ulica: response.punomocnik[0].adresa[0].ulica[0],
          broj: response.punomocnik[0].adresa[0].broj[0],
          grad: response.punomocnik[0].adresa[0].grad[0],
          postanski_kod: response.punomocnik[0].adresa[0].postanskiKod[0]
        }
      },
      naslov_autorskog_dela: {
        naslov: response.naslovAutorskogDela[0].naslov[0].value[0],
        alternativni_naslov: response.naslovAutorskogDela[0].alternativniNaslov[0].value[0]
      },
      naslov_delo_prerade: {
        naslov: response.naslovDeloPrerade[0].naslov[0],
        autor: {
          ime: response.naslovDeloPrerade[0].autor[0].ime[0],
          prezime: response.naslovDeloPrerade[0].autor[0].prezime[0]
        }
      },
      vrsta_autorskog_dela: response.vrstaAutorskogDela[0].value[0],
      forma_zapisa_autorskog_dela: response.formaZapisaAutorskogDela[0].value[0],
      autorsko_delo_stvoreno_radnim_odnosom: response.autorskoDeloStvorenoRadnimOdnosom[0].value[0],
      nacin_koriscenja: response.nacinKoriscenja[0].value[0],
      broj_prijave: response.brojPrijave[0].value[0],
      datum_podnosenja: response.datumPodnosenja[0].value[0],
      prilozi: {
        opis_autorskog_dela: response.prilozi[0].opisAutorskogDela[0],
        primer_autorskog_dela: response.prilozi[0].primerAutorskogDela[0]
      },
      status: response.status[0],
      podnosilac: this.getPodnosilacDTO(response.podnosilac[0].lice[0]),
      autor: this.getAutorDTO(response.podaciOAutoruNepodnosilac[0].autor[0])
    };
    return zahtev;
  }
  
  getPodnosilacDTO(response: any): TLice {
    var lice: TLice;
    if (response.drzavljanstvo !== undefined) {
      var fizickoLice: TFizickoLice = {
        ime: response.ime[0],
        prezime: response.prezime[0],
        adresa: {
          ulica: response.adresa[0].ulica[0],
          broj: response.adresa[0].broj[0],
          grad: response.adresa[0].grad[0],
          postanski_kod: response.adresa[0].postanskiKod[0]
        },
        drzavljanstvo: response.drzavljanstvo[0],
        telefon: response.telefon[0],
        email: response.email[0]
      }
      lice = fizickoLice;
    } else {
      var pravnoLice: TPravnoLice = {
        poslovno_ime: response.poslovnoIme[0],
        sediste: {
          adresa: {
            ulica: response.sediste[0].adresa[0].ulica[0],
            broj: response.sediste[0].adresa[0].broj[0],
            grad: response.sediste[0].adresa[0].grad[0],
            postanski_kod: response.sediste[0].adresa[0].postanskiKod[0]
          } 
        },
        telefon: response.telefon[0],
        email: response.email[0]
      }
      lice = pravnoLice;
    }

    return lice;
  }

  getAutorDTO(response: any): TAutor {
    var autor: TAutor;
    if (response.godinaSmrti !== undefined) {
      var autorPreminuo: TAutorPreminuo = {
        ime: response.ime[0],
        prezime: response.prezime[0],
        godina_smrti: response.godinaSmrti[0]
      }
      autor = autorPreminuo;
    } else if (response.drzavljanstvo !== undefined) {
      var autorZiv: TAutorZiv = {
        ime: response.ime[0],
        prezime: response.prezime[0],
        adresa: {
          ulica: response.adresa[0].ulica[0],
          broj: response.adresa[0].broj[0],
          grad: response.adresa[0].grad[0],
          postanski_kod: response.adresa[0].postanskiKod[0]
        },
        drzavljanstvo: response.drzavljanstvo[0]
      }
      autor = autorZiv
    } else {
      var a: TAutor = {
        ime: response.ime[0],
        prezime: response.prezime[0]
      }
      autor = a;
    }

    return autor;
  }
}
