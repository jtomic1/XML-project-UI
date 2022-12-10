import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTabsContainerComponent } from './form-tabs-container.component';

describe('FormTabsContainerComponent', () => {
  let component: FormTabsContainerComponent;
  let fixture: ComponentFixture<FormTabsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTabsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTabsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
