import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganizacao } from './register-organizacao';

describe('RegisterOrganizacao', () => {
  let component: RegisterOrganizacao;
  let fixture: ComponentFixture<RegisterOrganizacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrganizacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOrganizacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
