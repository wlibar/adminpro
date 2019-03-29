import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // El @Input() indica que el valor viene de afuera, del componente padre. El string Leyenda es el valor por defecto

  // Una referencia a txtProgress y le va a poner como nombre txtProgress
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
  }

  onChanges(newValue: number) {
    if (this.progreso > 100) {
      this.progreso = 100;
    } else if (this.progreso < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // const elementHTML: any = document.getElementsByName('progreso')[0];
    // elementHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    if (this.progreso < 0) {
      this.progreso = 0;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
