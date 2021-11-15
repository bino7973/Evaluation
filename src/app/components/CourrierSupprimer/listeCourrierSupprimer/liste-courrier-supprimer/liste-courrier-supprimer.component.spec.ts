import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCourrierSupprimerComponent } from './liste-courrier-supprimer.component';

describe('ListeCourrierSupprimerComponent', () => {
  let component: ListeCourrierSupprimerComponent;
  let fixture: ComponentFixture<ListeCourrierSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCourrierSupprimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCourrierSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
