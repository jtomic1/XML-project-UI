import { Injectable } from '@angular/core';

declare const Xonomy: any;

@Injectable({
  providedIn: 'root',
})
export class XonomyService {
  public pronalazacSpecification = {
    elements: {
      podaci_o_pronalazacu: {
        displayName: 'Подаци о проналазачу',
        menu: [
          {
            caption: 'Навођење проналазача',
            action: Xonomy.newElementChild,
            actionParameter: '<pronalazac_naveden>true</pronalazac_naveden>',
            hideIf: (jsElement: any) => {
              return jsElement.children[0].type !== 'text';
            },
          },
          {
            caption: 'Додај проналазача',
            action: Xonomy.newElementChild,
            actionParameter: `<pronalazac><fizicko_lice><ime></ime><prezime></prezime></fizicko_lice><lokacija><ulica></ulica><broj></broj><postanski_broj></postanski_broj><mesto></mesto><drzava></drzava></lokacija><kontakt><broj_telefona></broj_telefona><e_mail></e_mail><broj_faksa></broj_faksa></kontakt></pronalazac>`,
            hideIf: (jsElement: any) => {
              if (jsElement.children[0].type === 'text') return true;
              else
                return (
                  jsElement.children[0].getText() !== 'true' ||
                  jsElement.children.length == 2
                );
            },
          },
        ],
        hasText: false,
      },
      pronalazac_naveden: {
        displayName: 'Проналазач наведен',
        mustBeBefore: 'pronalazac',
      },
      pronalazac: {
        displayName: 'Проналазач',
        hasText: false,
      },
      fizicko_lice: {
        displayName: 'Физичко лице',
        hasText: false,
      },
      ime: {
        displayName: 'Име',
        hasText: true,
      },
      prezime: {
        displayName: 'Презиме',
        hasText: true,
      },
      lokacija: {
        displayName: 'Локација',
        hasText: false,
      },
      ulica: {
        displayName: 'Улица',
        hasText: true,
      },
      broj: {
        displayName: 'Број',
        hasText: true,
      },
      postanski_broj: {
        displayName: 'Поштански број',
        hasText: true,
      },
      mesto: {
        displayName: 'Место',
        hasText: true,
      },
      drzava: {
        displayName: 'Држава',
        hasText: true,
      },
      kontakt: {
        displayName: 'Контакт',
        hasText: false,
      },
      broj_telefona: {
        displayName: 'Број телефона',
        hasText: true,
      },
      e_mail: {
        displayName: 'Е-маил',
        hasText: true,
      },
      broj_faksa: {
        displayName: 'Број факса',
        hasText: true,
      },
    },
  };

  constructor() {}
}
