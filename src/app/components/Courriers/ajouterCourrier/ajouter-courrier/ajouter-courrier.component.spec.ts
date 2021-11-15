import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCourrierComponent } from './ajouter-courrier.component';

describe('AjouterCourrierComponent', () => {
  let component: AjouterCourrierComponent;
  let fixture: ComponentFixture<AjouterCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCourrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
