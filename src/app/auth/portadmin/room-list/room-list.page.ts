import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from 'src/app/shared/services/habitaciones.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss'],
})
export class RoomListPage implements OnInit {
  public habitaciones: any[] = []; 
  public filteredHabitaciones: any[] = []; 
  public searchQuery: string = ''; 

  constructor(
    private readonly habitacionesService: HabitacionesService,
    private readonly supabaseService: SupabaseService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  async ngOnInit() {
    await this.fetchHabitaciones();
  }

  /**
   * OBTENER LAS HABITACIONES
   */
  private async fetchHabitaciones() {
    try {
      const habitacionesFirebase = await this.habitacionesService.getAllHabitaciones();
      
      
      this.habitaciones = habitacionesFirebase;
      this.filteredHabitaciones = [...this.habitaciones]; 
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  }

  public filterRooms() {
    const query = this.searchQuery.toLowerCase();
    this.filteredHabitaciones = this.habitaciones.filter(habitacion =>
      habitacion.roomNumber.toLowerCase().includes(query)
    );
  }


 
public async eliminarHabitacion(roomNumber: string): Promise<void> {
  try {
    
    await this.habitacionesService.deleteHabitacion(roomNumber);

    await this.toastService.presentToast('Habitación eliminada con éxito', 2000, 'top');

   
    await this.fetchHabitaciones();
  } catch (error) {
    console.error('Error al eliminar la habitación:', error);
    await this.toastService.presentErrorToast('Error al eliminar la habitación');
  }
}



  
  }

  
  
  


