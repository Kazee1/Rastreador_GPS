import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DispositivoService } from '../../services/dispo_servi';

@Component({
  selector: 'app-dispositivo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './dispositivo.html',
  styleUrl: './dispositivo.css',
})
export class Dispositivo {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dispositivoService: DispositivoService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      local: ['', Validators.required],
      responsavel: ['', Validators.required],
    });
  }

  conectarDispositivo() {
    this.dispositivoService.conectarDispositivo().subscribe({
      next: (res: any) => {
        console.log('Conexão bem-sucedida:', res);
        alert('Dispositivo conectado!');
      },
      error: (err: any) => {
        console.error('Erro ao conectar:', err);
        alert('Erro ao conectar o dispositivo');
      }
    });
  }

  registrar() {
    if (this.form.valid) {
      this.dispositivoService.registrarDispositivo(this.form.value).subscribe({
        next: (res: any) => {
          console.log('Dispositivo registrado:', res);
          alert('Dispositivo registrado com sucesso!');
        },
        error: (err: any) => {
          console.error('Erro ao registrar:', err);
          alert('Erro ao registrar o dispositivo');
        }
      });

    } else {
      console.log('Formulário inválido');
      alert('Preencha todos os campos!');
    }
  }
}
