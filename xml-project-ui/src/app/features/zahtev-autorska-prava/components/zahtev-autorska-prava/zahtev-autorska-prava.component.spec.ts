import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevAutorskaPravaComponent } from './zahtev-autorska-prava.component';

describe('ZahtevAutorskaPravaComponent', () => {
  let component: ZahtevAutorskaPravaComponent;
  let fixture: ComponentFixture<ZahtevAutorskaPravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevAutorskaPravaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevAutorskaPravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
