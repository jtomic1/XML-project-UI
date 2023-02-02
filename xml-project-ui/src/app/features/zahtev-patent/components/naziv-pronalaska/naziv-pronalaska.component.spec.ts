import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NazivPronalaskaComponent } from './naziv-pronalaska.component';

describe('NazivPronalaskaComponent', () => {
  let component: NazivPronalaskaComponent;
  let fixture: ComponentFixture<NazivPronalaskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NazivPronalaskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NazivPronalaskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
