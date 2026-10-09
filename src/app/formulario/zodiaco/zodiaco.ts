import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {
  nombre: string = "";
  apaterno: string = "";
  amaterno: string = "";
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = "";

  mostrarResultado: boolean = false;
  nombreCompleto: string = "";
  edad: number = 0;
  signoZodiacal: string = "";
  imagenSigno: string = "";

  imprimir(): void {
  this.nombreCompleto = this.nombre + " " + this.apaterno + " " + this.amaterno;

  const anioActual = 2026;
  const mesActual = 10;
  const diaActual = 3;

  let edadCalculada = anioActual - this.anio;

  if (mesActual < this.mes) {
    edadCalculada = edadCalculada - 1;
  } 

  else if (mesActual === this.mes) {
    if (diaActual < this.dia) {
      edadCalculada = edadCalculada - 1;
    }
  }

  this.edad = edadCalculada;


  let copiaAnio = this.anio;
  for (let i = 0; i < 250; i++) {
    if (copiaAnio >= 12) {
      copiaAnio = copiaAnio - 12;
    }
  }
  const resto = copiaAnio;
    if (resto === 0) { 
      this.signoZodiacal = "Mono"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ilustracion-ano-nuevo-rojo-etiqueta-engomada-animal-vector-mono-chino_16396966.htm#fromView=search&page=1&position=10&uuid=05208c66-55da-47bd-a734-b5265553dbdc&track=ais_hybrid&query=Signos+del+zodiaco+chino+mono"; 
    }
    else if (resto === 1) { 
      this.signoZodiacal = "Gallo"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ano-gallo-insignia-vector-rojo-horoscopo-chino-animal_16396986.htm#fromView=search&page=1&position=0&uuid=178e0721-997a-4e5a-8662-1f3c4c728856&track=ais_hybrid&query=Signos+del+zodiaco+chino+Gallo"; 
    }
    else if (resto === 2) { 
      this.signoZodiacal = "Perro"; 
      this.imagenSigno = "https://www.magnific.com/es/fotos-premium/ano-perro-insignia-roja-png-signo-zodiaco-chino-tradicional_414401882.htm#fromView=search&page=1&position=39&uuid=a7d20211-da81-4593-8af5-fb58b6490a85&track=ais_hybrid&query=Signos+del+zodiaco+chino+Perro"; 
    }
    else if (resto === 3) { 
      this.signoZodiacal = "Cerdo"; 
      this.imagenSigno = "https://www.magnific.com/es/fotos-premium/insignia-animal-cerdo-chino-png-elemento-diseno-ano-nuevo-rojo_414337659.htm#fromView=search&page=1&position=11&uuid=909ee20d-b4d4-4536-b4bb-498f70c929d3&track=ais_hybrid&query=Signos+del+zodiaco+chino+Cerdo"; 
    }
    else if (resto === 4) { 
      this.signoZodiacal = "Rata"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ano-rata-insignia-oro-horoscopo-chino-zodiaco-animal_16265768.htm#fromView=search&page=1&position=4&uuid=5ff79986-0de5-4ebe-bca1-e55dc8dadf9b&track=ais_hybrid&query=Signos+del+zodiaco+chino+Rata"; 
    }
    else if (resto === 5) { 
      this.signoZodiacal = "Buey"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-premium/ano-nuevo-chino-2021-ano-buey_10948024.htm#fromView=search&page=1&position=30&uuid=10742e9e-30da-4030-9a37-4dc945995f21&track=ais_hybrid&query=Signos+del+zodiaco+chino+Buey"; 
    }
    else if (resto === 6) { 
      this.signoZodiacal = "Tigre"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ano-tigre-insignia-vector-oro-horoscopo-chino-zodiaco-animal_20168209.htm#fromView=search&page=1&position=3&uuid=8425a1f6-7cfa-41c6-b0ea-2f3c853ed94a&track=ais_hybrid&query=Signos+del+zodiaco+chino+tigre"; 
    }
    else if (resto === 7) { 
      this.signoZodiacal = "Conejo"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-premium/feliz-ano-nuevo-chino-2023-conejo-signo-zodiaco-concepto-ying-yang-sobre-fondo-color-blanco_22047310.htm#fromView=search&page=1&position=30&uuid=9b927cb7-61c1-4fbc-857e-02bd8f42e809&track=ais_hybrid&query=Signos+del+zodiaco+chino+conejo"; 
    }
    else if (resto === 8) { 
      this.signoZodiacal = "Dragón"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ano-nuevo-chino-dragon-vector-insignia-oro-animal-signo-zodiaco_20168219.htm#fromView=search&page=1&position=1&uuid=0c4d2667-d707-4065-984e-d392894f2a37&track=ais_hybrid&query=Signos+del+zodiaco+chino+dragon"; 
    }
    else if (resto === 9) { 
      this.signoZodiacal = "Serpiente"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/ano-nuevo-chino-serpiente-vector-insignia-oro-animal-zodiaco-signo_20168225.htm#fromView=search&page=1&position=0&uuid=4172af2f-bc94-4a1e-ae63-f8c8f5a287a9&track=ais_hybrid&query=Signos+del+zodiaco+chino+serpiente"; 
    }
    else if (resto === 10) { 
      this.signoZodiacal = "Caballo"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/diseno-publicacion-ano-caballo_425938289.htm#fromView=search&page=1&position=0&uuid=74cac4fa-8d3b-4e4f-ade9-8066b73e1471&track=ais_hybrid&query=Signos+del+zodiaco+chino+caballo"; 
    }
    else if (resto === 11) { 
      this.signoZodiacal = "Cabra"; 
      this.imagenSigno = "https://www.magnific.com/es/vector-gratis/insignia-oro-ano-cabra-vector-signo-zodiaco-chino-tradicional_16265774.htm#fromView=search&page=1&position=1&uuid=d71a76e0-e31f-4e5c-898e-2f331377cbd3&track=ais_hybrid&query=Signos+del+zodiaco+chino+cabra"; 
    }

    this.mostrarResultado = true;
  }
}