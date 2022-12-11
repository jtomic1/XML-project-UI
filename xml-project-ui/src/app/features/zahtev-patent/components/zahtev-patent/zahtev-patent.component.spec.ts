import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevPatentComponent } from './zahtev-patent.component';

describe('ZahtevPatentComponent', () => {
  let component: ZahtevPatentComponent;
  let fixture: ComponentFixture<ZahtevPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevPatentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
