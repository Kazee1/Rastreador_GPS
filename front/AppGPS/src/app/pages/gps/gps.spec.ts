import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPS } from './gps';

describe('GPS', () => {
  let component: GPS;
  let fixture: ComponentFixture<GPS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GPS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GPS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
