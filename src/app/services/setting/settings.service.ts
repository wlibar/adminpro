import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      // console.log('Cargando ajustes del localstorage');
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema( this.ajustes.tema );
    } else {
      // console.log('Cargando ajustes por defecto');
      this.aplicarTema( this.ajustes.tema ); // Cargaría el default
    } 
  }

  aplicarTema( tema: string) {
    // console.log('tema', tema);
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;

}