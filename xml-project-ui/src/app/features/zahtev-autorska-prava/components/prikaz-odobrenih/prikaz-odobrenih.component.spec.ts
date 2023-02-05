import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazOdobrenihComponent } from './prikaz-odobrenih.component';

describe('PrikazOdobrenihComponent', () => {
  let component: PrikazOdobrenihComponent;
  let fixture: ComponentFixture<PrikazOdobrenihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazOdobrenihComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazOdobrenihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
