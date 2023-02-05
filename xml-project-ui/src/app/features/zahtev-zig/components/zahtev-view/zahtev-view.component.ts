
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TTipZiga } from '../../models/TTipZiga';
import { TVrstaZnaka } from '../../models/TVrstaZnaka';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';

@Component({
  selector: 'app-zahtev-view',
  templateUrl: './zahtev-view.component.html',
  styleUrls: ['./zahtev-view.component.css']
})
export class ZahtevViewComponent implements OnInit {


  @Input() zahtev:ZahtevZaPriznanjeZiga|undefined ;
  
  @Output() newItemEvent = new EventEmitter<string>();

  get TVrstaZnaka(){
    return TVrstaZnaka;
  }

  get TTipZiga(){
    return TTipZiga;
  }

  constructor() { }

  ngOnInit(): void {
  }


  emit(){
    this.newItemEvent.emit('');
  }

}
