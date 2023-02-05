import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevKarticaComponent } from './zahtev-kartica.component';

describe('ZahtevKarticaComponent', () => {
  let component: ZahtevKarticaComponent;
  let fixture: ComponentFixture<ZahtevKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevKarticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
