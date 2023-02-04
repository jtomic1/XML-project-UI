import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    this.form.get('broj')?.setValue( this.getNumbers() ); 
  }

  getNumbers(){
    let result: string = "";
    for (let i = 0; i < this.selectedNumbers.length; i++) {
      if (this.selectedNumbers[i]) {
        result += i + ","
      }
    }
    result = result.slice(0,result.length -1 );
    this.form.get('broj')?.setValue(result);
    return result;
  }
  
}
