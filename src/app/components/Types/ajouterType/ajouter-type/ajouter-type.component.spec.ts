import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTypeComponent } from './ajouter-type.component';

describe('AjouterTypeComponent', () => {
  let component: AjouterTypeComponent;
  let fixture: ComponentFixture<AjouterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
