import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObrazacA1 } from '../../model/ObrazacA1';
import { Zahtev } from '../../model/Zahtev';
import { AutorskaPravaFactoryService } from '../../services/autorska-prava-factory/autorska-prava-factory.service';
import { AutorskaPravaFormGeneratorService } from '../../services/autorska-prava-form-generator/autorska-prava-form-generator.service';
import { AutorksaPravaFormValidatorService } from '../../services/autorska-prava-form-validator/autorksa-prava-form-validator.service';
import { AutorskaPravaService } from '../../services/autorska-prava-service/autorska-prava.service';
import * as xml2js from 'xml2js';
import { ZahtevDTO } from '../../model/ZahtevDTO';

@Component({
  selector: 'app-zahtev-autorska-prava',
  templateUrl: './zahtev-autorska-prava.component.html',
  styleUrls: ['./zahtev-autorska-prava.component.css']
})
export class ZahtevAutorskaPravaComponent implements OnInit {
  private fileInput!: ElementRef;
  @ViewChild('fileInput', { static: false}) set content(content: ElementRef) {
    if(content) {
        this.fileInput = content;
    }
 }

  step = 0;

  fileName: string = '';

  selectedPodnosilac: number = 1;
  selectedPrerada: number = 1;
  selectedType: number = 1;
  selectedForma: number = 1;
  selectedAutorType: number = 1;
  selectedRadniOdnos: number = 1;

  isPodnosilacAutor: boolean = false;

  individualForm: FormGroup = this.formGenerator.getIndividualForm();
  legalEntityForm: FormGroup = this.formGenerator.getLegalEntityForm();
  pseudonimForm: FormGroup = this.formGenerator.getPseudonimForm();
  punomocnikForm: FormGroup = this.formGenerator.getPunomocnikForm();
  titleForm: FormGroup = this.formGenerator.getTitleForm();
  adaptationForm: FormGroup = this.formGenerator.getAdaptationForm();
  autorAliveForm: FormGroup = this.formGenerator.getAutorAliveForm();
  autorDeadForm: FormGroup = this.formGenerator.getAutorDeadForm();
  useCaseForm: FormGroup = this.formGenerator.getUseCaseForm();
  descriptionForm: FormGroup = this.formGenerator.getDescriptionForm();

  constructor(private formGenerator: AutorskaPravaFormGeneratorService,
              private formValidator: AutorksaPravaFormValidatorService,
              private factory: AutorskaPravaFactoryService,
              private autorskaPravaService: AutorskaPravaService) { }

  ngOnInit(): void {
  
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onPodnosilacChange(event: any) {
    this.selectedPodnosilac = event.value;
    this.individualForm = this.formGenerator.getIndividualForm();
    this.legalEntityForm = this.formGenerator.getLegalEntityForm();
  }

  onAutorCheckboxChange(event: any) {
    this.isPodnosilacAutor = event.checked;
  }

  onAdaptationChanged(event: any) {
    this.selectedPrerada = event.value;
    this.adaptationForm = this.formGenerator.getAdaptationForm();
  }

  onTypeChanged(event: any) {
    this.selectedType = event.value;    
  }

  onFormaChanged(event: any) {
    this.selectedForma = event.value;
    this.fileName = '';
    this.descriptionForm = this.formGenerator.getDescriptionForm();
  }

  onAutorTypeChanged(event: any) {
    this.selectedAutorType = event.value;
    this.autorAliveForm = this.formGenerator.getAutorAliveForm();
    this.autorDeadForm = this.formGenerator.getAutorDeadForm();
  }

  onRadniOdnosChanged(event: any) {
    this.selectedRadniOdnos = event.value;
  }

  openFileInput() {
    this.fileName = '';
    this.fileInput.nativeElement.click();
  }

  uploadFile() {    
    this.fileName = this.fileInput.nativeElement.files[0].name;    
  }

  validateForms(): boolean {
    var result: boolean = true;
    result = this.formValidator.validatePodnosilac(this.selectedPodnosilac, this.individualForm, this.legalEntityForm);
    if (!result) return false;
    result = this.formValidator.validatePunomocnik(this.punomocnikForm);
    if (!result) return false;
    result = this.formValidator.validateTitle(this.titleForm);
    if (!result) return false;
    result = this.formValidator.validatePrerada(this.selectedPrerada, this.adaptationForm);
    if (!result) return false;
    result = this.formValidator.validateAutor(this.isPodnosilacAutor, this.selectedAutorType, this.autorAliveForm, this.autorDeadForm);
    if (!result) return false;
    result = this.formValidator.validatePrilozi(this.selectedForma, this.descriptionForm, this.fileInput.nativeElement.files[0]);
    return result;
  }

  generateObrazac(): ObrazacA1 {
    var zahtev: Zahtev = {      
      //podnosilac: this.factory.getPodnosilac(this.selectedPodnosilac, this.individualForm, this.legalEntityForm),
      fizicko_lice: this.factory.getFizickoLice(this.individualForm),
      pravno_lice: this.factory.getPravnoLice(this.legalEntityForm),
      pseudonim_znak_autora: this.pseudonimForm.controls['pseudonim'].value,
      punomocnik: this.factory.getPunomocnik(this.punomocnikForm),
      naslov_autorskog_dela: this.factory.getNaslovDela(this.titleForm),
      naslov_delo_prerade: this.factory.getDeloPrerade(this.selectedPrerada, this.adaptationForm),
      vrsta_autorskog_dela: this.factory.getVrstaDela(this.selectedType),
      forma_zapisa_autorskog_dela: this.factory.getFormaZapisa(this.selectedForma),
      //podaci_o_autoru_nepodnosilac: this.factory.getAutorPodaci(this.isPodnosilacAutor, this.selectedAutorType, this.autorAliveForm, this.autorDeadForm),
      podnosilac_autor: this.factory.getPodnosilacAutor(this.isPodnosilacAutor),
      autor_anoniman: this.factory.getAutorAnoniman(this.selectedAutorType),
      autor_ziv: this.factory.getAutorZiv(this.selectedAutorType, this.autorAliveForm),
      autor_preminuo: this.factory.getAutorPreminuo(this.selectedAutorType, this.autorDeadForm),
      autorsko_delo_stvoreno_radnim_odnosom: this.factory.getRadniOdnos(this.selectedRadniOdnos),
      nacin_koriscenja: this.useCaseForm.controls['useCase'].value,
      prilozi: this.factory.getPrilozi(this.selectedForma, this.descriptionForm, this.fileInput.nativeElement.files[0]),
      broj_prijave: '',
      datum_podnosenja: this.factory.getDatumPodnosenja()
    }
    var obrazac: ObrazacA1 = {
      //zavod: this.factory.generateZavod(),
      zahtev: zahtev
    };
    return obrazac;
  }

  sendRequest() {
    if (this.validateForms()) {      
      var obrazac: ObrazacA1 = this.generateObrazac();
      this.autorskaPravaService.save(obrazac.zahtev)
        .subscribe((res: any) => {
          console.log(res);
        });
    }


    // this.autorskaPravaService.get('A-20230201115724').subscribe((res: any) => {      
    //   const parser = new xml2js.Parser({strict: true, trim: true});
    //   parser.parseString(res.toString(), (err, result) => {
    //       console.log(result);
    //       var zahtev: ZahtevDTO = this.factory.getZahtevDTO(result.ObrazacA1.zahtev[0]);
    //       console.log(zahtev);                  
    //     });
    // });   
  }
}
