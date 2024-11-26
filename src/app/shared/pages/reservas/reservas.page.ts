import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from 'src/app/shared/services/habitaciones.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  public habitaciones: any[] = []; 
   public filteredHabitaciones: any[] = []; 
  public searchQuery: string = ''; 


  constructor(
    private readonly habitacionesService: HabitacionesService,
    private readonly supabaseService: SupabaseService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.fetchHabitaciones();
   
  
  }


  private async fetchHabitaciones() {
    try {
      const habitacionesFirebase = await this.habitacionesService.getAllHabitaciones();
      
      // Aquí se asume que cada habitación ya tiene la URL de la imagen almacenada en Firebase
      this.habitaciones = habitacionesFirebase;
      this.filteredHabitaciones = [...this.habitaciones]; // Inicialmente todas las habitaciones
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  }

  /**
   * Filtrar habitaciones según la consulta en la barra de búsqueda.
   */
  public filterRooms() {
    const query = this.searchQuery.toLowerCase();
    this.filteredHabitaciones = this.habitaciones.filter(habitacion =>
      habitacion.roomNumber.toLowerCase().includes(query)
    );
  }


  goToReservation(habitacion: any) {
    this.navCtrl.navigateForward('/formulario-r', {
      queryParams: { habitacion: JSON.stringify(habitacion) },
    });
  }

}
