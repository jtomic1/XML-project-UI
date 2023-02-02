import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class AutorksaPravaFormValidatorService {

  constructor(private messageService: MessageService) { }

  validatePodnosilac(selectedPodnosilac: number, individualForm: FormGroup, legalEntityForm: FormGroup): boolean {
    var result: boolean = true;    
    if (selectedPodnosilac == 1) {      
      result = individualForm.valid;
    } else if (selectedPodnosilac == 2) {      
      result = legalEntityForm.valid;
    }

    if (!result) {
      this.messageService.showMessage('Форма за подносиоца је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

  validatePunomocnik(punomocnikForm: FormGroup): boolean {
    var result: boolean = punomocnikForm.valid;;
    if (!result) {
      this.messageService.showMessage('Форма за пуномоћника је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

  validateTitle(titleForm: FormGroup): boolean {
    var result: boolean = titleForm.valid;
    if (!result) {
      this.messageService.showMessage('Форма за наслов дела је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

  validatePrerada(selectedPrerada: number, adaptationForm: FormGroup): boolean {
    var result: boolean = true;
    if (selectedPrerada == 2) {
      result = adaptationForm.valid;
    }
    if (!result) {
      this.messageService.showMessage('Форма за дело прераде је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

  validateAutor(isPodnosilacAutor: boolean, selectedAutorType: number, autorAliveForm: FormGroup, autorDeadForm: FormGroup): boolean {
    var result: boolean = false;
    if (isPodnosilacAutor) {
      result = true;
    } else {
      if (selectedAutorType == 1) {
        result = autorAliveForm.valid;
      } else if (selectedAutorType == 2) {
        result = autorDeadForm.valid;
      } else if (selectedAutorType == 3) {
        result = true;
      }
    }
    if (!result) {
      this.messageService.showMessage('Форма за аутора је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

  validatePrilozi(selectedForma: number, descriptionForm: FormGroup, file: any): boolean {
    var result: boolean = false;
    if (selectedForma == 2) {
      result = descriptionForm.valid;
    } else {
      if (file !== undefined) {
        result = true;
      }
    }
    if (!result) {
      this.messageService.showMessage('Форма за слање прилога је неисправно попуњена!', MessageType.ERROR);
    }
    return result;
  }

}
