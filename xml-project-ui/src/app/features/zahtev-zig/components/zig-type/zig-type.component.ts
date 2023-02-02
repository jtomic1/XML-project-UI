import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-zig-type',
  templateUrl: './zig-type.component.html',
  styleUrls: ['./zig-type.component.css']
})
export class ZigTypeComponent implements OnInit {
  @Input() form :FormGroup = new FormGroup({});
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor() { }

  ngOnInit(): void {
  }

  colors: string[]= [];
  
  removeColor(color: string): void {
    const index = this.colors.indexOf(color);
    if (index >= 0) {
      this.colors.splice(index, 1);     
      
    }
  }
  addColor(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    this.colors.push(event.value);              
    
    event.chipInput!.clear();
  }

}
