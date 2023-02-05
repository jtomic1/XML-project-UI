import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvidUZahteveComponent } from './uvid-u-zahteve.component';

describe('UvidUZahteveComponent', () => {
  let component: UvidUZahteveComponent;
  let fixture: ComponentFixture<UvidUZahteveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvidUZahteveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvidUZahteveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
