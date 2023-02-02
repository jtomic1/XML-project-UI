import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigDescriptionComponent } from './zig-description.component';

describe('ZigDescriptionComponent', () => {
  let component: ZigDescriptionComponent;
  let fixture: ComponentFixture<ZigDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
