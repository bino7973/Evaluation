import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUniteComponent } from './detail-unite.component';

describe('DetailUniteComponent', () => {
  let component: DetailUniteComponent;
  let fixture: ComponentFixture<DetailUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
