import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { OrganizacaoService } from '../../services/organizacao_service';

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

  constructor(
    private fb: FormBuilder,
    private auth: OrganizacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  entrar() {
    if (this.form.valid) {
      console.log('Código digitado:', this.form.value.codigo);
      // Aqui você pode chamar um service de verificação, ex:
      this.auth.verificarCodigo(this.form.value.codigo).subscribe({
        next: (res: any) => {
          console.log('Resposta backend:', res);
          alert('Organização acessada com sucesso!');
          this.router.navigate(['/organizacao']);
          
        },
        error: (err: any) => {
          console.error('Erro no servidor:', err);
          alert('Erro no servidor');
        }
      });

    } else {
      console.log('Formulário inválido');
    }
  }
}
