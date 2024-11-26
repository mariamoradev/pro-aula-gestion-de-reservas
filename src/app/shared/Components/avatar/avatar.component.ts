import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent  implements OnInit {
  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";

  @Input() control = new FormControl(""); //Para que el formulario sea reactivo
  @Input() onlyView = false; //limitarlo a solo lectura

  protected mimeType = "image/jpeg"; //para que solo sean archivos de imagenes
constructor(private readonly supabase:SupabaseService) { }

ngOnInit() {}


public async uploadFile(event:any){
  try {
    console.log(event.target.files[0]);
    const url= await this.supabase.uploadUserImageAndGetUrl(event.target.files[0]);
    console.log("Avatar component  ~ upload file - url", url)
   this.control.setValue(url);          
  } catch (error) {
    console.error(error)
  }
  
}



}
