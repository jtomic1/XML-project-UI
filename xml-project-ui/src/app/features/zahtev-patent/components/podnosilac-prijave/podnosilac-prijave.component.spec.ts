import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodnosilacPrijaveComponent } from './podnosilac-prijave.component';

describe('PodnosilacPrijaveComponent', () => {
  let component: PodnosilacPrijaveComponent;
  let fixture: ComponentFixture<PodnosilacPrijaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodnosilacPrijaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodnosilacPrijaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
