import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared service/shared.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-story',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {

  constructor(public sharedService: SharedService) { }

  get dp() {
    return 'https://avatar.iran.liara.run/public';
  }
}
