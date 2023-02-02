import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nincanska-classification',
  templateUrl: './nincanska-classification.component.html',
  styleUrls: ['./nincanska-classification.component.css']
})
export class NincanskaClassificationComponent implements OnInit {

  @Input() form = new FormGroup({});

  numbers :number[] =[]
  selectedNumbers : boolean[] = [];
  constructor() { }

  ngOnInit(): void {
    for(let i = 1 ; i<= 45 ; i++){
      this.numbers.push(i);
      this.selectedNumbers.push(false);

    }
  }

  changeSelection(number:number){
    this.selectedNumbers[number] = ! this.selectedNumbers[number];
  }

}
