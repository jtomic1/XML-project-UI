import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import { ZigService } from '../../services/zig-service/zig.service';
import * as xml2js from 'xml2js';
import { ZigFactoryService } from '../../services/zig-factory/zig-factory.service';
import { HelpService } from '../../services/help-service/help.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uvid-u-zahteve',
  templateUrl: './uvid-u-zahteve.component.html',
  styleUrls: ['./uvid-u-zahteve.component.css']
})
export class UvidUZahteveComponent implements OnInit {

  zahtevi: ZahtevZaPriznanjeZiga[] =[];
  showCancelSearch: boolean = false;

  canceledShow:boolean = false;
  approvedShow:boolean = false;
  appliedShow:boolean = false;
  showPretraga:boolean = true;
  form: FormGroup = new FormGroup({
    pretraga: new FormControl(''),
  });


  constructor(
    private zigService:ZigService,
    private zigFactory:ZigFactoryService,
    private messageService: MessageService,
    private helpService: HelpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPending();
  }

  getAllPending(){
    
    
    this.zahtevi = [];
    this.zigService.getAllPending().subscribe(
      {
        next:(res: any) => {
          this.updateList(res);
        },
        error:(err) =>{
          this.messageService.showMessage("greska pri komunikaciji, pokusajte ponovo.",MessageType.ERROR);
        }
    });
  }

  
  getAllApproved(){
    this.zahtevi = [];
    this.zigService.getAllApproved().subscribe(
      {
        next:(res: any) => {
          this.updateList(res);
        },
        error:(err) =>{
          this.messageService.showMessage("greska pri komunikaciji, pokusajte ponovo.",MessageType.ERROR);
        }
    });
  }
  getAllCanceled(){
    this.zahtevi = [];
    this.zigService.getAllCanceled().subscribe(
      {
        next:(res: any) => {
          this.updateList(res);
        },
        error:(err) =>{
          this.messageService.showMessage("greska pri komunikaciji, pokusajte ponovo.",MessageType.ERROR);
        }
    });
  }
  
  updateList(res:any){
    const parser = new xml2js.Parser({
      strict: true,
      trim: true,
      explicitArray: false,
    });
    
    parser.parseString(res.toString(), (err, result) => {          
        let resenja = result.List.item;          
        if (resenja !== undefined) {
          if(this.isIterable(resenja)){
            for (let resenje of resenja) {              
              let zahtev: ZahtevZaPriznanjeZiga = this.zigFactory.getZigFromXML(resenje);
              this.zahtevi.push(zahtev);
            }
          }
          else{
            this.zahtevi.push(resenja);
          }
        }          
      });
  }

  isIterable(obj:any) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  filter : string ="";
  resetFilters(){
    this.appliedShow = false;
    this.canceledShow = false;
    this.approvedShow = false;
  }


  filterChange(){
    console.log(this.filter);
    this.resetFilters();
    if(this.filter === "odobreni"){
      this.getAllApproved();
      this.approvedShow = true;
    }
    else if( this.filter === "odbijeni"){
      this.getAllCanceled();
      this.canceledShow = true;
    }
    else if (this.filter == "predati"){
      this.getAllPending();
      this.appliedShow = true;
    }
  }

  deny(index : number){
    
    this.zigService.deny(this.zahtevi[index])
    .subscribe((res: any) => {
      const parser = new xml2js.Parser({
        strict: true,
        trim: true,
        explicitArray: false,
      });
      parser.parseString(res.toString(), (err, result) => {          
          this.getAllPending();   
        });
    });

  }
  approve(index : number){

    this.zigService.approve(this.zahtevi[index])
    .subscribe((res: any) => {
      const parser = new xml2js.Parser({
        strict: true,
        trim: true,
        explicitArray: false,
      });
      parser.parseString(res.toString(), (err, result) => {          
          this.getAllPending();      
        });
    });

  }

  getHTML(index: number){

    this.zigService.getHTMLFile(this.zahtevi[index]).subscribe(data => {
      const blob = new Blob([data], { type: 'text/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'file.html';
      link.click();
    });
  }

  getPDF(index : number ){  
    
    this.zigService.getHTMLFile(this.zahtevi[index]).subscribe(data => {
      const blob = new Blob([data], { type: 'text/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'file.pdf';
      link.click();
    });

  }


  getJson(index : number){

    let id  =this.zahtevi[index].brojZahteva!;
    this.zigService.getJson(id).subscribe(data => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.json';
      a.click();
    });
  }
  getRdf(index : number){

    let id  =this.zahtevi[index].brojZahteva!;
    this.zigService.getRdf(id).subscribe(data => {      
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.rdf';
      a.click();
    })
    
  }
  search() {
    this.zahtevi = [];
    this.zigService
      .zigSearch(this.form.controls['pretraga'].value)
      .subscribe({
        next: (res:any) => {
          const parser = new xml2js.Parser({
            strict: true,
            trim: true,
            explicitArray: false,
          });
          parser.parseString(res, (error, result) => {
            let resenja = result.ArrayList.item;          
            if (resenja !== undefined) {
              if( this.isIterable(resenja) ){
                for (let resenje of resenja) {              
                  let zahtev: ZahtevZaPriznanjeZiga = this.zigFactory.getZigFromXML(resenje);
                  this.zahtevi.push(zahtev);
                }
              }
              else{
                this.zahtevi.push(resenja);
              }
            }  

            this.showPretraga = true;
            if (this.zahtevi.length > 0) {
              this.messageService.showMessage(
                `Претрага успешна! Пронађено ${this.zahtevi.length} патената`,
                MessageType.SUCCESS
              );
            } else {
              this.messageService.showMessage(
                `Ни један патент не садржи задати упит! Бићете враћени на преглед.`,
                MessageType.INFO
              );
              this.ngOnInit();
            }
          });
        },
        error: (err:any) => {
          const parser = new xml2js.Parser({ strict: true, trim: true });
          parser.parseString(err.error, (error, result) => {
            this.messageService.showMessage(
              'Ни један патент није пронађен!',
              MessageType.ERROR
            );
            // this.router.navigateByUrl('/allPatents');
          });
        },
      });
  }

  zahtevForShow:ZahtevZaPriznanjeZiga = this.zahtevi[0];
  showZahtev :boolean = false;
  changeZahtevForShow( zahtev: ZahtevZaPriznanjeZiga){
    this.zahtevForShow = zahtev;
    this.showZahtev = true;
  }

  showList(){
    console.log("dsakndsakj");
    this.showZahtev = false;
  }
}
