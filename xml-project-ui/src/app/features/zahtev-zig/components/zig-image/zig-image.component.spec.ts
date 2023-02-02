import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigImageComponent } from './zig-image.component';

describe('ZigImageComponent', () => {
  let component: ZigImageComponent;
  let fixture: ComponentFixture<ZigImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
