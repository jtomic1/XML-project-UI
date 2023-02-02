import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevZigComponent } from './zahtev-zig.component';

describe('ZahtevZigComponent', () => {
  let component: ZahtevZigComponent;
  let fixture: ComponentFixture<ZahtevZigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevZigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevZigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
