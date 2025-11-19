import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/registro_service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.valid) {
      this.auth.registrar(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Resposta do backend:', res);        
            alert('Registro bem-sucedido!');
            this.router.navigate(['/dashboard']);
        },
        
        error: (err: any) => console.error('Erro:', err)
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
