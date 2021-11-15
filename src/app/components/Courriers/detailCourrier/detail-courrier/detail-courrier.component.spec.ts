import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourrierComponent } from './detail-courrier.component';

describe('DetailCourrierComponent', () => {
  let component: DetailCourrierComponent;
  let fixture: ComponentFixture<DetailCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCourrierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
