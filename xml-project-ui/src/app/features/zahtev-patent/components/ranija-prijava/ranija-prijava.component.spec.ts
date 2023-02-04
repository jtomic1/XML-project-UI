import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanijaPrijavaComponent } from './ranija-prijava.component';

describe('RanijaPrijavaComponent', () => {
  let component: RanijaPrijavaComponent;
  let fixture: ComponentFixture<RanijaPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RanijaPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RanijaPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
