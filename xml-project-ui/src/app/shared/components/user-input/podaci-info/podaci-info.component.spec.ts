import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciInfoComponent } from './podaci-info.component';

describe('PodaciInfoComponent', () => {
  let component: PodaciInfoComponent;
  let fixture: ComponentFixture<PodaciInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodaciInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
