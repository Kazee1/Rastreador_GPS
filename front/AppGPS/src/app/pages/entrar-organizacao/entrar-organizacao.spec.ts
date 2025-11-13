import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarOrganizacao } from './entrar-organizacao';

describe('EntrarOrganizacao', () => {
  let component: EntrarOrganizacao;
  let fixture: ComponentFixture<EntrarOrganizacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrarOrganizacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrarOrganizacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
