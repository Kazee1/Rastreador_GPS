import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dispositivo',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dispositivo.html',
  styleUrl: './dispositivo.css',
})
export class Dispositivo {
  faArrowLeft = faArrowLeft;

  dispositivo = {
    nome: '',
    local: '',
    responsavel: ''
  };

  conectarDispositivo() {
    console.log('Conectando dispositivo...');
  }

  registrar() {
    console.log('Registrando dispositivo:', this.dispositivo);
  }
}
