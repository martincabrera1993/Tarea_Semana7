import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import generatePDF from './lib/pdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-angular';

  onGeneratePDF(){

    const products = [
      { nombre: 'Laptop', cantidad: 2, total: 1500 },
      { nombre: 'Teclado', cantidad: 5, total: 50 },
      { nombre: 'Monitor', cantidad: 1, total: 300 },
      { nombre: 'Mouse', cantidad: 3, total: 30 },
      { nombre: 'Auriculares', cantidad: 4, total: 120 },
      { nombre: 'Impresora', cantidad: 1, total: 200 },
      { nombre: 'Cámara', cantidad: 2, total: 500 },
      { nombre: 'Micrófono', cantidad: 3, total: 80 },
      { nombre: 'Memoria RAM', cantidad: 4, total: 250 },
      { nombre: 'Disco duro', cantidad: 3, total: 300 },
    ];


    const fecha = ''

    generatePDF(products, fecha, '28 de Junio del 2026');
  }
}
