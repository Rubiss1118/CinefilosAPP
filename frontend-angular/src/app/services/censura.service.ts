import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CensuraService {
  // Lista de palabras que serán censuradas
  private palabrasInapropiadas = [
    'idiota', 'estupido', 'estupida', 'mierda', 'pendejo', 'pendeja', 'puta', 'puto', 'imbecil',
    'basura', 'porqueria', 'maldito', 'maldita', 'horrible', 'odio', 'pesimo', 'pesima',
    'asqueroso', 'asquerosa', 'detestable', 'inutil', 'mediocre', 'malo', 'mala', 'patetico', 'patetica',
    'fatal', 'feo', 'fea', 'tonto', 'tonta', 'estafa', 'robo', 'fraude'
  ];

  censurarTexto(texto: string): string {
    if (!texto) return texto;
    
    let textoCensurado = texto;
    let seRealizoCambio = false;
    
    this.palabrasInapropiadas.forEach(palabra => {
      // Crear patrones para diferentes variaciones de la palabra
      const patrones = [
        new RegExp('\\b' + palabra + '\\b', 'gi'),  // Palabra exacta
        new RegExp('\\b' + palabra + 's\\b', 'gi'), // Plural
        new RegExp('\\b' + palabra + '\\w*\\b', 'gi') // Variaciones (ej: tontería, estupidez)
      ];
      
      patrones.forEach(regex => {
        const matches = textoCensurado.match(regex);
        if (matches) {
          matches.forEach(match => {
            textoCensurado = textoCensurado.replace(match, '*'.repeat(match.length));
            seRealizoCambio = true;
          });
        }
      });
    });
    
    return seRealizoCambio ? textoCensurado : texto;
  }

  tienePalabrasInapropiadas(texto: string): boolean {
    if (!texto) return false;
    
    const textoLower = texto.toLowerCase();
    return this.palabrasInapropiadas.some(palabra => 
      new RegExp('\\b' + palabra + '\\b', 'i').test(textoLower)
    );
  }
}
