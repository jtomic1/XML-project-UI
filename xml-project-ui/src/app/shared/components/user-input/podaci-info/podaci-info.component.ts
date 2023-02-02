import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-podaci-info',
  templateUrl: './podaci-info.component.html',
  styleUrls: ['./podaci-info.component.css']
})
export class PodaciInfoComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});

  individual: FormControl = new FormControl(true);
  showForIndividual:boolean = true;

  name: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  typeChanged(){
  
    this.showForIndividual =  this.individual.value;
    console.log( typeof(this.showForIndividual) );
  }

}
