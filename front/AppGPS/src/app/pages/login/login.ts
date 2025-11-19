import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/registro_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Resposta do backend:', res);

          if (res.status === 'ok') {
            alert('Login bem-sucedido!');
            this.router.navigate(['/dashboard']);
            
          } else {
            alert('Email ou senha incorretos');
          }
        },

        error: (err: any) => {
          console.error('Erro no login:', err);
          alert('Erro no servidor');
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
