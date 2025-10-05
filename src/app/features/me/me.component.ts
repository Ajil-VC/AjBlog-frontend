import { Component } from '@angular/core';
import { ProfileComponent } from "./layout/profile/profile.component";
import { FieldComponent } from "./layout/field/field.component";

@Component({
  selector: 'app-me',
  imports: [FieldComponent, ProfileComponent],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {

}
