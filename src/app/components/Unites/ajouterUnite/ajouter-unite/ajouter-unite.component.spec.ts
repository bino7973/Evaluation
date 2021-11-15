import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUniteComponent } from './ajouter-unite.component';

describe('AjouterUniteComponent', () => {
  let component: AjouterUniteComponent;
  let fixture: ComponentFixture<AjouterUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterUniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
