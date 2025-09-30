import { Component } from '@angular/core';
import { PostCardComponent } from "./post-card/post-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landpage',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './landpage.component.html',
  styleUrl: './landpage.component.css'
})
export class LandpageComponent {

}
