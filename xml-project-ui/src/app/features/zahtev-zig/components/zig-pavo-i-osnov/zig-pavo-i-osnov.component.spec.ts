import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigPavoIOsnovComponent } from './zig-pavo-i-osnov.component';

describe('ZigPavoIOsnovComponent', () => {
  let component: ZigPavoIOsnovComponent;
  let fixture: ComponentFixture<ZigPavoIOsnovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigPavoIOsnovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigPavoIOsnovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
