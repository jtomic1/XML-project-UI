import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AutorskaPravaFormGeneratorService {
  
  constructor() { }

  getIndividualForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      citizenship: new FormControl('', Validators.required),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9,12}$')]),
      email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('',[Validators.required, Validators.pattern('^1[1-9][0-9]{3}|2[0-9]{4}|3[0-9]{4}$')])
    });
  }

  getLegalEntityForm(): FormGroup {
    return new FormGroup({
      businessName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9,12}$')]),
      email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('',[Validators.required, Validators.pattern('^1[1-9][0-9]{3}|2[0-9]{4}|3[0-9]{4}$')])
    });
  }

  getPseudonimForm(): FormGroup {
    return new FormGroup({
      pseudonim: new FormControl('')
    });
  }

  getPunomocnikForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      street: new FormControl(''),
      streetNumber: new FormControl('',[Validators.pattern('^[0-9]+$')]),
      city: new FormControl(''),
      zipCode: new FormControl('',[Validators.pattern('^1[1-9][0-9]{3}|2[0-9]{4}|3[0-9]{4}$')])
    });
  }

  getTitleForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      altTitle: new FormControl('')
    });
  }

  getAdaptationForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required)
    });
  }

  getAutorAliveForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      citizenship: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      streetNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('',[Validators.required, Validators.pattern('^1[1-9][0-9]{3}|2[0-9]{4}|3[0-9]{4}$')])
    });
  }

  getAutorDeadForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      deathYear: new FormControl('', [Validators.required, Validators.pattern('^[1-2][0-9]{0,3}$')])
    });
  }

  getUseCaseForm(): FormGroup {
    return new FormGroup({
      useCase: new FormControl('')
    });
  }

  getDescriptionForm(): FormGroup {
    return new FormGroup({
      description: new FormControl('', Validators.required)
    });
  }
}
