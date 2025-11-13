import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entrar-organizacao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './entrar-organizacao.html',
  styleUrl: './entrar-organizacao.css',
})
export class EntrarOrganizacao {
faArrowLeft = faArrowLeft;
form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  entrar() {
    if (this.form.valid) {
      console.log('Código digitado:', this.form.value.codigo);
      // Aqui você pode chamar um service de verificação, ex:
      // this.authService.verificarCodigo(this.form.value.codigo).subscribe(...)
    } else {
      console.log('Por favor, insira o código antes de continuar');
    }
  }
}
