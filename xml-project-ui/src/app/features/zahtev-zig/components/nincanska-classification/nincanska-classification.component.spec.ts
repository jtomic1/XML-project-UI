import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NincanskaClassificationComponent } from './nincanska-classification.component';

describe('NincanskaClassificationComponent', () => {
  let component: NincanskaClassificationComponent;
  let fixture: ComponentFixture<NincanskaClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NincanskaClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NincanskaClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
