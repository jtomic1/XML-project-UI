import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenjeDialogComponent } from './resenje-dialog.component';

describe('ResenjeDialogComponent', () => {
  let component: ResenjeDialogComponent;
  let fixture: ComponentFixture<ResenjeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResenjeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenjeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
