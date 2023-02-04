import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XonomyEditorComponent } from './xonomy-editor.component';

describe('XonomyEditorComponent', () => {
  let component: XonomyEditorComponent;
  let fixture: ComponentFixture<XonomyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XonomyEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XonomyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
