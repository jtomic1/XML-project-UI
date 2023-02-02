import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigTypeComponent } from './zig-type.component';

describe('ZigTypeComponent', () => {
  let component: ZigTypeComponent;
  let fixture: ComponentFixture<ZigTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
