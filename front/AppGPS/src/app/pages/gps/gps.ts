import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './gps.html',
  styleUrl: './gps.css',
})
export class GPS {
  showDevices = false;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  mostrarTabela = false;

  dispositivos = [
    { nome: 'Dispositivo 1', status: 'Ativo', localizacao: 'Calapan' },
    { nome: 'Dispositivo 2', status: 'Inativo', localizacao: 'Oriental Mindoro' },
    { nome: 'Dispositivo 3', status: 'Ativo', localizacao: 'Lumangbayan' },
  ];

  toggleTabela() {
    this.mostrarTabela = !this.mostrarTabela;

  }
}
