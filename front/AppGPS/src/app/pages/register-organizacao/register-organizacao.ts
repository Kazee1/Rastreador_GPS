import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizacaoService } from '../../services/organizacao_service';

@Component({
  selector: 'app-register-organizacao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-organizacao.html',
  styleUrl: './register-organizacao.css',
})
export class RegisterOrganizacao {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: OrganizacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      local: ['', Validators.required],
      responsavel: ['', Validators.required],
      codigo: ['', Validators.required],
    });
  }

  registrarOrg() {
    if (this.form.valid) {
      this.auth.registrarOrganizacao(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Resposta backend:', res);
          alert('Organização registrada com sucesso!');
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
