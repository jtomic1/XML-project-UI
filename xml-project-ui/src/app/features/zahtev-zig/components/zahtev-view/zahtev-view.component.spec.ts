import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevViewComponent } from './zahtev-view.component';

describe('ZahtevViewComponent', () => {
  let component: ZahtevViewComponent;
  let fixture: ComponentFixture<ZahtevViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
