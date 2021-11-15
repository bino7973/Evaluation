import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNatureComponent } from './detail-nature.component';

describe('DetailNatureComponent', () => {
  let component: DetailNatureComponent;
  let fixture: ComponentFixture<DetailNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
