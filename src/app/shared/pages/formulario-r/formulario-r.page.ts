import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-formulario-r',
  templateUrl: './formulario-r.page.html',
  styleUrls: ['./formulario-r.page.scss'],
})
export class FormularioRPage implements OnInit {
  habitacion: any;
  reservation = {
    nombre: '',
    apellidos: '',
    cedula: '',
    diaLlegada: '',
    metodoPago: '',
  };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['habitacion']) {
        this.habitacion = JSON.parse(params['habitacion']);
      }
    });
  }

  async submitReservation() {
    try {
      
      const id = this.firestore.createId();
      const reservationData = {
        ...this.reservation,
        habitacion: this.habitacion,
        fechaReserva: new Date().toISOString(),
      };
  
      await this.firestore.collection('reservas').doc(id).set(reservationData);
  
      
      alert('Reserva realizada con éxito');
  
      
      this.generatePDF(reservationData);
  
     
      this.navCtrl.navigateBack('/lista-habitaciones');
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Ocurrió un error al realizar la reserva. Intenta nuevamente.');
    }
  }
  


  generatePDF(reservationData: any) {
    const doc = new jsPDF();

doc.setFillColor(41, 128, 185); 
doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F'); 
doc.setTextColor(255, 255, 255); 
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.text('Confirmación de Reserva', 10, 20);


doc.setTextColor(0, 0, 0); 
doc.setFontSize(14);
doc.text('Datos del Cliente:', 10, 50);

doc.setFont('helvetica', 'normal');
doc.text(`Nombre: ${this.reservation.nombre} ${this.reservation.apellidos}`, 10, 60);
doc.text(`Cédula: ${this.reservation.cedula}`, 10, 70);
doc.text(`Día de Llegada: ${this.reservation.diaLlegada}`, 10, 80);
doc.text(`Método de Pago: ${this.getMetodoPagoText(this.reservation.metodoPago)}`, 10, 90);


doc.setFont('helvetica', 'bold');
doc.text('Datos de la Habitación:', 10, 110);

doc.setFont('helvetica', 'normal');
doc.text(`Nombre: ${this.habitacion.name}`, 10, 120);
doc.text(`Número: ${this.habitacion.roomNumber}`, 10, 130);
doc.text(`Descripción: ${this.habitacion.description}`, 10, 140);
doc.text(`Precio por Noche: $${this.habitacion.pricePerNight}`, 10, 150);
doc.text(`Precio por Día: $${this.habitacion.pricePerDay}`, 10, 160);


const tableData = [
  ['Campo', 'Valor'],
  ['Nombre', `${this.reservation.nombre} ${this.reservation.apellidos}`],
  ['Cédula', this.reservation.cedula],
  ['Día de Llegada', this.reservation.diaLlegada],
  ['Método de Pago', this.getMetodoPagoText(this.reservation.metodoPago)],
  ['Habitación', this.habitacion.name],
  ['Número de Habitación', this.habitacion.roomNumber],
];



const pageHeight = doc.internal.pageSize.height;
doc.setFontSize(10);
doc.setTextColor(150);
doc.text('Gracias por confiar en nosotros', 10, pageHeight - 10);


doc.save('reserva.pdf');
}


getMetodoPagoText(metodoPago: string): string {
switch (metodoPago) {
  case 'tarjetaCredito':
    return 'Tarjeta de Crédito';
  case 'tarjetaDebito':
    return 'Tarjeta de Débito';
  case 'PSE':
    return 'PSE';
  default:
    return 'Desconocido';
}
}
}
    

