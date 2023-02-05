
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';

@Component({
  selector: 'app-zahtev-view',
  templateUrl: './zahtev-view.component.html',
  styleUrls: ['./zahtev-view.component.css']
})
export class ZahtevViewComponent implements OnInit {


  @Input() zahtev:ZahtevZaPriznanjeZiga|undefined ;
  
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  emit(){
    this.newItemEvent.emit('');
  }

}
