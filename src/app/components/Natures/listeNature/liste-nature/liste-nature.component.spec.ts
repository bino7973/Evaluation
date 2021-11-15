import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNatureComponent } from './liste-nature.component';

describe('ListeNatureComponent', () => {
  let component: ListeNatureComponent;
  let fixture: ComponentFixture<ListeNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
