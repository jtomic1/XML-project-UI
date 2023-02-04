import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanijaPrijavaArrayComponent } from './ranija-prijava-array.component';

describe('RanijaPrijavaArrayComponent', () => {
  let component: RanijaPrijavaArrayComponent;
  let fixture: ComponentFixture<RanijaPrijavaArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RanijaPrijavaArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RanijaPrijavaArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
