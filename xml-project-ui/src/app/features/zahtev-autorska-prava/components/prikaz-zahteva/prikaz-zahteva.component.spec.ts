import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazZahtevaComponent } from './prikaz-zahteva.component';

describe('PrikazZahtevaComponent', () => {
  let component: PrikazZahtevaComponent;
  let fixture: ComponentFixture<PrikazZahtevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazZahtevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
