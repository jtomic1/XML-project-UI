import { AfterViewInit, Component, OnInit } from '@angular/core';
import { XonomyService } from '../../services/xonomy-service/xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-xonomy-editor',
  templateUrl: './xonomy-editor.component.html',
  styleUrls: ['./xonomy-editor.component.css'],
})
export class XonomyEditorComponent implements OnInit, AfterViewInit {
  constructor(private xonomyService: XonomyService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    let element = document.getElementById('editor');
    Xonomy.setMode('laic');
    Xonomy.render(
      `<podaci_o_pronalazacu>
      </podaci_o_pronalazacu>`,
      element,
      this.xonomyService.pronalazacSpecification
    );
  }
}
