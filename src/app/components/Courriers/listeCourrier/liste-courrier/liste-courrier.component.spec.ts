import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCourrierComponent } from './liste-courrier.component';

describe('ListeCourrierComponent', () => {
  let component: ListeCourrierComponent;
  let fixture: ComponentFixture<ListeCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCourrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
