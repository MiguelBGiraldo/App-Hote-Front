import { Component } from '@angular/core';
import { ComunicacionService } from 'src/app/Service/comunicacion.service';
import { HotelDataServiceService } from 'src/app/Service/hotel-data-service.service';
import { PaqueteTourService } from 'src/app/Service/paquete-tour.service';
import { PaqueteTourDTO } from 'src/app/modelo/paquete-tour-dto';
import { ComunicacionReservaService } from '../../Service/comunicacion-reserva.service';

@Component({
  selector: 'app-lista-tour',
  templateUrl: './lista-tour.component.html',
  styleUrls: ['./lista-tour.component.css']
})
export class ListaTourComponent {

  paquetesTour: PaqueteTourDTO[];

  constructor(private paqueteService: PaqueteTourService, private hotelDataService: HotelDataServiceService, private comunicacionService: ComunicacionService, private comunicacionReserva: ComunicacionReservaService) {

    this.paquetesTour = [];
  }

  ngOnInit() {

    this.listarPaquetes(1);
  }

  public listarPaquetes(pagina: number) {

    this.paqueteService.listarAll(pagina).subscribe({
      next: data => {
        this.paquetesTour = data.result;
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public selectPaquete(id: string) {

    this.paqueteService.listar(id).subscribe({
      next: data => {
        let paquete = data.result;
        this.comunicacionReserva.setPaquete(paquete);
        this.comunicacionReserva.setIdPaquete(id);
        this.comunicacionService.sendView('');
        this.comunicacionService.sendButton(true);
      },
      error: error => {
        console.log(error.error);
      }
    });

  }

}
