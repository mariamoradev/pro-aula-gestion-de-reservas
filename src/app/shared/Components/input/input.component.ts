import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type buttonType = "text" | "number" | "tel" | "email" | "password";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type: buttonType = "text";
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true;
  }

  public setValue(event: any){
    this.control.setValue(event.target.value)
  }

  showOrHidePassword(){
    this.hide = !this.hide;
    if (this.hide)this.type = 'password';
    else this.type = 'text';
  }

}
