import { Component, Input, OnInit } from '@angular/core';

type buttonType = "button" | "submit";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
  
  @Input({required: true}) value = "";
  @Input() type: buttonType = "submit";
  @Input() disabled = false;


  constructor() { }

  ngOnInit() {}

}
